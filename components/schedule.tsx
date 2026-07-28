"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarDays, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { schedule } from "@/lib/site-data";

const accentClass = {
  pink: "schedule-card-pink",
  blue: "schedule-card-blue",
  purple: "schedule-card-purple"
} as const;

export function Schedule() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="schedule" className="section-shell">
      <div className="section-container">
        <SectionHeading
          eyebrow="Weekly lineup"
          title="A theme for every day. No fixed start times."
          description="Streams are spontaneous. Follow Kick and the socials for live alerts—then jump in whenever the neon turns on."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {schedule.map((item, index) => (
            <motion.article
              key={item.day}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.58,
                delay: index * 0.055,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.012,
                      transition: { duration: 0.2 }
                    }
              }
              className={`schedule-card-premium ${accentClass[item.accent as keyof typeof accentClass]}`}
            >
              <div className="schedule-card-glow" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="schedule-day-premium">
                    <span>{item.shortDay}</span>
                    <strong>{item.day}</strong>
                  </div>
                  <span className="schedule-spark">
                    <Sparkles size={20} aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.19em] text-white/35">
                  Spontaneous live theme
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white md:text-[1.7rem]">
                  {item.type}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/52">
                  {item.note}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
                  <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/38">
                    <CalendarDays size={15} aria-hidden="true" />
                    Live alert only
                  </span>
                  <ArrowUpRight
                    className="schedule-arrow"
                    size={19}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
