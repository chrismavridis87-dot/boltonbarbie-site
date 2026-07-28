"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { useRef, type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  parallax?: number;
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  parallax = 18
}: AnimatedSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"]
  });

  const rawParallax = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [parallax, 0, -parallax]
  );

  const smoothParallax = useSpring(rawParallax, {
    stiffness: 85,
    damping: 24,
    mass: 0.35
  });

  return (
    <motion.div
      ref={wrapperRef}
      className={`animated-section-parallax ${className}`}
      style={shouldReduceMotion ? undefined : { y: smoothParallax }}
    >
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 34,
                scale: 0.985,
                filter: "blur(7px)"
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
              }
        }
        viewport={{ once: true, amount: 0.16 }}
        transition={{
          duration: 0.78,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
