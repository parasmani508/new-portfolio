import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal, FileText } from "lucide-react";
import { profile } from "@/data/profile";

const ROLES = [
  "Software Developer",
  "Full-Stack Developer",
  "Frontend Developer",
  "MERN Stack Developer",
];

export const Hero = () => {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[roleIdx];
    const speed = deleting ? 45 : 85;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-secondary/10 blur-[140px]" />

      <div className="container relative z-10 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/35 bg-primary/8 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
              <span className="relative rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono text-primary tracking-wide">Open to work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight">
            Hey, I'm{" "}
            <span className="text-gradient">Paras Kumar</span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl md:text-2xl font-mono text-muted-foreground">
            <span className="text-primary/70">{">"}</span>{" "}
            <span className="text-foreground/90">{text}</span>
            <span className="text-primary animate-blink ml-0.5">|</span>
          </p>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-[520px] leading-[1.75]">
            Software Developer Intern at{" "}
            <span className="text-foreground font-semibold">Digital Umbrella</span>. I build
            scalable microservices, craft clean UIs, and turn ideas into real working products —
            from frontend to backend.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow-primary hover:scale-[1.04] transition-transform text-sm"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-border bg-card/40 hover:border-primary/60 hover:text-primary transition-colors font-medium text-sm"
            >
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-border bg-card/40 hover:border-primary/60 hover:text-primary transition-colors font-medium text-sm"
            >
              <FileText size={14} />
              Resume
            </a>
          </div>

          <div className="mt-9 flex items-center gap-5">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={19} />
            </a>
            <span className="w-px h-4 bg-border" />
            <span className="text-xs font-mono text-muted-foreground">Roorkee, India</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="relative mx-auto hidden md:block"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 animate-float">
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-2xl opacity-25" />
            <div className="relative w-full h-full rounded-2xl glass glow-border p-5 flex flex-col gap-3 font-mono text-sm">
              <div className="flex items-center gap-1.5 pb-2 border-b border-border/60">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <Terminal size={11} className="ml-auto text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground/50">paras.config.ts</span>
              </div>
              <div className="space-y-1.5 text-xs leading-relaxed flex-1">
                <p>
                  <span className="text-secondary">export const</span>{" "}
                  <span className="text-primary">me</span> = {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-accent">name</span>:{" "}
                  <span className="text-foreground/80">"Paras"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-accent">role</span>:{" "}
                  <span className="text-foreground/80">"Dev Intern"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-accent">building</span>:{" "}
                  <span className="text-foreground/80">"microservices"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-accent">openTo</span>: [
                  <span className="text-foreground/80">"roles"</span>,{" "}
                  <span className="text-foreground/80">"collab"</span>],
                </p>
                <p className="pl-4">
                  <span className="text-accent">coffee</span>:{" "}
                  <span className="text-primary/90">Infinity</span>,
                </p>
                <p>{"}"}</p>
              </div>
              <p className="text-[10px] text-muted-foreground/50 border-t border-border/60 pt-2">
                {"// always shipping, rarely sleeping"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowDown className="animate-bounce" size={18} />
      </a>
    </section>
  );
};
