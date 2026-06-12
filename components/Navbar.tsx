"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { navLinks, hero } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [],
  );
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="#home"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          <Terminal className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-rotate-12" />
          <span>
            {hero.name.toLowerCase().replace(/\s+/g, "")}
            <span className="text-accent">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className="mr-1 font-mono text-xs text-accent">
                    0{i + 1}.
                  </span>
                  {link.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
          <li className="ml-3">
            <a
              href="#contact"
              className="rounded-md border border-accent px-4 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
            >
              hire_me()
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-6 pb-6 pt-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-md px-3 py-3 text-base ${
                      activeId === link.href.replace("#", "")
                        ? "bg-surface text-accent"
                        : "text-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <span className="mr-2 font-mono text-sm text-accent">
                      0{i + 1}.
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
