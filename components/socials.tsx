import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { socialLinks } from "@/lib/site-data";

const accentClass = {
  pink: "social-card-pink",
  blue: "social-card-blue",
  purple: "social-card-purple"
} as const;

export function Socials() {
  return (
    <section id="socials" className="section-shell">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Follow everywhere"
            title="Big icons. Direct links. Zero searching."
            description="Every platform is one click away, with live alerts, clips, updates and community content across the full Bolt On Barbie network."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            return (
              <AnimatedSection key={social.label} delay={index * 0.055}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-card group ${accentClass[social.accent as keyof typeof accentClass]}`}
                  aria-label={`Open Bolt On Barbie on ${social.label}`}
                >
                  <span className="social-icon">
                    <Icon size={34} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-black uppercase tracking-[0.19em] text-white/38">
                      Follow on
                    </span>
                    <strong className="mt-1.5 block text-2xl font-black tracking-[-0.035em] text-white sm:text-[1.7rem]">
                      {social.label}
                    </strong>
                    <span className="mt-1.5 block truncate text-base font-semibold text-white/58">
                      {social.handle}
                    </span>
                  </span>
                  <span className="social-arrow">
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </span>
                </a>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
