import { ImageResponse } from "next/og";

export const alt = "Mahbub Ali, Software Developer and Aspiring AI Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f3f5f8",
          color: "#122033",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            color: "#0e2a4a",
          }}
        >
          ACADEMIC AND RESEARCH PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1 }}>Mahbub Ali</div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 34,
              color: "#0e2a4a",
            }}
          >
            Software Developer | Aspiring AI Researcher
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#4a5568" }}>
          Healthcare AI, machine learning, and early disease risk detection
        </div>
      </div>
    ),
    { ...size },
  );
}
