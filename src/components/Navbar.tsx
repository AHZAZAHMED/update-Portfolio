import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ active }: { active: string }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y: number) => {
    if (y > lastY && y > 120) setHidden(true);
    else setHidden(false);
    setLastY(y);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed left-1/2 top-6 z-50 w-[92%] max-w-7xl -translate-x-1/2"
    >
      <div className="glass glow-shadow flex items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold tracking-tight sm:px-3"
        >
          <span className="h-2 w-2 rounded-full bg-[--neon] shadow-[0_0_10px_var(--neon)]" />
          <span className="text-gradient-neon">AHZAZ</span>
        </button>
        <div className="hidden md:flex items-center">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/5 ring-1 ring-[--neon]/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex rounded-full bg-[--neon]/10 px-4 py-2 text-sm font-semibold text-[--neon] ring-1 ring-[--neon]/40 transition-all hover:bg-[--neon]/20 hover:scale-[1.03] glow-shadow"
        >
          Let's talk
        </button>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-3 rounded-2xl p-3 md:hidden"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full rounded-lg px-4 py-2 text-left text-sm text-foreground hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
