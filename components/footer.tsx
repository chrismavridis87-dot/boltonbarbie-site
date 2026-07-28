import { ArrowUp, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-black/70 px-4 py-10 backdrop-blur-2xl md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-neon-pink">
              Bolt On Barbie
            </p>
            <p className="mt-2 text-sm text-white/42">
              {siteConfig.tagline}
            </p>
          </div>

          <a
            href="#main-content"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white/60 transition hover:border-neon-pink/40 hover:text-white"
          >
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="flex flex-col gap-4 text-xs text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Bolt On Barbie. All rights reserved.</p>
          <p className="flex items-center gap-2 font-bold text-white/55">
            Made with
            <Heart
              className="fill-neon-pink text-neon-pink"
              size={14}
              aria-hidden="true"
            />
            and excessive neon.
          </p>
        </div>

        <p className="text-center text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
          “Yes… they’re fake.”
        </p>
      </div>
    </footer>
  );
}
