import { ArrowUpRight, Crown, Gauge, Gift, Sparkles, Trophy } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const spotlightItems = [
  {
    number: "01",
    title: "God-tier Rewards",
    description:
      "The best rewards on any Casino.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Live challenges",
    description:
      "Pick a challenge and complete it for big prizes, something for everyone!!!.",
    icon: Gauge
  },
  {
    number: "03",
    title: "Monthly MoneyGun leaderboard",
    description:
      "A monthly community leaderboard that celebrates the most active and loyal members under the Moneygun code.",
    icon: Trophy
  },
  {
    number: "04",
    title: "Exclusive giveaways",
    description:
      "Community-only giveaways, surprise drops and special event rewards throughout the month.",
    icon: Gift
  },
{
  number: "05",
  title: "Loyalty rewards",
  description:
    "Ongoing recognition and premium rewards for the viewers who consistently support Moneygun.",
  icon: Crown
},
{
  number: "06",
  title: "Live RTP",
  description:
    "Live RTP, When you want it!.",
  icon: Gauge
}
];

export function PartnerSpotlight() {
  return (
    <section
      id="spotlight"
      className="spotlight-section section-shell"
    >
      <div className="section-container">
        <AnimatedSection>
          <div className="spotlight-kicker">
            <span aria-hidden="true" />
            Cooked
          </div>

          <div className="spotlight-heading-grid">
            <div>
              <h2 className="spotlight-title">
                Play on
                <span> Cooked.</span>
              </h2>
            </div>

            <div className="spotlight-intro">
              <p>
                A premium community experience focused on live
                interaction, monthly competition, exclusive giveaways
                and rewards that give back to the people who power the
                stream.
              </p>

              <a
                href="https://cooked.com/?auth=register-moneygun100&referral_source=MONEYGUN"
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight-link"
              >
                Cooked Casino - Code: Moneygun
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        <div className="spotlight-list">
          {spotlightItems.map((item, index) => {
            const Icon = item.icon;

            return (
<AnimatedSection
  key={item.title}
  delay={index * 0.06}
>
  <div className="spotlight-row">
    <span className="spotlight-number">
      {item.number}
    </span>

    <span className="spotlight-icon">
      <Icon size={24} aria-hidden="true" />
    </span>

    <div className="spotlight-copy">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>

    <span
      className="spotlight-line"
      aria-hidden="true"
    />
  </div>
</AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.18}>
          <div className="spotlight-statement">
            <span className="spotlight-statement-label">
              The community promise
            </span>

            <p>Show up. Get involved. Be remembered.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}