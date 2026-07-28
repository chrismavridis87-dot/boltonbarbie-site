"use client";

import { useEffect, useRef, useState } from "react";

export function NeonExperience() {
  const frameRef = useRef<number | null>(null);
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
      frameRef.current = null;
    }

    function handlePointerMove(event: PointerEvent) {
      if (reducedMotion) {
        return;
      }

      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(applyPointer);
      }
    }

    function handleScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, nextProgress)));
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
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
