import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionHeader } from "./About";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="container">
        <SectionHeader kicker="contact" title="Let's build something" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 glass rounded-3xl p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-36 -right-36 w-72 h-72 rounded-full bg-secondary/12 blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-36 -left-36 w-72 h-72 rounded-full bg-primary/10 blur-[110px] pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Have something in mind?{" "}
                <span className="text-gradient">Let's talk.</span>
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                I'm open to full-time roles, freelance work, and interesting
                collaborations. If you want to build something — or just want to
                say hi — my inbox is open.
              </p>
              <div className="mt-7 space-y-3.5 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={15} className="text-primary shrink-0" />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={15} className="text-primary shrink-0" />
                  {profile.phone}
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={15} className="text-primary shrink-0" />
                  {profile.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                <SocialBtn
                  href={profile.socials.github}
                  icon={<Github size={17} />}
                  label="GitHub"
                />
                <SocialBtn
                  href={profile.socials.linkedin}
                  icon={<Linkedin size={17} />}
                  label="LinkedIn"
                />
                <SocialBtn
                  href={profile.socials.instagram}
                  icon={<Instagram size={17} />}
                  label="Instagram"
                />
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="px-2 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-center shadow-glow-primary hover:scale-[1.02] transition-transform text-sm"
              >
                Send me an email →
              </a>
            </div>
          </div>
        </motion.div>

        <footer className="mt-12 pt-8 border-t border-border/60 text-center text-xs text-muted-foreground font-mono">
          <p>
            Built by Paras — {new Date().getFullYear()} ·{" "}
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              parasmani508
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

const SocialBtn = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center gap-1.5 py-3.5 rounded-xl border border-border bg-card/40 hover:border-primary/50 hover:text-primary transition-colors text-xs text-muted-foreground"
  >
    {icon}
    {label}
  </a>
);
