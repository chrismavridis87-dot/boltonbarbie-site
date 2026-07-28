# Bolt On Barbie — Luxury Neon Streamer Website

A production-ready Next.js website for the Bolt On Barbie streaming brand.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Motion for React (the current Framer Motion package)
- Lucide React icons

## Included

- Luxury black, neon-pink, electric-blue and purple visual system
- Glassmorphism cards
- Animated gradients and floating particles
- Responsive navigation and mobile menu
- Premium hero with the established Bolt On Barbie neon logo
- About, Community, Community Rewards, Schedule, Socials and FAQ sections
- Editable Monday–Sunday schedule with no fixed times
- Centralised social links and brand settings
- SEO metadata, Open Graph image and structured data
- Accessible semantic layout and reduced-motion support
- Mobile-first responsive design

## Important content note

This public build focuses on IRL streaming, community, giveaways, subathons
and challenges. It does not include gambling signup links, casino codes or
betting incentives.

## Run locally

```powershell
cd "C:\Users\Admin\OneDrive\Documents\Boltonbarbie\bolt-on-barbie-luxury-rewards"
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```powershell
npm run build
npm start
```

## Edit brand links and content

Open:

```text
lib/site-data.ts
```

You can edit:

- Kick URL
- Discord URL
- Social URLs
- About text
- Community features
- Monday–Sunday schedule
- FAQ answers

## Update the weekly schedule

Every schedule card is generated from the `schedule` array in:

```text
lib/site-data.ts
```

Example:

```ts
{
  day: "Monday",
  shortDay: "MON",
  type: "Mayhem Monday",
  note: "Chaos, big moments and unpredictable community fun.",
  accent: "pink"
}
```

No fixed times are shown. Edit the title, note and accent for each day.

## Deploy to Render

Recommended settings:

```text
Build Command: npm install && npm run build
Start Command: npm start
```

The app uses Next.js and does not need a custom server.

## Deploy to Vercel

Import the GitHub repository into Vercel. The framework should be detected
automatically as Next.js.

## Replace the logo

Replace:

```text
public/brand/bolt-on-barbie-logo.png
```

Keep the same filename to update it everywhere.


## Direct social links

The supplied Kick, Discord, TikTok, Instagram, YouTube, X and Twitch links are already configured in `lib/site-data.ts`.

## Community Rewards

The dedicated Community Rewards section is configured from the `rewardItems` array in `lib/site-data.ts`.
