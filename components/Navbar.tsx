"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
          ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="#home"
          className="lowercase text-sm text-foreground transition-colors hover:text-accent"
          onClick={() => setMenuOpen(false)}
        >
          {hero.name.toLowerCase()}
          <span className="text-accent"> ✦</span>
        </Link>

        {/* Desktop links — plain, discrete, lowercase */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`lowercase text-sm transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-1 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
          <li>
            <a
              href={hero.resumeCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lowercase text-sm text-muted transition-colors hover:text-foreground"
            >
              {hero.resumeCta.label.toLowerCase()} ↗
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="p-2 text-muted transition-colors hover:text-foreground md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="overflow-hidden border-b border-border/70 bg-background/95 backdrop-blur-md md:hidden"
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
                    className={`block py-2.5 lowercase text-base ${
                      activeId === link.href.replace("#", "")
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length }}
              >
                <a
                  href={hero.resumeCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2.5 lowercase text-base text-muted hover:text-foreground"
                >
                  {hero.resumeCta.label.toLowerCase()} ↗
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
