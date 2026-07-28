import {
  AtSign,
  Camera,
  Crown,
  Gift,
  HeartHandshake,
  MessageCircle,
  Music2,
  Radio,
  Sparkles,
  Trophy,
  Tv,
  Users
} from "lucide-react";

export const siteConfig = {
  name: "Bolt On Barbie",
  tagline: "Chaos. Live. Community.",
  description:
    "Australian Kick streamer bringing spontaneous live entertainment, IRL adventures, challenges, giveaways, subathons and community-first chaos.",
  kickUrl: "https://kick.com/boltonbarbie",
  discordUrl: "https://discord.gg/boltsvault",
  timezone: "Spontaneous streams — follow socials for live alerts"
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Community", href: "#community" },
  { label: "Rewards", href: "#rewards" },
  { label: "Schedule", href: "#schedule" },
  { label: "Socials", href: "#socials" },
  { label: "FAQ", href: "#faq" }
];

export const communityItems = [
  {
    title: "Loyalty Rewards",
    description:
      "Regular community prizes, surprise rewards and special events created to give back to loyal viewers.",
    icon: Gift
  },
  {
    title: "Subathons",
    description:
      "Long-form streams packed with milestones, challenges and unpredictable moments.",
    icon: Trophy
  },
  {
    title: "VIP Energy",
    description:
      "Recognition, exclusive community perks and rewards for the people who consistently support the stream.",
    icon: Crown
  },
  {
    title: "Viewer Interaction",
    description:
      "Chat-driven decisions, live challenges and a stream that reacts to the community.",
    icon: MessageCircle
  },
  {
    title: "Discord Community",
    description:
      "Behind-the-scenes updates, live alerts and a place to keep the chaos going between streams.",
    icon: Users
  },
  {
    title: "IRL Adventures",
    description:
      "Real-world streams, spontaneous moments and content that never feels scripted.",
    icon: Sparkles
  }
];

/**
 * Edit this array to update the public weekly schedule.
 * Streams are spontaneous, so no fixed times are displayed.
 */
export const schedule = [
  {
    day: "Monday",
    shortDay: "MON",
    type: "Mayhem Monday",
    note: "Chaos, big moments and unpredictable community fun.",
    accent: "pink"
  },
  {
    day: "Tuesday",
    shortDay: "TUE",
    type: "Bonus Bonanza",
    note: "Bonus features, openings and high-energy stream moments.",
    accent: "blue"
  },
  {
    day: "Wednesday",
    shortDay: "WED",
    type: "Filo Frenzy",
    note: "Community giveaway stream.",
    accent: "purple"
  },
  {
    day: "Thursday",
    shortDay: "THU",
    type: "Tournament Takeover",
    note: "Community tournament plus giveaways.",
    accent: "blue"
  },
  {
    day: "Friday",
    shortDay: "FRI",
    type: "Freestyle Friday",
    note: "Anything goes — IRL, challenges and community picks.",
    accent: "pink"
  },
  {
    day: "Saturday",
    shortDay: "SAT",
    type: "Celebrity Showdown",
    note: "Community giveaway stream and special guests.",
    accent: "purple"
  },
  {
    day: "Sunday",
    shortDay: "SUN",
    type: "Shady Lady Sundays",
    note: "Relaxed vibes, big moments and community hangs.",
    accent: "pink"
  }
];

export const rewardItems = [
  {
    label: "Community Givebacks",
    title: "Rewards for showing up",
    description:
      "Regular prizes and surprise drops are my way of giving back to the people who make every stream possible.",
    icon: Gift,
    accent: "pink"
  },
  {
    label: "Special Events",
    title: "Bigger moments, bigger rewards",
    description:
      "Subathons, milestone nights, tournaments and special streams unlock additional community rewards.",
    icon: Trophy,
    accent: "blue"
  },
  {
    label: "Loyalty Recognition",
    title: "Support never goes unnoticed",
    description:
      "Long-term supporters receive recognition, exclusive community moments and ongoing loyalty perks.",
    icon: Crown,
    accent: "purple"
  }
];

export const socialLinks = [
  {
    label: "Kick",
    handle: "boltonbarbie",
    href: siteConfig.kickUrl,
    icon: Radio,
    accent: "pink"
  },
  {
    label: "Discord",
    handle: "Bolt's Vault",
    href: siteConfig.discordUrl,
    icon: MessageCircle,
    accent: "blue"
  },
  {
    label: "TikTok",
    handle: "@theboltonbarbie",
    href: "https://www.tiktok.com/@theboltonbarbie",
    icon: Music2,
    accent: "purple"
  },
  {
    label: "Instagram",
    handle: "@theboltonbarbie",
    href: "https://www.instagram.com/theboltonbarbie",
    icon: Camera,
    accent: "pink"
  },
  {
    label: "YouTube",
    handle: "@theboltonbarbie",
    href: "https://youtube.com/@theboltonbarbie",
    icon: Tv,
    accent: "blue"
  },
  {
    label: "X",
    handle: "@TheBoltOnBarbie",
    href: "https://x.com/TheBoltOnBarbie",
    icon: AtSign,
    accent: "purple"
  },
  {
    label: "Twitch",
    handle: "boltonbarbie",
    href: "https://www.twitch.tv/boltonbarbie",
    icon: Tv,
    accent: "pink"
  }
];

export const aboutStats = [
  { label: "Based in", value: "Australia", icon: HeartHandshake },
  { label: "Streaming on", value: "Kick", icon: Radio },
  { label: "Built around", value: "Community", icon: Users }
];

export const faqs = [
  {
    question: "Where does Bolt On Barbie stream?",
    answer:
      "The main live channel is on Kick. Use the Watch Live button at the top of the site to open the channel."
  },
  {
    question: "What kind of streams can I expect?",
    answer:
      "Spontaneous live entertainment, IRL adventures, community challenges, giveaways, subathons, guests and high-energy events."
  },
  {
    question: "How do I join the Discord?",
    answer:
      "Use the Discord social card or the community links throughout the site to join Bolt's Vault."
  },
  {
    question: "What time are the streams?",
    answer:
      "Streams are spontaneous and do not follow fixed hours. Follow Kick and the social accounts for live alerts and schedule updates."
  },
  {
    question: "Is the schedule easy to update?",
    answer:
      "Yes. Every day is stored in one editable array inside lib/site-data.ts. Change the day name, stream title or description in one place."
  },
  {
    question: "Is there an age or safety notice?",
    answer:
      "Some streams may contain mature themes. Follow platform age requirements and local laws. This website does not provide casino signup access, betting incentives or gambling advice."
  }
];
