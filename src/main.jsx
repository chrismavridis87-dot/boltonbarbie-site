import React, { useCallback, useEffect, useRef, useState } from "react";
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

const schedule = [
  { day: "MON", date: "LIVE", title: "Monday Madness", time: "7:30 PM" },
  { day: "TUE", date: "LIVE", title: "Community Night", time: "7:30 PM" },
  { day: "WED", date: "OFF", title: "Day Off", time: "OFFLINE" },
  { day: "THU", date: "LIVE", title: "Freestyle", time: "7:30 PM" },
  { day: "FRI", date: "LIVE", title: "Friend Friday", time: "7:30 PM" },
  { day: "SAT", date: "LIVE", title: "Celebrities", time: "8:00 PM" },
  { day: "SUN", date: "LIVE", title: "Freestyle", time: "7:30 PM" }
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


function ParticleIntro({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    const offscreen = document.createElement("canvas");
    const offscreenContext = offscreen.getContext("2d", {
      willReadFrequently: true
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.classList.add("intro-active");

    if (reducedMotion) {
      const timeout = window.setTimeout(onComplete, 350);

      return () => {
        window.clearTimeout(timeout);
        document.body.classList.remove("intro-active");
      };
    }

    const scenes = [
      {
        lines: ["BOLT ON"],
        color: [255, 28, 150],
        glow: "rgba(255, 20, 147, .95)",
        duration: 1450
      },
      {
        lines: ["BARBIE"],
        color: [255, 86, 190],
        glow: "rgba(255, 79, 186, .95)",
        duration: 1450
      },
      {
        lines: ["LIVE IRL"],
        color: [255, 225, 242],
        glow: "rgba(255, 20, 147, .95)",
        duration: 1350
      }
    ];

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let sceneIndex = 0;
    let sceneStartedAt = performance.now();
    let animationFrame = 0;
    let finished = false;
    let finishStartedAt = 0;
    let pointer = {
      x: -9999,
      y: -9999,
      active: false
    };

    function resizeCanvas() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      offscreen.width = Math.max(1, Math.floor(width));
      offscreen.height = Math.max(1, Math.floor(height));

      buildTargets(scenes[Math.min(sceneIndex, scenes.length - 1)]);
    }

    function buildTargets(scene) {
      offscreenContext.clearRect(0, 0, width, height);
      offscreenContext.fillStyle = "#ffffff";
      offscreenContext.textAlign = "center";
      offscreenContext.textBaseline = "middle";

      const longestLine = Math.max(...scene.lines.map((line) => line.length));
      const widthBasedSize = width / Math.max(longestLine * 0.72, 5);
      const heightBasedSize = height / Math.max(scene.lines.length * 2.1, 2.5);
      const fontSize = Math.max(
        48,
        Math.min(widthBasedSize, heightBasedSize, width < 700 ? 112 : 190)
      );

      offscreenContext.font = `900 ${fontSize}px Arial Black, Impact, sans-serif`;

      const lineHeight = fontSize * 0.92;
      const totalHeight = lineHeight * scene.lines.length;
      const firstY = height / 2 - totalHeight / 2 + lineHeight / 2;

      scene.lines.forEach((line, lineIndex) => {
        offscreenContext.fillText(
          line,
          width / 2,
          firstY + lineIndex * lineHeight
        );
      });

      const image = offscreenContext.getImageData(0, 0, width, height);
      const targets = [];
      const stride = width < 640 ? 7 : width < 1100 ? 6 : 5;

      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const alpha = image.data[(y * width + x) * 4 + 3];

          if (alpha > 120) {
            targets.push({ x, y });
          }
        }
      }

      for (let i = targets.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [targets[i], targets[randomIndex]] = [targets[randomIndex], targets[i]];
      }

      const maximumParticles = width < 640 ? 1700 : 3600;
      const selectedTargets = targets.slice(0, maximumParticles);

      while (particles.length < selectedTargets.length) {
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * 90,
          y: height / 2 + (Math.random() - 0.5) * 90,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          tx: width / 2,
          ty: height / 2,
          size: Math.random() * 1.8 + 0.7,
          alpha: Math.random() * 0.55 + 0.35,
          phase: Math.random() * Math.PI * 2,
          color: scene.color
        });
      }

      particles.length = selectedTargets.length;

      particles.forEach((particle, index) => {
        const target = selectedTargets[index];

        particle.tx = target.x;
        particle.ty = target.y;
        particle.color = scene.color;
        particle.alpha = Math.max(particle.alpha, 0.35);
      });
    }

    function scatterParticles() {
      particles.forEach((particle) => {
        const angle = Math.atan2(
          particle.y - height / 2,
          particle.x - width / 2
        );
        const force = 8 + Math.random() * 18;

        particle.tx =
          particle.x + Math.cos(angle) * (width * 0.45 + Math.random() * 260);
        particle.ty =
          particle.y + Math.sin(angle) * (height * 0.45 + Math.random() * 260);
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
      });
    }

    function drawBackground(time) {
      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.48,
        0,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.72
      );

      gradient.addColorStop(0, "rgba(58, 2, 34, .42)");
      gradient.addColorStop(0.45, "rgba(12, 3, 10, .92)");
      gradient.addColorStop(1, "#020102");

      context.globalCompositeOperation = "source-over";
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(255, 20, 147, .055)";
      context.lineWidth = 1;
      const gridSize = 72;
      const offset = (time * 0.012) % gridSize;

      for (let x = -gridSize + offset; x < width + gridSize; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = -gridSize + offset; y < height + gridSize; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function animate(time) {
      const scene = scenes[Math.min(sceneIndex, scenes.length - 1)];
      const elapsed = time - sceneStartedAt;

      if (!finished && elapsed > scene.duration) {
        sceneIndex += 1;
        sceneStartedAt = time;

        if (sceneIndex < scenes.length) {
          buildTargets(scenes[sceneIndex]);
        } else {
          finished = true;
          finishStartedAt = time;
          scatterParticles();
        }
      }

      drawBackground(time);

      context.globalCompositeOperation = "lighter";
      context.shadowColor = finished
        ? "rgba(255, 20, 147, .7)"
        : scenes[Math.min(sceneIndex, scenes.length - 1)].glow;
      context.shadowBlur = width < 640 ? 8 : 12;

      particles.forEach((particle) => {
        const targetForce = finished ? 0.012 : 0.026;
        const dx = particle.tx - particle.x;
        const dy = particle.ty - particle.y;

        particle.vx += dx * targetForce;
        particle.vy += dy * targetForce;

        const wave = Math.sin(time * 0.0022 + particle.phase) * 0.055;
        particle.vx += wave;
        particle.vy += Math.cos(time * 0.0018 + particle.phase) * 0.04;

        if (pointer.active) {
          const pointerDx = particle.x - pointer.x;
          const pointerDy = particle.y - pointer.y;
          const pointerDistanceSquared =
            pointerDx * pointerDx + pointerDy * pointerDy;
          const radius = width < 640 ? 95 : 145;

          if (
            pointerDistanceSquared > 0 &&
            pointerDistanceSquared < radius * radius
          ) {
            const distance = Math.sqrt(pointerDistanceSquared);
            const strength = (1 - distance / radius) * 1.45;

            particle.vx += (pointerDx / distance) * strength;
            particle.vy += (pointerDy / distance) * strength;
          }
        }

        particle.vx *= finished ? 0.965 : 0.89;
        particle.vy *= finished ? 0.965 : 0.89;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (finished) {
          particle.alpha *= 0.976;
        }

        const [red, green, blue] = particle.color;
        const shimmer = 0.76 + Math.sin(time * 0.006 + particle.phase) * 0.24;

        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${
          particle.alpha * shimmer
        })`;
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.size * shimmer,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      context.shadowBlur = 0;
      context.globalCompositeOperation = "source-over";

      if (finished) {
        const finishProgress = Math.min((time - finishStartedAt) / 900, 1);
        context.fillStyle = `rgba(2, 1, 2, ${finishProgress * 0.86})`;
        context.fillRect(0, 0, width, height);

        if (finishProgress >= 1) {
          onComplete();
          return;
        }
      }

      animationFrame = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handleClick(event) {
      const clickX = event.clientX;
      const clickY = event.clientY;

      particles.forEach((particle) => {
        const dx = particle.x - clickX;
        const dy = particle.y - clickY;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

        if (distance < 260) {
          const force = (1 - distance / 260) * 15;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      });
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handleClick);

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handleClick);
      document.body.classList.remove("intro-active");
    };
  }, [onComplete]);

  return (
    <div className="particle-intro" aria-label="Bolt On Barbie animated intro">
      <canvas ref={canvasRef} className="particle-intro-canvas" />
      <div className="particle-intro-copy">
        <span>MOVE YOUR MOUSE</span>
        <strong>THE PARTICLES REACT TO YOU</strong>
      </div>
      <button type="button" className="intro-skip" onClick={onComplete}>
        SKIP INTRO ↗
      </button>
    </div>
  );
}

function NeonExperienceHero({ isLive, onReplay }) {
  const stageRef = useRef(null);
  const burstTimeoutRef = useRef(null);
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    return () => {
      window.clearTimeout(burstTimeoutRef.current);
    };
  }, []);

  function handlePointerMove(event) {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const rectangle = stage.getBoundingClientRect();
    const x = (event.clientX - rectangle.left) / rectangle.width;
    const y = (event.clientY - rectangle.top) / rectangle.height;

    stage.style.setProperty("--pointer-x", `${x * 100}%`);
    stage.style.setProperty("--pointer-y", `${y * 100}%`);
    stage.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    stage.style.setProperty("--tilt-y", `${(x - 0.5) * 11}deg`);
  }

  function resetPointer() {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    stage.style.setProperty("--pointer-x", "50%");
    stage.style.setProperty("--pointer-y", "42%");
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  }

  function triggerBurst() {
    window.clearTimeout(burstTimeoutRef.current);
    setIsBursting(false);

    window.requestAnimationFrame(() => {
      setIsBursting(true);
      burstTimeoutRef.current = window.setTimeout(() => {
        setIsBursting(false);
      }, 900);
    });
  }

  return (
    <section className="neon-experience-hero" id="home">
      <div
        ref={stageRef}
        className={`neon-experience-stage ${
          isBursting ? "is-bursting" : ""
        }`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="neon-floor-grid" aria-hidden="true" />
        <div className="neon-beam neon-beam-left" aria-hidden="true" />
        <div className="neon-beam neon-beam-right" aria-hidden="true" />
        <div className="neon-orb neon-orb-one" aria-hidden="true" />
        <div className="neon-orb neon-orb-two" aria-hidden="true" />

        <div className="neon-status-line">
          <span className={isLive ? "status-dot is-live" : "status-dot"} />
          {isLive ? "LIVE IRL NOW" : "NEXT STREAM LOADING"}
        </div>

        <button
          type="button"
          className="neon-logo-button"
          onClick={triggerBurst}
          aria-label="Trigger the Bolt On Barbie neon light burst"
        >
          <span className="neon-logo-halo" aria-hidden="true" />
          <img
            src="/images/boltonbarbie-neon-logo.png"
            alt="Bolt On Barbie"
            className="neon-experience-logo"
          />
          <span className="neon-click-hint">CLICK THE LOGO</span>
        </button>

        <div className="neon-banner">
          <span>LIVE</span>
          <i>✦</i>
          <span>LOUD</span>
          <i>✦</i>
          <span>UNFILTERED</span>
        </div>

        <p className="neon-experience-subtitle">
          A high-energy IRL stream experience powered by pink light,
          community chaos and unforgettable live moments.
        </p>

        <div className="neon-experience-actions">
          <ExternalLink href={KICK_URL} className="neon-primary-action">
            {isLive ? "WATCH LIVE" : "FOLLOW ON KICK"} <span>↗</span>
          </ExternalLink>
          <a href="#schedule" className="neon-secondary-action">
            VIEW SCHEDULE <span>↓</span>
          </a>
          <button type="button" className="neon-replay-action" onClick={onReplay}>
            REPLAY INTRO
          </button>
        </div>

        <div className="neon-feature-strip">
          <div>
            <b>⚡</b>
            <span>
              <strong>INTERACTIVE LIGHTS</strong>
              Move your mouse
            </span>
          </div>
          <div>
            <b>♡</b>
            <span>
              <strong>COMMUNITY ENERGY</strong>
              Built for the Barbie Army
            </span>
          </div>
          <div>
            <b>♛</b>
            <span>
              <strong>CLICK TO BURST</strong>
              Trigger the neon logo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introRun, setIntroRun] = useState(0);
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);
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
      {showIntro && (
        <ParticleIntro
          key={introRun}
          onComplete={handleIntroComplete}
        />
      )}
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
        <NeonExperienceHero
          isLive={IS_LIVE}
          onReplay={() => {
            setIntroRun((currentRun) => currentRun + 1);
            setShowIntro(true);
          }}
        />

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
                  "Watch the stream, join the chat and follow every IRL adventure as it happens."
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
                Bolt On Barbie is all about IRL adventures, community laughs
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
          <div className="cooked-card partner-card">
            <div className="cooked-copy partner-copy">
              <span className="mini-label">OFFICIAL PARTNER</span>
              <h2>BOLT ON BARBIE<br />× COOKED</h2>
              <p>
                A clean partner spotlight designed to match the website’s
                black and neon-pink style.
              </p>
              <div className="partner-pill">EXCLUSIVE PARTNER</div>
            </div>

            <div className="cooked-visual partner-visual" aria-label="Cooked partner logo">
              <div className="partner-logo-glow">
                <img
                  src="/images/cooked-logo.png"
                  alt="Cooked"
                  className="cooked-logo partner-logo"
                />
              </div>
              <span className="partner-caption">BOLT ON BARBIE × COOKED</span>
            </div>
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
        <p>IRL streams, clips and community entertainment.</p>
        <span>© 2026 BOLT ON BARBIE</span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
