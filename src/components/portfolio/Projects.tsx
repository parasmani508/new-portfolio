import { motion } from "framer-motion";
import { projects } from "@/data/profile";
import { SectionHeader } from "./About";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="container">
        <SectionHeader kicker="projects" title="Things I've built" />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target={p.link?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="group glass glow-border rounded-2xl p-5 sm:p-6 flex flex-col cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={[
                    "font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full border",
                    p.tag === "Live" || p.tag === "Production"
                      ? "border-primary/40 text-primary bg-primary/5"
                      : "border-border text-muted-foreground",
                  ].join(" ")}
                >
                  {p.tag}
                </span>
                <ExternalLink
                  className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-0.5"
                  size={16}
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
