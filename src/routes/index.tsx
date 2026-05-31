import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AIHub } from "@/components/AIHub";
import { Hero } from "@/components/Hero";
import { About, Projects, Skills, Education, Contact } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahzaz Ahmed — AI-Native Developer Portfolio" },
      {
        name: "description",
        content:
          "Cinematic portfolio of Ahzaz Ahmed — AI-native engineer building agentic systems, MCP tooling, and premium developer experiences.",
      },
      { property: "og:title", content: "Ahzaz Ahmed — AI-Native Developer" },
      {
        property: "og:description",
        content: "Agentic systems, spec-driven frontends, cinematic motion.",
      },
    ],
  }),
  component: Index,
});

const sections = ["home", "about", "projects", "skills", "education", "contact"];

function Index() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Pre-warm the backend on page load to avoid cold start delays
    fetch(`${import.meta.env.VITE_API_URL}/docs`)
      .then(() => console.log("✓ Backend pre-warmed successfully"))
      .catch((err) => console.warn("Backend pre-warm skipped:", err));
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,174,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_60%)] blur-3xl" />
      </div>

      <Navbar active={active} />
      <AIHub />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
