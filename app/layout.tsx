import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://boltonbarbie.com"),
  title: {
    default: "Bolt On Barbie | Australian IRL Streamer",
    template: "%s | Bolt On Barbie"
  },
  description:
    "Bolt On Barbie is an Australian Kick streamer bringing IRL adventures, giveaways, subathons, challenges and community chaos.",
  keywords: [
    "Bolt On Barbie",
    "Australian streamer",
    "Kick streamer",
    "IRL streamer",
    "streaming community",
    "subathons",
    "giveaways"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: "Bolt On Barbie",
    title: "Bolt On Barbie | Chaos. IRL. Community.",
    description:
      "Premium IRL streams, community events, giveaways and unforgettable live moments.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bolt On Barbie"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt On Barbie",
    description: "Chaos. IRL. Community.",
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
