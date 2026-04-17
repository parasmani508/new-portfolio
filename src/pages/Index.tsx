import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Chatbot } from "@/components/portfolio/Chatbot";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Vansh Gupta — Software Engineer & Hustler";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Vansh Gupta — Software Development Engineer at Digital Umbrella. Building multi-tenant platforms, dashboards, and developer tools with React, Next.js & NestJS."
    );
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Chatbot />
    </main>
  );
};

export default Index;
