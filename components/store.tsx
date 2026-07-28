"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  LoaderCircle,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const STORE_URL = "https://botrix.live/k/boltonbarbie/shop";

export function Store() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="store" className="store-section section-shell">
      <div className="section-container">
        <AnimatedSection>
          <div className="store-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                The Bolt Vault
              </div>

              <h2 className="section-title store-section-title">
                Spend points.
                <span className="store-title-gradient">
                  Unlock chaos.
                </span>
              </h2>
            </div>

            <div className="store-heading-copy">
              <p>
                Explore community rewards inside the official Bolt On Barbie
                BotRix store. Redeem your stream points and keep an eye out for
                new rewards, limited drops and special events.
              </p>

              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-open-button"
              >
                <ShoppingBag size={19} aria-hidden="true" />
                Open full store
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="store-frame-shell">
            <div className="store-frame-cursor-glow" aria-hidden="true" />
            <div className="store-frame-scanlines" aria-hidden="true" />
            <div className="store-frame-light-sweep" aria-hidden="true" />

            <div className="store-frame-header">
              <div className="store-frame-brand">
                <span className="store-frame-logo">
                  <ShoppingBag size={19} aria-hidden="true" />
                </span>

                <div>
                  <p>The Bolt Vault</p>
                  <span>Official BotRix rewards store</span>
                </div>
              </div>

              <div className="store-frame-status">
                <span className="store-status-dot" aria-hidden="true" />
                Store online
              </div>
            </div>

            <div className="store-browser-bar">
              <div className="store-browser-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="store-browser-address">
                <Sparkles size={14} aria-hidden="true" />
                botrix.live/k/boltonbarbie/shop
              </div>

              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-browser-open"
                aria-label="Open the Bolt Vault store in a new tab"
              >
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="store-frame-container">
              {!isLoaded ? (
                <div className="store-loading">
                  <LoaderCircle
                    className="store-loading-spinner"
                    size={34}
                    aria-hidden="true"
                  />
                  <strong>Opening The Bolt Vault</strong>
                  <span>Loading community rewards...</span>
                </div>
              ) : null}

              <iframe
                src={STORE_URL}
                title="Bolt On Barbie BotRix Store"
                className={`store-frame ${isLoaded ? "is-loaded" : ""}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsLoaded(true)}
              />

              <div className="store-frame-edge-glow" aria-hidden="true" />
            </div>

            <div className="store-frame-footer">
              <span>
                The store is securely hosted by BotRix.
              </span>

              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Store not showing? Open it directly
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
