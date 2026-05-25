import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };

const knowledge: Record<string, string> = {
  projects:
    "**Featured Projects**\n\n• **Autonomous AI Workflow Agent** — Multi-platform automation (WhatsApp, LinkedIn, Odoo) via MCP servers with secure, approval-based execution.\n• **AI-Powered Todo App** — Chat-based AI-native task management using Next.js, FastAPI, and OpenAI agent orchestration via MCP.\n• **AI Conversational Assistant** — A real-time streaming chatbot built with the OpenAI Agent SDK, Chainlit, and Gemini API.\n\nScroll down to the Projects bento for the full grid →",
  resume:
    "**Ahzaz Ahmed — AI / Full-Stack Engineer**\n\nFocus: AI-native interfaces, agentic systems, premium frontends.\nStack: Next.js · React · Tailwind · FastAPI · OpenAI Agent SDK · MCP.\nLocation: Pakistan · Open to remote.",
  stack:
    "**Tech Stack**\n\nFrontend → Next.js, React, Tailwind, Framer Motion\nBackend → FastAPI, Python, Node.js\nAI → OpenAI Agent SDK, Gemini, MCP, tool-calling, function-calling\nWorkflow → Spec-driven dev, component-driven architecture",
  about:
    "I'm a Computer Engineering student at Bahria University and a GIAIC fellow, building AI-native products. I obsess over motion, typography, and developer experience — the kind of polish that makes interfaces feel inevitable.",
  ai:
    "**AI experience**\n\nBuilding multi-agent systems with the OpenAI Agent SDK, designing MCP servers, and shipping production tool-calling pipelines. I treat LLMs as runtime — not as an autocomplete.",
  education:
    "**Education**\n\n🎓 BS Computer Engineering — Bahria University (2022 – 2026)\n🤖 Governor Initiative for AI & Computing (GIAIC) — Ongoing\n\nSee the Education bento below for details.",
  contact:
    "Best way to reach me: scroll to the **Contact** section, or fire a message in the form below. Replies within 24h.",
  default:
    "I'm a mock AI agent simulating tool-calls into Ahzaz's portfolio API. Try one of the suggested prompts, or scroll down to explore the visual portfolio.",
};

function route(q: string): string {
  const s = q.toLowerCase();
  if (/project|work|build/.test(s)) return knowledge.projects;
  if (/resume|cv/.test(s)) return knowledge.resume;
  if (/stack|tech|tool/.test(s)) return knowledge.stack;
  if (/about|who|you/.test(s)) return knowledge.about;
  if (/\bai\b|agent|llm|mcp/.test(s)) return knowledge.ai;
  if (/edu|degree|school|univ/.test(s)) return knowledge.education;
  if (/contact|email|reach|hire/.test(s)) return knowledge.contact;
  return knowledge.default;
}

const chips = [
  "See Projects",
  "View Resume",
  "Tech Stack",
  "About Me",
  "AI Experience",
  "Education",
  "Contact",
];

export function AIHub() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { 
        role: "assistant", 
        content: "I am a helpful assistant. How may I help you?", 
        streaming: false 
      }
    ]);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;

    setInput("");
    
    // 1. Build out the new history including the user's latest query
    const newMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setBusy(true);

    // Add an empty assistant placeholder for streaming tokens
    setMessages((m) => [...m, { role: "assistant", content: "", streaming: true }]);

    try {
      // 2. Fire the post request to your FastAPI backend
      const response = await fetch("https://update-portfolio-smoky.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: newMessages.map(({ role, content }) => ({ role, content }))
        }),
      });

      if (!response.body) throw new Error("No response body received");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeResponseText = "";
      let leftoverBuffer = ""; // Safely tracks partial network packets

      // 3. Parse incoming chunks from the Server-Sent Events stream safely
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = (leftoverBuffer + chunk).split("\n");
        
        // Save the very last incomplete item if it doesn't end with a newline delimiter
        leftoverBuffer = lines.pop() || "";

        for (const line of lines) {
          const cleanedLine = line.trim();
          if (!cleanedLine || !cleanedLine.startsWith("data: ")) continue;

          try {
            const rawJson = cleanedLine.slice(6);
            const parsed = JSON.parse(rawJson);
            
            if (parsed.error) {
              console.error("Backend Error:", parsed.error);
              continue;
            }

            if (parsed.delta) {
              completeResponseText += parsed.delta;
              
              // Keep updating the very last message in the array with new stream data
              setMessages((m) => {
                const copy = [...m];
                if (copy.length > 0) {
                  copy[copy.length - 1] = {
                    role: "assistant",
                    content: completeResponseText,
                    streaming: true,
                  };
                }
                return copy;
              });
            }
          } catch (err) {
            // Drop damaged chunks gracefully without stopping execution
            console.warn("Skipped parsing line fragment:", cleanedLine);
          }
        }
      }

      // Stream completed successfully -> Turn off cursor flash
      setMessages((m) => {
        const copy = [...m];
        if (copy.length > 0) {
          copy[copy.length - 1] = {
            role: "assistant",
            content: completeResponseText,
            streaming: false,
          };
        }
        return copy;
      });

    } catch (error) {
      console.error("Error communicating with AI server:", error);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I had trouble reaching my brain server. Please try again." }
      ]);
    } finally {
      setBusy(false);
    }
  };

  const skipToPortfolio = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-col items-center text-center"
      >
        <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
          <Sparkles size={12} className="text-[--neon]" />
          AI Portfolio Assistant · v1.0
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient-neon">Ask anything.</span>
          <br />
          <span className="text-foreground/90">I'll answer in real time.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          A mock agent wired into Ahzaz's portfolio. Function calls, tool routing, streaming responses — all simulated client-side.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl"
      >
        <div className="glass animated-border glow-shadow rounded-3xl p-3 sm:p-4">
          {messages.length > 0 && (
            <div
              ref={scrollerRef}
              className="scrollbar-thin mb-3 max-h-[40vh] overflow-y-auto rounded-2xl bg-black/20 p-4"
            >
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <MsgBubble key={i} msg={m} />
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 rounded-2xl bg-white/[0.03] p-2 ring-1 ring-white/10 focus-within:ring-[--neon]/40 transition-shadow focus-within:shadow-[0_0_30px_rgba(0,255,174,0.15)]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about my work, skills, or projects..."
              className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--neon] text-[#0B0F19] transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send"
            >
              <ArrowUp size={18} />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <motion.button
                key={c}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => send(c)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[--neon]/40 hover:text-foreground hover:shadow-[0_0_18px_rgba(0,255,174,0.18)]"
              >
                {c}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={skipToPortfolio}
        className="group mt-14 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted-foreground hover:border-[--neon]/40 hover:text-foreground"
      >
        Skip to visual portfolio
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-[--neon]"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}

function MsgBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-[--neon]/15 text-foreground ring-1 ring-[--neon]/30"
              : "glass text-foreground/90"
          }`}
        >
          {!isUser && msg.content === "" ? (
            <span className="flex gap-1">
              <Dot /><Dot d={0.15} /><Dot d={0.3} />
            </span>
          ) : (
            <span className={msg.streaming ? "blink-cursor" : ""}>{msg.content}</span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-[--neon]"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
    />
  );
}
