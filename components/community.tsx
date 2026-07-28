import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { communityItems } from "@/lib/site-data";

export function Community() {
  return (
    <section id="community" className="section-shell">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Community powered"
            title="The Barbie Army is part of the experience."
            description="More than a stream: this is a live, interactive entertainment brand built around participation, rewards and chaotic fun."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {communityItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <AnimatedSection key={item.title} delay={index * 0.06}>
                <GlassCard className="group h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-neon-pink/35 sm:p-6">
                  <div className="relative flex h-full flex-col">
                    <span className="grid size-12 place-items-center rounded-2xl border border-neon-pink/30 bg-neon-pink/10 text-neon-pink shadow-[0_0_24px_rgba(255,45,170,.13)] transition group-hover:border-electric-blue/40 group-hover:bg-electric-blue/10 group-hover:text-electric-blue">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/52">
                      {item.description}
                    </p>
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-neon-pink/45 via-neon-purple/30 to-transparent" />
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
