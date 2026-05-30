import { motion, type Variants } from "framer-motion";
import { Github, ExternalLink, GraduationCap, Cpu, Brain, Code2, Server, Wand2, Mail, Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";
const CONTACT_EMAIL = "ahzazahmed159@gmail.com";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[--neon]">
      <span className="h-px w-8 bg-[--neon]/60" />
      {children}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:px-12 lg:px-4 lg:py-24">
      <div className="mx-auto  max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-3 md:pt-4 lg:pt-6"
        >
          <SectionLabel>About</SectionLabel>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-9"
        >
          <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:pr-16">
            Engineering <span className="text-gradient-neon">intelligent interfaces,</span> frame by frame.
          </h3>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I build production-grade AI-native products — fusing agentic backends with cinematic frontends.
            From spec-driven architectures to MCP-powered tool pipelines, every layer is engineered for
            clarity, speed, and that unmistakable feeling of inevitability.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 md:gap-x-5 lg:gap-x-6">
            <PillarCard icon={<Code2 size={18} />} title="Frontend" items={["Next.js", "React.js", "Tailwind CSS"]} />
            <PillarCard icon={<Server size={18} />} title="Backend" items={["FastAPI", "Python", "Edge runtimes"]} />
            <PillarCard icon={<Wand2 size={18} />} title="Workflow" items={["Spec-driven dev", "Component-driven architecture", "Scalable systems"]} />
            <PillarCard icon={<Brain size={18} />} title="AI Ecosystem" items={["OpenAI Agent SDK", "MCP", "Tool-calling systems"]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass group relative overflow-hidden rounded-3xl p-5 bg-[#0b0f19]/40 border border-white/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-[#0b0f19]/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_1px_15px_rgba(16,185,129,0.25)]"
    >
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[--neon]/10 text-[--neon] ring-1 ring-[--neon]/30">
        {icon}
      </div>
      <h4 className="text-sm font-semibold tracking-wide">{title}</h4>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>· {i}</li>
        ))}
      </ul>
    </motion.div>
  );
}

type Project = {
  title: string;
  desc: string;
  bullets?: string[];
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "Autonomous AI Workflow Agent",
    desc: "Multi-platform AI agent system for workflow automation using a cloud-local architecture.",
    bullets: [
      "Task coordination via structured file-based system (Needs_Action, In_Progress, Pending_Approval)",
      "Integrates WhatsApp, LinkedIn, and Odoo via MCP",
      "24/7 cloud deployment with secure approval-based execution",
    ],
    tags: ["Obsidian", "Node.js", "MCP", "Playwright", "Odoo", "PM2", "Python", "Ollama (Qwen3-Coder)", "Claude Code CLI"],
  },
  {
    title: "AI-Powered Todo Management App",
    desc: "Full-stack AI-native Todo app with chat-based interface, secure auth, and OpenAI-powered agent orchestration via MCP tools.",
    tags: ["Next.js 16", "React", "TypeScript", "Better Auth (JWT)", "FastAPI", "Python", "MCP SDK", "SQLModel", "Neon Postgres", "OpenAI ChatKit"],
    link: "https://github.com/AHZAZAHMED/Hackathon-2-Todo-app-",
  },
  {
    title: "AI Chatbot — Conversational Assistant",
    desc: "ChatGPT-like chatbot in Python with Chainlit and Gemini API, real-time streaming, persistent conversation history, prompt handling and context management via uv.",
    tags: ["OpenAI Agent SDK", "Python", "Chainlit", "uv"],
    link: "https://github.com/AHZAZAHMED/Quarter-3-Agentic-AI-/tree/main/agent-stream-runner",
  },
  {
    title: "NikeUI — Dynamic E-Commerce Web App",
    desc: "Responsive e-commerce frontend with product display, cart functionality, and authentication. Focused on UI/UX and CMS integration.",
    tags: ["Next.js", "Tailwind CSS", "Sanity", "Clerk"],
    link: "https://github.com/AHZAZAHMED/nikeui",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h3 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Projects that ship <span className="text-gradient-neon">intelligence</span>.
            </h3>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Agentic systems, AI-native apps, and modern web experiences.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group glass relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
        hover ? "glow-shadow-strong" : ""
      }`}
      style={{ transform: hover ? "translateY(-4px) scale(1.005)" : "none" }}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[--neon]/15 to-transparent opacity-60 transition-opacity duration-500 ${
          hover ? "opacity-100" : ""
        }`}
      />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[--neon] shadow-[0_0_10px_var(--neon)]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            0{index + 1} / Project
          </span>
        </div>
        <h4 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{project.desc}</p>

        {project.bullets && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[--neon]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <div className="flex items-center gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-xs ring-1 ring-white/10 hover:ring-[--neon]/40 hover:text-foreground"
              >
                <Github size={13} /> Code
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[--neon] px-3 py-1.5 text-xs font-semibold text-[#0B0F19] hover:scale-[1.03] transition-transform"
              >
                <ExternalLink size={13} /> View
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------- Skills -------------------- */

type SkillGroup = {
  level: "Advanced" | "Moderate" | "Basic";
  blurb: string;
  items: string[];
  accent: string;
};

const skillGroups: SkillGroup[] = [
  {
    level: "Advanced",
    blurb: "Daily-driver languages & styling",
    items: ["HTML5", "Tailwind CSS", "JavaScript", "TypeScript"],
    accent: "from-[--neon]/25 to-transparent",
  },
  {
    level: "Moderate",
    blurb: "Full-stack frameworks & data layer",
    items: ["Next.js (App Router)", "React", "FastAPI", "Better Auth (JWT)", "SQLModel", "PostgreSQL","Python"],
    accent: "from-cyan-400/25 to-transparent",
  },
  {
    level: "Basic",
    blurb: "Agentic AI tooling — actively leveling up",
    items: ["OpenAI Agent SDK", "MCP"],
    accent: "from-lime-400/25 to-transparent",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <SectionLabel>Tech Stack</SectionLabel>
          <h3 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Tools I <span className="text-gradient-neon">build</span> with.
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            A transparent view of where I'm fluent, comfortable, and currently leveling up.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.level}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-3xl p-6 bg-[#0b0f19]/40 border border-white/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-[#0b0f19]/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_1px_15px_rgba(16,185,129,0.25)]"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${g.accent}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-[--neon]">{g.level}</span>
                  <LevelDots level={g.level} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-foreground/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LevelDots({ level }: { level: SkillGroup["level"] }) {
  const filled = level === "Advanced" ? 3 : level === "Moderate" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? "bg-[--neon] shadow-[0_0_8px_var(--neon)]" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <SectionLabel>Education</SectionLabel>
          <h3 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Formal & <span className="text-gradient-neon">future-facing</span> training.
          </h3>
        </div>
        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-3xl p-7 md:col-span-4 md:row-span-2 bg-[#0b0f19]/40 border border-white/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-[#0b0f19]/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_1px_15px_rgba(16,185,129,0.25)]"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[--neon]/10 blur-3xl" />
            <GraduationCap className="text-[--neon]" size={28} />
            <h4 className="mt-6 text-2xl font-bold sm:text-3xl">Bachelor of Science in Computer Engineering</h4>
            <p className="mt-2 text-muted-foreground">Bahria University · Pakistan</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--neon]" />
              2022 — June 2026 · Ongoing
            </div>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              Core curriculum across systems engineering, signal processing, and software architecture —
              paired with deep self-directed work in AI and product engineering.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-3xl p-7 md:col-span-2 md:row-span-2 bg-[#0b0f19]/40 border border-white/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-[#0b0f19]/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_1px_15px_rgba(16,185,129,0.25)]"
          >
            <Cpu className="text-[--cyan-accent]" size={26} />
            <h4 className="mt-5 text-xl font-bold leading-snug">
              Governor Initiative for AI & Computing
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">GIAIC</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--cyan-accent]" />
              Ongoing
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Intensive program on AI, agentic systems & cloud-native development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to forward payload request across data layer.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" }); // Flush text values on validation success
    } catch (err) {
      console.error("API Pipeline Error:", err);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="relative px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <SectionLabel>Contact</SectionLabel>
          <h3 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Let's build something <span className="text-gradient-neon">inevitable</span>.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Drop a note — collaborations, contracts, or just to nerd out about agents.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-[--neon]/30 bg-[--neon]/10 px-4 py-2 text-sm font-medium text-[--neon] transition-all hover:bg-[--neon]/20 hover:scale-[1.02] glow-shadow"
            >
              <Mail size={15} />
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-[--neon]/40"
              aria-label="Copy email"
            >
              {copied ? <Check size={13} className="text-[--neon]" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass animated-border rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingField
              label="Name"
              name="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              disabled={status === "sending"}
            />
            <FloatingField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              disabled={status === "sending"}
            />
          </div>
          <div className="mt-5">
            <FloatingField
              label="Message"
              name="message"
              textarea
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              disabled={status === "sending"}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[--neon] py-3.5 text-sm font-semibold text-[--neon] transition-all hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none glow-shadow-strong"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin text-black" />
                <span>Dropping transmission...</span>
              </>
            ) : (
              "Send message"
            )}
          </button>

          {/* Dynamic Transactional Status Banners */}
          {status === "success" && (
            <p className="mt-4 text-center text-sm font-medium text-[--neon]">
              ✨ Transmission delivered successfully! I will reach out soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-400">
              ⚠️ Server error routing payload. Please try manual copy fallback!
            </p>
          )}
          
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Processes securely through serverless agent pipelines.
          </p>
        </motion.form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ahzaz Ahmed · Built with intent.
        </p>
      </div>
    </section>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  textarea,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  const cls =
    "peer w-full rounded-xl bg-white/[0.03] px-4 pt-6 pb-2 text-sm text-foreground ring-1 ring-white/10 transition-all focus:outline-none focus:ring-[--neon]/50 focus:shadow-[0_0_25px_rgba(0,255,174,0.15)] disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={cls + " resize-none"}
          disabled={disabled}
          required
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={cls}
          disabled={disabled}
          required
        />
      )}
      <label
        className={`pointer-events-none absolute left-4 transition-all ${
          active ? "top-1.5 text-[10px] uppercase tracking-widest text-[--neon]" : "top-4 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
