import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { rewardItems, siteConfig } from "@/lib/site-data";

const accentClass = {
  pink: "reward-card-pink",
  blue: "reward-card-blue",
  purple: "reward-card-purple"
} as const;

export function Rewards() {
  return (
    <section id="rewards" className="section-shell">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Community rewards"
            title="Giving back to the people who power the stream."
            description="Loyalty rewards are built around appreciation: regular community prizes, milestone events, exclusive moments and ongoing recognition for the people who keep showing up."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {rewardItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <GlassCard
                  className={`reward-card ${accentClass[item.accent as keyof typeof accentClass]}`}
                >
                  <div className="reward-card-orb" aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                    <span className="reward-icon">
                      <Icon size={28} aria-hidden="true" />
                    </span>
                    <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-white/38">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                      {item.description}
                    </p>
                    <a
                      href={siteConfig.discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:text-neon-pink"
                    >
                      Join the community
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
