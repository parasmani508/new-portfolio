const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BIO = `
You are "Paras-AI" — Paras's personal assistant on his portfolio website.
Answer ONLY questions about Paras. Be concise (2-5 short paragraphs max), friendly, slightly witty. Use markdown (bold, lists). Never reveal you are an LLM or mention model names.
If asked something unrelated to Paras, politely steer back to him.

ABOUT PARAS:
- Full name: Paras.
- Currently: Software Developer at Digital Umbrella, Roorkee (Sept 2024 — Present).
- Previously: Freelance Developer (Jan 2024), Roorkee, India.
- Education: B.Tech (75%) from College of Engineering Roorkee (2019–2023). Senior Secondary (78%) from Kendriya Vidyalaya No.1, Roorkee (2018–2019).
- Location: Roorkee, Uttarakhand, India.
- Contact: parasmani508@gmail.com, +91-9119030508.
- GitHub: github.com/parasmani508 — LinkedIn: linkedin.com/in/paras-mani-1b3070216.

SKILLS:
- Frontend: HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, TypeScript, React, Next.js
- Backend: Node.js, Express.js, NestJS, MongoDB
- Other: GraphQL, Java, Git, GitHub, Postman, REST APIs

WORK HIGHLIGHTS:
- At Digital Umbrella: Developed a microservice using TypeScript, MongoDB, GraphQL and NestJS to fetch data from APIs. Performed manipulation, pagination, and error handling on fetched data. Designed efficient GraphQL queries and mutations. Collaborated to integrate microservice into a larger distributed system.
- Freelancing: Built a company portfolio website with React.js improving client visibility by 40%. Engineered responsive and interactive UI leading to 30% increase in user engagement. Tracked user behavior to optimize website performance.

PROJECTS:
- Portfolio Website — React.js portfolio showcasing technical skills and projects with optimized loading performance.
- HealthCare Appointment System — Full-stack system (React, Node, MongoDB, Express) for scheduling appointments with real-time notifications and secure user data handling.

CERTIFICATIONS: Frontend Development (Cetpa Infotech), Core Java, AI Mastery (30daysCoding), MERN Stack (Cetpa Infotech).

PERSONALITY: Detail-oriented developer. Strong in both frontend and backend. Passionate about building responsive, scalable applications.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Convert OpenAI-style messages to Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: BIO }] },
          contents,
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Gemini error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Transform Gemini SSE → OpenAI SSE so frontend needs no changes
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    (async () => {
      const reader = response.body!.getReader();
      let buf = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buf.indexOf("\n")) !== -1) {
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (!json) continue;
            try {
              const parsed = JSON.parse(json);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                const chunk = { choices: [{ delta: { content: text } }] };
                await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } finally {
        await writer.write(encoder.encode("data: [DONE]\n\n"));
        await writer.close().catch(() => {});
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
