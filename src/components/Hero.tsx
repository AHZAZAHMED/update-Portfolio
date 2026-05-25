import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";
import profileImg from "@/assets/profile.jpg";

const roles = ["AI Developer", "Full-Stack Developer", "AI-Native Engineer"];

const coreStack = ["Next.js", "React", "TypeScript", "FastAPI", "Tailwind CSS", "Python"];
const introStack = ["OpenAI SDK", "MCP"];

export function Hero() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i % roles.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden px-4 pt-32 pb-16 md:pt-24">
      <div className="absolute inset-0 bg-ambient" />
      <Particles count={70} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* Text column */}
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            Hi, I'm Ahzaz Ahmed
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter whitespace-nowrap sm:text-5xl md:text-5xl lg:text-6xl"
          >
            <span className="text-gradient-neon blink-cursor">{text || "\u00a0"}</span>
          </motion.h2>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start"
          >
            {coreStack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[--neon]/25 bg-white/[0.03] px-3 py-1 text-xs font-medium text-foreground/85 transition-all hover:border-[--neon]/60 hover:bg-[--neon]/10 hover:shadow-[0_0_18px_rgba(0,255,174,0.25)]"
              >
                {s}
              </span>
            ))}
            {introStack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[--neon]/40 bg-white/[0.02] px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:border-[--neon]/70"
              >
                {s}
                <span className="rounded-sm bg-[--neon]/15 px-1 py-px text-[9px] uppercase tracking-wider text-[--neon]">
                  Intro
                </span>
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg md:mx-0"
          >
            Crafting AI-native interfaces with cinematic motion, spec-driven systems, and obsessive attention to detail.
          </motion.p>
        </div>

        {/* Profile column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex items-center justify-center"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,174,0.35),transparent_65%)] blur-3xl" />
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-85 lg:w-85">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[--neon]/40 via-[--cyan-accent]/30 to-[--lime]/30 opacity-70 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full ring-[1.5px] ring-[--lime]/40 shadow-[0_0_25px_rgba(16,185,129,0.25),0_0_60px_-10px_rgba(0,255,174,0.40),0_0_120px_-30px_rgba(34,211,238,0.30)]">
              <img
                src={profileImg}
                alt="Ahzaz Ahmed — AI-native developer portrait"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-[--neon]/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
