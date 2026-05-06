import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (!el) return;
  const navHeight = document.querySelector("header")?.offsetHeight ?? 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
  window.scrollTo({ top, behavior: "smooth" });
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "py-2 bg-background/75 backdrop-blur-2xl border-b border-border/60"
          : "py-4"
      )}
    >
      <nav className="container flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="font-mono text-base font-bold tracking-tight">
          <span className="text-gradient">paras.dev</span>
        </a>

        <ul className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm border border-border hover:border-primary/50 hover:text-primary transition-colors"
          >
            <FileText size={13} />
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-glow-primary hover:scale-[1.04] transition-transform"
          >
            Hire me
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden mt-2 mx-4 glass rounded-2xl p-2 shadow-card">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); scrollTo(l.href); setOpen(false); }}
              className="block px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 mt-1 px-4 py-3 rounded-xl text-sm border border-border hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground"
          >
            <FileText size={14} />
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); setOpen(false); }}
            className="block text-center mt-1 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-primary text-primary-foreground"
          >
            Hire me
          </a>
        </div>
      )}
    </header>
  );
};
