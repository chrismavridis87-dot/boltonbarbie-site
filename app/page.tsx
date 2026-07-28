import { About } from "@/components/about";
import { BackgroundFx } from "@/components/background-fx";
import { Community } from "@/components/community";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { NeonExperience, NeonTicker } from "@/components/neon-experience";
import { PartnerSpotlight } from "@/components/partner-spotlight";
import { Rewards } from "@/components/rewards";
import { Schedule } from "@/components/schedule";
import { Store } from "@/components/store";
import { SiteHeader } from "@/components/site-header";
import { Socials } from "@/components/socials";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bolt On Barbie",
    url: "https://boltonbarbie.com",
    description:
      "Australian Kick streamer focused on spontaneous live entertainment, IRL streams, challenges, giveaways, subathons and community.",
    sameAs: [
      "https://kick.com/boltonbarbie"
    ]
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-neon-pink px-4 py-3 font-bold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <BackgroundFx />
      <NeonExperience />
      <SiteHeader />

      <main id="main-content" className="relative z-10 overflow-hidden">
        <Hero />
        <NeonTicker />
        <About />
        <Community />
        <PartnerSpotlight />
        <Rewards />
        <Schedule />
        <Store />
        <Socials />
        <Faq />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

