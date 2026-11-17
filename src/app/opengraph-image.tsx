import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";

// Social preview card, rendered at build time. Colors are the dark theme tokens from globals.css.
export const alt = `${profile.name} - ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  bg: "#141a22",
  panel: "#1b2330",
  rule: "#2a3444",
  text: "#d7dce3",
  muted: "#8a95a5",
  amber: "#f2b45a",
};

export default async function Image() {
  // Satori needs TTF/OTF, so these can't come from next/font (woff2).
  const fonts = join(process.cwd(), "src/app/fonts");
  const [display, mono] = await Promise.all([
    readFile(join(fonts, "MartianMono-Bold.ttf")),
    readFile(join(fonts, "IBMPlexMono-Regular.ttf")),
  ]);
  const host = new URL(profile.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          background: colors.bg,
          fontFamily: "Plex Mono",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: `2px solid ${colors.rule}`,
            background: colors.panel,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "18px 36px",
              borderBottom: `2px solid ${colors.rule}`,
              color: colors.muted,
              fontSize: 24,
            }}
          >
            <span>{profile.handle}@portfolio: ~</span>
            <span>zsh</span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "36px 48px" }}>
            <div style={{ display: "flex", color: colors.muted, fontSize: 30 }}>
              $ <span style={{ marginLeft: 18, color: colors.text }}>whoami</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
                color: colors.text,
                fontFamily: "Martian Mono",
                fontSize: 84,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              {profile.name.split(" ").map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
            <div style={{ display: "flex", marginTop: 28, color: colors.amber, fontSize: 34 }}>
              {profile.role}
            </div>
            <div style={{ display: "flex", marginTop: "auto", color: colors.muted, fontSize: 26 }}>
              {host}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Martian Mono", data: display, weight: 700, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
