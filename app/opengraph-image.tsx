import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bolt On Barbie";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,45,170,.35), transparent 28%), radial-gradient(circle at 80% 25%, rgba(0,217,255,.22), transparent 30%), #050505",
          color: "white",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 35,
            border: "2px solid rgba(255,45,170,.55)",
            borderRadius: 36,
            boxShadow: "0 0 80px rgba(255,45,170,.25)"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 36,
              letterSpacing: 16,
              fontWeight: 800,
              color: "#00D9FF",
              marginBottom: 14
            }}
          >
            BOLT ON
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              lineHeight: 0.92,
              color: "#FF2DAA",
              textShadow:
                "0 0 24px rgba(255,45,170,.75), 0 0 58px rgba(139,92,246,.55)"
            }}
          >
            BARBIE
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 24,
              letterSpacing: 8,
              color: "white"
            }}
          >
            CHAOS • IRL • COMMUNITY
          </div>
        </div>
      </div>
    ),
    size
  );
}
