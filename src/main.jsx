import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const KICK_URL = "https://kick.com/boltonbarbie";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/theboltonbarbie",
  tiktok: "https://www.tiktok.com/@theboltonbarbie",
  youtube: "https://youtube.com/@theboltonbarbie",
  x: "https://x.com/TheBoltOnBarbie",
  facebook: "https://www.facebook.com/share/1EEYPqXzuY/?mibextid=wwXIfr",
  twitch: "https://www.twitch.tv/boltonbarbie",
  discord: "https://discord.gg/boltsvault"
};

const COOKED_URL =
  "https://cooked.com/?auth=register-moneygun100&referral_source=MONEYGUN";




const schedule = [
  { day: "MON", date: "LIVE", title: "Monday Madness"},
  { day: "TUE", date: "LIVE", title: "Community Night"},
  { day: "WED", date: "OFF", title: "Day Off", time: "DAY OFF" },
  { day: "THU", date: "LIVE", title: "Freestyle"},
  { day: "FRI", date: "LIVE", title: "Friend Friday"},
  { day: "SAT", date: "LIVE", title: "Celebrities"},
  { day: "SUN", date: "LIVE", title: "Freestyle"}
];

function ExternalLink({ href, className = "", children, style }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

function App() {
  const [liveStatus, setLiveStatus] = useState({
    isLive: false,
    checked: false,
    category: "",
    title: "",
    viewerCount: 0,
    message: "Checking stream status..."
  });

  useEffect(() => {
    let cancelled = false;

    async function checkLiveStatus() {
      try {
        const response = await fetch("/api/live-status", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`Status request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setLiveStatus({
            ...data,
            checked: true
          });
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setLiveStatus({
            isLive: false,
            checked: true,
            category: "",
            title: "",
            viewerCount: 0,
            message: "Could not check live status. Showing offline mode."
          });
        }
      }
    }

    checkLiveStatus();
    const timer = window.setInterval(checkLiveStatus, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const IS_LIVE = liveStatus.isLive === true;

  return (
    <div className="site">
      <div className="sparkle sparkle-one">✦</div>
      <div className="sparkle sparkle-two">✦</div>
      <div className="sparkle sparkle-three">✧</div>

      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-small">BOLT ON</span>
          <span className="logo-big">BARBIE</span>
        </a>

        <nav>
          <a href="#about">About</a>
          <a href="#cooked">Cooked</a>
          <a href="#socials">Socials</a>
          <a href="#schedule">Schedule</a>
        </nav>

        <ExternalLink
          href={KICK_URL}
          className={`nav-live ${IS_LIVE ? "" : "is-offline"}`}
        >
          <span className="live-pulse" />
          {IS_LIVE ? "LIVE NOW" : "OFFLINE"}
        </ExternalLink>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-sticker sticker-one">IRL CHAOS</div>
          <div className="hero-sticker sticker-two">BIG ENERGY</div>

          <div className="hero-copy">
            <div className="hero-kicker">LIVE • LOUD • UNFILTERED</div>
            <h1>
              COOKED SPINS.
              <span>IRL FUN.</span>
            </h1>
            <p>
              Slot and IRL adventures, hilarious moments on stream.
            </p>

            <div className="hero-buttons">
              <ExternalLink href={KICK_URL} className="button button-main">
                ▶ WATCH LIVE
              </ExternalLink>
              <a href="#socials" className="button button-light">FOLLOW BARBIE</a>
            </div>

            <div className="hero-note">
              <span>✦</span>
              Brisbane time • New streams every week
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-blob" />
            <div className="hero-image" />

            <div className="floating-card">
              <span>{IS_LIVE ? "NOW STREAMING" : "STREAM STATUS"}</span>
              <strong>{IS_LIVE ? "IRL" : "OFFLINE"}</strong>
              <em>{IS_LIVE ? "ABSOLUTE CHAOS" : "FOLLOW FOR ALERTS"}</em>
            </div>
          </div>
        </section>

        <section className="live-ribbon" id="live">
          <div className="ribbon-track">
            <span>✦ {IS_LIVE ? "BOLT ON BARBIE IS LIVE" : "FOLLOW FOR THE NEXT STREAM"}</span>
            <span>✦ IRL ADVENTURES</span>
            <span>✦ PINK CHAOS</span>
            <span>✦ {IS_LIVE ? "BOLT ON BARBIE IS LIVE" : "STREAM CURRENTLY OFFLINE"}</span>
          </div>
        </section>

        <section className="stream-section">
          <div className="stream-copy">
            <span className="mini-label">
              {IS_LIVE ? "LIVE STREAM" : "CURRENTLY OFFLINE"}
            </span>

            <h2>
              {IS_LIVE ? (
                <>COME HANG<br />WITH BARBIE</>
              ) : (
                <>STREAM<br />OFFLINE</>
              )}
            </h2>

            <p>
              {IS_LIVE
                ? liveStatus.title ||
                  "Watch the stream, join the chat and follow every Spin and IRL adventure as it happens."
                : "Barbie is offline right now. Follow on Kick and turn on notifications so you never miss the next IRL stream."}
            </p>

            {IS_LIVE && (
              <div className="automatic-live-details">
                <span>{liveStatus.category || "IRL"}</span>
                <span>{liveStatus.viewerCount.toLocaleString()} watching</span>
              </div>
            )}

            <ExternalLink href={KICK_URL} className="button button-main">
              {IS_LIVE ? "OPEN THE STREAM ↗" : "FOLLOW ON KICK ↗"}
            </ExternalLink>
          </div>

          {IS_LIVE ? (
            <ExternalLink href={KICK_URL} className="stream-frame stream-link">
              <div className="screen">
                <div className="screen-logo">B✦B</div>
                <strong>WATCH BOLT ON BARBIE LIVE</strong>
                <span>Click here to open the Kick stream</span>
              </div>
              <div className="screen-controls">
                <span>● LIVE</span>
                <span>FULL STREAM ↗</span>
              </div>
            </ExternalLink>
          ) : (
            <ExternalLink
              href={KICK_URL}
              className="stream-frame stream-link offline-frame"
            >
              <img
                src="/images/offline-screen.png"
                alt="Bolt On Barbie stream offline"
                className="offline-image"
              />
              <div className="screen-controls offline-controls">
                <span>● OFFLINE</span>
                <span>FOLLOW ON KICK ↗</span>
              </div>
            </ExternalLink>
          )}
        </section>


        <section className="about-section" id="about">
          <div className="about-card">
            <div className="about-badge">MEET BARBIE</div>
            <div className="about-image" />
            <div className="about-copy">
              <span className="mini-label">LOUD • PINK • UNPREDICTABLE</span>
              <h2>NOT YOUR<br />AVERAGE STREAM</h2>
              <p>
                Bolt On Barbie is all about Spinning Slots, IRL adventures, community laughs
                and unforgettable live moments. Expect bright energy and a
                stream that always feels like a party.
              </p>
              <div className="social-row">
                <ExternalLink href={SOCIAL_LINKS.instagram}>INSTAGRAM ↗</ExternalLink>
                <ExternalLink href={SOCIAL_LINKS.tiktok}>TIKTOK ↗</ExternalLink>
                <ExternalLink href={SOCIAL_LINKS.discord}>DISCORD ↗</ExternalLink>
              </div>
            </div>
          </div>
        </section>



        <section className="cooked-section" id="cooked">
          <div className="cooked-card">
            <div className="cooked-copy">
              <span className="mini-label">NEW PARTNER SECTION</span>
              <h2>Exclusively<br />on Cooked.</h2>
              <p>
                Join Bolt On Barbie on Cooked and get started using the
                exclusive referral link below.
              </p>

              <div className="cooked-code">
                <span>USE CODE</span>
                <strong>Moneygun</strong>
                <em>on Signup</em>
              </div>

              <ExternalLink href={COOKED_URL} className="button button-main">
                JOIN COOKED ↗
              </ExternalLink>
            </div>

            <ExternalLink href={COOKED_URL} className="cooked-visual">
              <div className="cooked-logo-wrap">
                <img
                  src="/images/cooked-logo.png"
                  alt="Cooked logo"
                  className="cooked-logo"
                />
              </div>
              <div className="cooked-badge">EXCLUSIVE LINK</div>
              <div className="cooked-note">
                Use code <strong>Moneygun</strong> on Signup
              </div>
            </ExternalLink>
          </div>
        </section>

        <section className="social-section" id="socials">
          <div className="section-title centered">
            <span>FOLLOW EVERYWHERE</span>
            <h2>JOIN THE<br />BARBIE ARMY</h2>
          </div>

          <div className="social-grid">
            <ExternalLink href={SOCIAL_LINKS.instagram} className="social-card">
              <span className="social-icon">IG</span>
              <div>
                <small>FOLLOW ON</small>
                <strong>Instagram</strong>
                <em>@theboltonbarbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.tiktok} className="social-card">
              <span className="social-icon">TT</span>
              <div>
                <small>WATCH ON</small>
                <strong>TikTok</strong>
                <em>@theboltonbarbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.youtube} className="social-card">
              <span className="social-icon">YT</span>
              <div>
                <small>SUBSCRIBE ON</small>
                <strong>YouTube</strong>
                <em>@theboltonbarbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.discord} className="social-card">
              <span className="social-icon">DC</span>
              <div>
                <small>JOIN THE</small>
                <strong>Bolts Vault</strong>
                <em>Discord community</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.x} className="social-card">
              <span className="social-icon">X</span>
              <div>
                <small>FOLLOW ON</small>
                <strong>X</strong>
                <em>@TheBoltOnBarbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.facebook} className="social-card">
              <span className="social-icon">FB</span>
              <div>
                <small>FOLLOW ON</small>
                <strong>Facebook</strong>
                <em>Bolt On Barbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>

            <ExternalLink href={SOCIAL_LINKS.twitch} className="social-card">
              <span className="social-icon">TW</span>
              <div>
                <small>FOLLOW ON</small>
                <strong>Twitch</strong>
                <em>boltonbarbie</em>
              </div>
              <b>↗</b>
            </ExternalLink>
          </div>
        </section>

        <section className="schedule-section" id="schedule">
          <div className="section-title centered">
            <span>BRISBANE TIME</span>
            <h2>STREAM<br />SCHEDULE</h2>
          </div>

          <div className="ticket-grid">
            {schedule.map((item) => (
              <article className="ticket" key={`${item.day}-${item.title}`}>
                <div className="ticket-date">
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                </div>
                <div className="ticket-info">
                  <span>LIVE EVENT</span>
                  <h3>{item.title}</h3>
                  <strong>{item.time}</strong>
                </div>
                <div className="ticket-edge">B✦B</div>
              </article>
            ))}
          </div>
        </section>

      </main>

      <footer>
        <a href="#home" className="logo footer-logo">
          <span className="logo-small">BOLT ON</span>
          <span className="logo-big">BARBIE</span>
        </a>
        <p>Yes Baby their real!.</p>
        <span>© 2026 BOLTONBARBIE</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
