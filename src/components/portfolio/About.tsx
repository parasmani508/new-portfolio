import { motion } from "framer-motion";
import { education } from "@/data/profile";
import { GraduationCap, Zap } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="container">
        <SectionHeader kicker="about" title="The story so far" />

        <div className="grid md:grid-cols-5 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 glass rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-primary mb-5">
              <Zap size={17} />
              <span className="font-mono text-xs uppercase tracking-widest">about me</span>
            </div>
            <p className="text-base sm:text-lg leading-[1.8] text-foreground/88">
              I'm <span className="text-gradient font-bold">Paras Kumar</span> — a software
              developer who loves turning ideas into working products. At{" "}
              <b>Digital Umbrella</b> I've built{" "}
              <span className="text-foreground font-medium">microservices</span>{" "}
              using TypeScript, MongoDB, GraphQL and NestJS, handling data manipulation,
              pagination, and error handling at scale. I've designed{" "}
              <span className="text-foreground font-medium">efficient GraphQL queries and mutations</span>{" "}
              and integrated services into larger distributed systems.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-[1.8] text-muted-foreground">
              I've also done freelance work, building a{" "}
              <span className="text-foreground font-medium">company portfolio website</span>{" "}
              with React.js that improved client visibility by 40%. I care about clean,
              readable code, responsive UIs, and software that solves real problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="md:col-span-2 glass rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-secondary mb-5">
              <GraduationCap size={17} />
              <span className="font-mono text-xs uppercase tracking-widest">Education</span>
            </div>
            <ul className="space-y-5">
              {education.map((e) => (
                <li key={e.school + e.degree} className="border-l-2 border-primary/35 pl-4">
                  <p className="font-semibold text-sm sm:text-base">{e.degree}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{e.school}</p>
                  <p className="text-xs font-mono text-primary/80 mt-1">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const SectionHeader = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="flex flex-col items-start">
    <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary/80">{kicker}</span>
    <h2 className="mt-2 text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold tracking-tight leading-tight">
      {title}
    </h2>
    <div className="mt-4 h-1 w-12 rounded-full bg-gradient-primary" />
  </div>
);
