import { motion } from "framer-motion";
import { experience } from "@/data/profile";
import { SectionHeader } from "./About";
import { Building2, MapPin } from "lucide-react";

export const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="container">
        <SectionHeader kicker="experience" title="Where I've shipped" />

        <div className="mt-12 relative">
          <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-px bg-gradient-to-b from-primary/70 via-secondary/40 to-transparent" />
          <div className="space-y-7">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                <div className="absolute left-0 top-2 w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                  <Building2 className="text-primary-foreground" size={17} />
                </div>
                <div className="glass rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-colors duration-200">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.role}</h3>
                      <p className="text-primary font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="text-right text-xs sm:text-sm font-mono text-muted-foreground shrink-0">
                      <p>{exp.period}</p>
                      <p className="flex items-center gap-1 justify-end mt-1.5">
                        <MapPin size={11} className="shrink-0" />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2.5 text-sm sm:text-base text-muted-foreground">
                    {exp.points.map((p, idx) => (
                      <li key={idx} className="flex gap-2.5 leading-relaxed">
                        <span className="text-primary mt-1.5 shrink-0 text-xs">→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
