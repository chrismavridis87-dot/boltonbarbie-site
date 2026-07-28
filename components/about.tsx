import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutStats, siteConfig } from "@/lib/site-data";

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-container grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Meet Bolt On Barbie"
            title="Premium energy. Zero boring moments."
            description="A bold Australian streaming brand built around IRL adventures, spontaneous challenges, giveaways, subathons and a community that is part of the show—not just watching it."
          />

          <div className="mt-8 space-y-5 text-base leading-8 text-white/62">
            <p>
              Bolt On Barbie streams on Kick with a style that feels equal parts
              futuristic Vegas, modern esports and pink cyberpunk luxury.
            </p>
            <p>
              Every stream is designed to feel interactive: chat choices,
              special events, guests, milestones and chaotic moments that turn
              into stories the community remembers.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <GlassCard className="p-5 sm:p-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/45 p-6 sm:p-8">
              <div className="absolute -right-14 -top-14 size-40 rounded-full bg-neon-pink/16 blur-3xl" />
              <div className="absolute -bottom-14 -left-14 size-40 rounded-full bg-electric-blue/12 blur-3xl" />

              <p className="relative text-xs font-black uppercase tracking-[0.22em] text-neon-pink">
                The brand promise
              </p>
              <p className="relative mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                A stream that feels like a live event every time.
              </p>

              <div className="relative mt-8 grid gap-3">
                {aboutStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-neon-pink/30 bg-neon-pink/10 text-neon-pink">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-base font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="relative mt-6 text-sm text-white/45">
                Main channel:{" "}
                <a
                  href={siteConfig.kickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-electric-blue transition hover:text-white"
                >
                  kick.com/boltonbarbie
                </a>
              </p>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
