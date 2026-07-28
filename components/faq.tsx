import { ChevronDown, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/site-data";

export function Faq() {
  return (
    <section id="faq" className="section-shell pb-28 md:pb-36">
      <div className="section-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <AnimatedSection>
          <SectionHeading
            eyebrow="FAQ"
            title="Everything visitors need to know."
            description="Simple answers, accessible interactions and no hunting around the page."
          />

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-electric-blue/20 bg-electric-blue/[0.055] p-4 text-sm leading-6 text-white/55">
            <ShieldCheck
              className="mt-0.5 shrink-0 text-electric-blue"
              size={21}
              aria-hidden="true"
            />
            <p>
              Platform age requirements and local laws always apply. The public
              site focuses on creator content, community and stream information.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item group">
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="shrink-0 transition duration-300 group-open:rotate-180"
                    size={20}
                    aria-hidden="true"
                  />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
