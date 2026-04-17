export const profile = {
  name: "Paras Kumar",
  alias: "Paras",
  role: "Software Developer",
  company: "Digital Umbrella",
  email: "parasmani508@gmail.com",
  phone: "+91-9119030508",
  location: "Roorkee, Uttarakhand, India",
  socials: {
    github: "https://github.com/parasmani508",
    linkedin: "https://www.linkedin.com/in/paras-mani-1b3070216/",
    instagram: "https://www.instagram.com/parasmani10/?hl=en",
  },
  resumeUrl: "#",
};

export const skills = [
  { name: "JavaScript", level: 88 },
  { name: "TypeScript", level: 80 },
  { name: "React", level: 85 },
  { name: "Next.js", level: 78 },
  { name: "HTML & CSS", level: 90 },
  { name: "Tailwind CSS", level: 82 },
  { name: "Node.js", level: 78 },
  { name: "NestJS", level: 75 },
  { name: "MongoDB", level: 75 },
  { name: "Express.js", level: 78 },
  { name: "GraphQL", level: 72 },
  { name: "Java", level: 70 },
  { name: "Git & GitHub", level: 82 },
  { name: "Bootstrap", level: 78 },
];

export const experience = [
  {
    company: "Digital Umbrella",
<<<<<<< HEAD
    role: "Software Developer Intern",
    period: "Sept 2024 — Present",
    location: "Roorkee, India",
    points: [
      "Developed a microservice using TypeScript, MongoDB, GraphQL and NestJS to fetch data from APIs.",
      "Performed operations on the fetched data, including manipulation, pagination, and error handling.",
      "Designed and implemented efficient GraphQL queries and mutations for seamless data retrieval.",
      "Collaborated with the team to integrate microservice into a larger distributed system.",
    ],
  },
  {
    company: "Freelancer",
    role: "Freelance Developer",
    period: "Jan 2024",
    location: "Roorkee, India",
    points: [
      "Created a company portfolio website showcasing services, projects, and team using React.js, improving client visibility by 40%.",
      "Engineered a responsive and interactive UI, leading to a 30% increase in user engagement.",
      "Tracked user behavior to optimize website performance and improve user experience.",
=======
    role: "Software Engineer",
    period: "Apr 2025 — Present",
    location: "Roorkee, Uttarakhand",
    points: [
      "Engineered a Theme Customization Dashboard with real-time control over typography, colors, layouts, animations and content sections.",
      "Built Cngle Link — a multi-tenant platform for creators & brands to manage digital identity, content and links with deep customization.",
      "Designed Blinkit-style storefronts and shipped 8+ production themes for the DailyBasket e-commerce builder used by multiple businesses.",
    ],
  },
  {
    company: "Feb Tech IT",
    role: "Full Stack Developer",
    period: "May 2024 — Jan 2025",
    location: "Roorkee, Uttarakhand",
    points: [
      "Migrated company website from vanilla HTML/CSS/JS to React, lifting performance and maintainability.",
      "Built Danmart Global — full e-commerce platform with 100+ products, 10+ categories, payment gateway and COD.",
      "Developed an internal CRM managing employees, attendance, salaries, leave workflows and tasks.",
    ],
  },
  {
    company: "Web Stack Academy",
    role: "Full Stack Developer Intern (Remote)",
    period: "Earlier",
    location: "Remote",
    points: [
      "Built a full-stack Airbnb-style booking platform for hotels and restaurants, focused on local/regional listings across India.",
      "Frontend-heavy project — integrated multiple third-party libraries for maps, calendars, carousels and UI components to match real-world product expectations.",
      "Connected REST APIs and databases end-to-end, gaining hands-on exposure to how production applications handle data flow, auth and state.",
      "Learned real-world patterns: API consumption, async data handling, form validation and responsive design under mentorship.",
>>>>>>> b4759b9a991b0b3148f6f4bf4fb027987d3f1251
    ],
  },
];

export const projects = [
  {
    title: "Daily Hissab",
    desc: "Shared expense tracker for roommates with settlements, reports & live syncing. Used daily by 5+ people.",
    stack: ["React", "Supabase", "Tailwind"],
    tag: "Live",
    link: "https://dailyhisab.lovable.app/",
  },
  {
    title: "Hustlers — Roadmaps",
    desc: "Curated roadmaps with best resources per topic + community-written articles from any platform.",
    stack: ["Next.js", "NestJS", "Postgres"],
    tag: "Production",
    link: "https://roadmaps.godevelopers.online/",
  },
  {
    title: "Contribution Leaderboard",
    desc: "Frontend that aggregates GitHub contributions across the personal org & team members in real time.",
    stack: ["React", "GraphQL", "Octokit"],
    tag: "Live",
    link: "https://leaderboard.godevelopers.online",
  },
  {
    title: "Hustler Hub",
    desc: "Daily 10pm Jitsi standups, streak tracking & joining flow — keeps the engineering team in sync.",
    stack: ["React", "Jitsi", "NestJS"],
    tag: "Internal",
    link: "https://godevelopers.online",
  },
  {
    title: "Hustlers Dashboard",
    desc: "Manages users, permissions, departments, positions & attendance. Backend on Render, dashboard on Vercel.",
    stack: ["Next.js", "NestJS", "Render"],
    tag: "Production",
    link: "https://dashboard.godevelopers.online",
  },
  {
    title: "Sync Real",
    desc: "Real-time clipboard & file sync — share text, images, PDFs across devices instantly.",
    stack: ["React", "WebSockets", "Node"],
    tag: "Project",
    link: "https://syncreal.netlify.app/",
  },
];

export const education = [
  { school: "College of Engineering Roorkee", degree: "B.Tech (75%)", period: "2019 — 2023" },
  { school: "Kendriya Vidyalaya No.1, Roorkee", degree: "Senior Secondary (78%)", period: "2018 — 2019" },
];

// Used by the AI chatbot system prompt
export const bioForAI = `
You are a personal assistant on Paras Kumar's portfolio website.
Answer ONLY questions about Paras. Be concise, friendly, slightly witty. Use markdown.
If asked something unrelated, politely steer back to Paras.

<<<<<<< HEAD
ABOUT PARAS:
- Full name: Paras Kumar.
- Currently: Software Developer Intern at Digital Umbrella, Roorkee (Sept 2024 — Present).
- Previously: Freelance Developer (Jan 2024), Roorkee.
- Education: B.Tech (75%) from College of Engineering Roorkee (2019–2023). Senior Secondary (78%) from Kendriya Vidyalaya No.1, Roorkee (2018–2019).
=======
ABOUT VANSH:
- Full name: Vansh Gupta. Alias: "Hustler".
- Currently: Software Development Engineer at Digital Umbrella, Roorkee (Apr 2025 — Present).
- Previously: Frontend Developer at Feb Tech IT, Roorkee (May 2024 — Jan 2025).
- Before that: Full Stack Developer Intern (Remote) at Web Stack Academy — built an Airbnb-style booking platform for hotels & restaurants (local/regional India), frontend-heavy with third-party libraries, REST APIs and DB integration.
- Education: B.Tech CSE from Quantum University Roorkee (2024). Class XII & X from MRS Memorial School, Saharanpur (PCM in 12th).
>>>>>>> b4759b9a991b0b3148f6f4bf4fb027987d3f1251
- Location: Roorkee, Uttarakhand, India.
- Contact: parasmani508@gmail.com, +91-9119030508.

SKILLS: JavaScript, TypeScript, React, Next.js, NestJS, GraphQL, Node.js, MongoDB, Express.js, HTML, CSS, Tailwind CSS, Bootstrap, Java, Git/GitHub.

WORK HIGHLIGHTS:
- At Digital Umbrella: developed a microservice using TypeScript, MongoDB, GraphQL and NestJS to fetch and process data from APIs. Built efficient GraphQL queries and mutations and collaborated on integrating the microservice into a larger distributed system.
- Freelancing: built a company portfolio website with React.js improving client visibility by 40%, engineered responsive UI increasing user engagement by 30%.

CERTIFICATIONS: Frontend Development (Cetpa Infotech), Core Java, AI Mastery (30daysCoding), MERN Stack (Cetpa Infotech).

PERSONALITY: Detail-oriented developer. Focused on building scalable, user-friendly applications. Strong foundation in both frontend and backend development.
`;
