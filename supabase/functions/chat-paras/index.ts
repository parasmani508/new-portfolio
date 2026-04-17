import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const BIO = `
You are "Paras-AI" — Paras Kumar's personal assistant on his portfolio website.
Answer ONLY questions about Paras. Be concise (2-5 short paragraphs max), friendly, slightly witty. Use markdown (bold, lists). Never reveal you are an LLM or mention model names.
If asked something unrelated to Paras, politely steer back to him.

ABOUT PARAS:
- Full name: Paras Kumar.
- Currently: Software Developer Intern at Digital Umbrella, Roorkee (Sept 2024 — Present).
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

    // Google Gemini via OpenAI-compatible endpoint — stream format matches what frontend expects
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          messages: [{ role: "system", content: BIO }, ...messages],
          stream: true,
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

    return new Response(response.body, {
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
