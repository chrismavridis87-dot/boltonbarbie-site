"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, Radio, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { siteConfig } from "@/lib/site-data";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-neon-stage relative flex min-h-[100svh] items-center px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Australian Casino and IRL streamer
          </div>

          <h1 className="hero-neon-title mt-6 text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl xl:text-[96px]">
            Chaos.
            <span className="block bg-gradient-to-r from-neon-pink via-[#ff7dcb] to-electric-blue bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,45,170,.28)]">
              IRL.
            </span>
            Community.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-white/62 md:text-lg md:leading-8">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <NeonButton href={siteConfig.kickUrl} external>
              <Radio size={18} aria-hidden="true" />
              Watch live
            </NeonButton>
            <NeonButton href="#community" variant="secondary">
              <Sparkles size={18} aria-hidden="true" />
              Enter the chaos
            </NeonButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.16em] text-white/38">
            <span>Brisbane time</span>
            <span className="h-1 w-1 rounded-full bg-neon-pink" />
            <span>IRL adventures</span>
            <span className="h-1 w-1 rounded-full bg-electric-blue" />
            <span>Community first</span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-8 rounded-full bg-neon-pink/20 blur-[90px]" />
          <div className="absolute -right-5 top-10 h-48 w-48 rounded-full bg-electric-blue/15 blur-[80px]" />

          <motion.div
            className="hero-logo-frame relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.035] p-4 shadow-[0_40px_120px_rgba(0,0,0,.65),0_0_70px_rgba(255,45,170,.12)] backdrop-blur-xl"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -10, 0], rotateZ: [0, 0.4, 0] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative aspect-[1.32/1] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_45%,rgba(255,45,170,.28),transparent_38%),linear-gradient(145deg,#080808,#140716_52%,#050505)]">
              <div className="absolute inset-0 cyber-grid opacity-30" />
              <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent shadow-[0_0_24px_#FF2DAA]" />
              <Image
                src="/brand/bolt-on-barbie-logo.png"
                alt="Bolt On Barbie neon logo"
                width={1300}
                height={681}
                priority
                className="hero-neon-logo relative z-10 h-full w-full object-contain p-2 drop-shadow-[0_0_26px_rgba(255,45,170,.55)]"
              />
              <div className="absolute inset-x-7 bottom-7 z-20 flex items-center justify-between rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neon-pink">
                    Live experience
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    Built for the Barbie Army
                  </p>
                </div>
                <span className="grid size-10 place-items-center rounded-xl border border-electric-blue/35 bg-electric-blue/10 text-electric-blue shadow-[0_0_20px_rgba(0,217,255,.18)]">
                  <Radio size={18} aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.div>

          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-neon-purple/40 bg-black/65 px-4 py-3 shadow-[0_0_28px_rgba(139,92,246,.2)] backdrop-blur-xl sm:left-8">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-neon-purple">
              Signature energy
            </p>
            <p className="mt-1 font-bold text-white">Crazy Energy. Big Wins.</p>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] text-white/35 transition hover:text-white md:flex"
      >
        Discover
        <ChevronDown className="animate-bounce" size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
