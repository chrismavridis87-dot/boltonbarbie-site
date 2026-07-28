"use client";

import { Menu, Radio, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { navItems, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header-shell fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="site-header-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/55 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,.45)] backdrop-blur-2xl md:px-6">
        <a
          href="#main-content"
          className="group flex items-center gap-3"
          aria-label="Bolt On Barbie home"
        >
          <span className="brand-neon-badge grid size-10 place-items-center rounded-xl border border-neon-pink/40 bg-neon-pink/10 text-neon-pink shadow-[0_0_24px_rgba(255,45,170,.25)]">
            <span className="font-black">B</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-bold tracking-[0.32em] text-white/45">
              BOLT ON
            </span>
            <span className="mt-1 text-sm font-black tracking-[0.18em] text-white transition group-hover:text-neon-pink">
              BARBIE
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/60 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.kickUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="header-live-button hidden items-center gap-2 rounded-xl border border-neon-pink/50 bg-neon-pink/12 px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_0_22px_rgba(255,45,170,.18)] transition hover:-translate-y-0.5 hover:bg-neon-pink hover:text-black lg:flex"
        >
          <Radio size={16} aria-hidden="true" />
          Watch live
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#090909]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.kickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-neon-pink px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black"
              >
                <Radio size={17} aria-hidden="true" />
                Watch live
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
