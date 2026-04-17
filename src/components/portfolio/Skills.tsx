import { motion } from "framer-motion";
import { skills } from "@/data/profile";
import { SectionHeader } from "./About";

const LEVEL_LABEL = (n: number) => {
  if (n >= 90) return "Expert";
  if (n >= 80) return "Advanced";
  if (n >= 70) return "Proficient";
  return "Learning";
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="container">
        <SectionHeader kicker="skills" title="My toolbox" />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="glass rounded-xl p-4 hover:border-primary/40 transition-colors duration-200 group"
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-semibold text-sm group-hover:text-foreground transition-colors">
                  {s.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {LEVEL_LABEL(s.level)}
                </span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                  className="h-full bg-gradient-primary rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
