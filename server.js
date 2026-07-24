import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 5173);
const CHANNEL_SLUG = process.env.KICK_CHANNEL_SLUG || "boltonbarbie";
const CHECK_CACHE_MS = 45_000;

const allowedCategoryNames = (
  process.env.IRL_ALLOWED_CATEGORIES ||
  "IRL,Just Chatting,Travel & Outdoors,Food & Drink"
)
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);

let tokenCache = {
  value: "",
  expiresAt: 0
};

let statusCache = {
  value: null,
  expiresAt: 0
};

function isConfigured() {
  return Boolean(
    process.env.KICK_CLIENT_ID?.trim() &&
    process.env.KICK_CLIENT_SECRET?.trim()
  );
}

async function getAppAccessToken() {
  const now = Date.now();

  if (tokenCache.value && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.value;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.KICK_CLIENT_ID,
    client_secret: process.env.KICK_CLIENT_SECRET
  });

  const response = await fetch("https://id.kick.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Kick token request failed (${response.status}): ${detail}`);
  }

  const data = await response.json();
  const expiresInSeconds = Number(data.expires_in || 3600);

  tokenCache = {
    value: data.access_token,
    expiresAt: now + expiresInSeconds * 1000
  };

  return tokenCache.value;
}

function categoryIsIrl(categoryName) {
  const normalized = String(categoryName || "").trim().toLowerCase();
  return allowedCategoryNames.includes(normalized);
}

async function fetchChannelStatus() {
  const now = Date.now();

  if (statusCache.value && statusCache.expiresAt > now) {
    return statusCache.value;
  }

  if (!isConfigured()) {
    const unconfigured = {
      configured: false,
      isLive: false,
      platformLive: false,
      categoryAllowed: false,
      checkedAt: new Date().toISOString(),
      message: "Kick developer credentials have not been added yet."
    };

    statusCache = {
      value: unconfigured,
      expiresAt: now + CHECK_CACHE_MS
    };

    return unconfigured;
  }

  const token = await getAppAccessToken();
  const endpoint = new URL("https://api.kick.com/public/v1/channels");
  endpoint.searchParams.append("slug", CHANNEL_SLUG);

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Kick channel request failed (${response.status}): ${detail}`
    );
  }

  const payload = await response.json();
  const channel = Array.isArray(payload.data) ? payload.data[0] : null;
  const stream = channel?.stream || null;
  const platformLive = stream?.is_live === true;
  const categoryName = channel?.category?.name || "";
  const categoryAllowed = platformLive && categoryIsIrl(categoryName);

  const result = {
    configured: true,
    isLive: platformLive && categoryAllowed,
    platformLive,
    categoryAllowed,
    category: categoryName,
    title: channel?.stream_title || "",
    viewerCount: Number(stream?.viewer_count || 0),
    thumbnail: stream?.thumbnail || "",
    checkedAt: new Date().toISOString(),
    message:
      platformLive && !categoryAllowed
        ? "The channel is live, but not in an approved IRL category."
        : platformLive
          ? "Bolt On Barbie is live with IRL content."
          : "Bolt On Barbie is currently offline."
  };

  statusCache = {
    value: result,
    expiresAt: now + CHECK_CACHE_MS
  };

  return result;
}


app.get("/healthz", (_request, response) => {
  response.status(200).json({ ok: true });
});

app.get("/api/live-status", async (_request, response) => {
  try {
    const result = await fetchChannelStatus();
    response.setHeader("Cache-Control", "no-store");
    response.json(result);
  } catch (error) {
    console.error(error);

    response.status(502).json({
      configured: isConfigured(),
      isLive: false,
      platformLive: false,
      categoryAllowed: false,
      checkedAt: new Date().toISOString(),
      message: "Live status could not be checked. Showing the offline screen."
    });
  }
});

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: "spa"
  });

  app.use(vite.middlewares);
} else {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));

  app.get("*", (_request, response) => {
    response.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("Bolt On Barbie website is running:");
  console.log(`http://localhost:${PORT}`);
  console.log("");
  console.log(
    isConfigured()
      ? "Automatic IRL live detection is configured."
      : "Automatic detection needs Kick Client ID and Client Secret in .env."
  );
});
