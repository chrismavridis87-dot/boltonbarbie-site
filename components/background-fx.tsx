"use client";

import { motion, useReducedMotion } from "motion/react";

const particles = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 5),
  duration: 7 + (index % 8),
  delay: (index % 10) * -0.65,
  color:
    index % 3 === 0
      ? "rgba(0,217,255,.86)"
      : index % 3 === 1
        ? "rgba(255,45,170,.9)"
        : "rgba(139,92,246,.82)"
}));

const beams = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  left: `${8 + index * 21}%`,
  delay: `${index * -1.8}s`,
  duration: `${7 + index * 1.2}s`
}));

export function BackgroundFx() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="parallax-background-layer parallax-background-slow">
        <div className="neon-aurora neon-aurora-pink" />
      </div>

      <div className="parallax-background-layer parallax-background-medium">
        <div className="neon-aurora neon-aurora-blue" />
      </div>

      <div className="parallax-background-layer parallax-background-fast">
        <div className="neon-aurora neon-aurora-purple" />
      </div>

      <div className="parallax-grid-layer">
        <div className="cyber-grid absolute inset-x-0 bottom-0 h-[72vh] opacity-45" />
      </div>

      <div className="scanline absolute inset-0 opacity-35" />

      <div className="neon-beam-field" aria-hidden="true">
        {beams.map((beam) => (
          <span
            key={beam.id}
            style={{
              left: beam.left,
              animationDelay: beam.delay,
              animationDuration: beam.duration
            }}
          />
        ))}
      </div>

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 5}px ${particle.color}`
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -42, 0],
                  x: [0, particle.id % 2 ? 18 : -18, 0],
                  opacity: [0.18, 1, 0.18],
                  scale: [0.72, 1.35, 0.72]
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
