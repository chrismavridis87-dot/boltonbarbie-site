"use client";

import { useEffect, useRef, useState } from "react";

export function NeonExperience() {
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 50, y: 34 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function applyPointer() {
      root.style.setProperty("--mouse-x", `${pointerRef.current.x}%`);
      root.style.setProperty("--mouse-y", `${pointerRef.current.y}%`);
      pointerFrameRef.current = null;
    }

    function handlePointerMove(event: PointerEvent) {
      if (reducedMotion) {
        return;
      }

      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      };

      if (pointerFrameRef.current === null) {
        pointerFrameRef.current = window.requestAnimationFrame(applyPointer);
      }
    }

    function applyScroll() {
      const scrollY = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? (scrollY / scrollable) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, nextProgress)));

      if (!reducedMotion) {
        root.style.setProperty("--parallax-slow", `${scrollY * -0.018}px`);
        root.style.setProperty("--parallax-medium", `${scrollY * -0.038}px`);
        root.style.setProperty("--parallax-fast", `${scrollY * -0.065}px`);
        const glowShift = Math.sin(scrollY / 220) * 36;
        root.style.setProperty("--scroll-glow-shift", `${glowShift}px`);
        root.style.setProperty(
          "--scroll-glow-shift-negative",
          `${glowShift * -1}px`
        );
      }

      scrollFrameRef.current = null;
    }

    function handleScroll() {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(applyScroll);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    applyScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);

      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="page-entry-transition" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>BOLT ON BARBIE</strong>
      </div>

      <div
        className="neon-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <div className="neon-cursor-aura" aria-hidden="true" />

      <div className="neon-rail neon-rail-left" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="neon-rail neon-rail-right" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="neon-corner neon-corner-top-left" aria-hidden="true" />
      <div className="neon-corner neon-corner-bottom-right" aria-hidden="true" />
    </>
  );
}

const tickerItems = [
  "BOLT ON BARBIE",
  "LIVE ENERGY",
  "COMMUNITY FIRST",
  "PINK AFTER DARK",
  "IRL CHAOS",
  "NEON EVERYTHING"
];

export function NeonTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="neon-ticker" aria-label="Bolt On Barbie live brand energy">
      <div className="neon-ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
