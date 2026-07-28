"use client";

import { motion, useReducedMotion } from "motion/react";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  duration: 7 + (index % 6),
  delay: (index % 8) * -0.7,
  color:
    index % 3 === 0
      ? "rgba(0,217,255,.8)"
      : index % 3 === 1
        ? "rgba(255,45,170,.8)"
        : "rgba(139,92,246,.75)"
}));

export function BackgroundFx() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute -left-[15%] top-[-20%] h-[620px] w-[620px] rounded-full bg-neon-pink/12 blur-[140px]" />
      <div className="absolute -right-[12%] top-[15%] h-[540px] w-[540px] rounded-full bg-electric-blue/10 blur-[150px]" />
      <div className="absolute bottom-[-25%] left-[32%] h-[600px] w-[600px] rounded-full bg-neon-purple/10 blur-[160px]" />
      <div className="cyber-grid absolute inset-x-0 bottom-0 h-[65vh] opacity-35" />
      <div className="scanline absolute inset-0 opacity-30" />

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
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -32, 0],
                  x: [0, particle.id % 2 ? 14 : -14, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.25, 0.8]
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
