import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Martian_Mono } from "next/font/google";
import { THEME_KEY } from "@/components/theme";
import { profile } from "@/data/resume";
import "./globals.css";

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = `${profile.name} - ${profile.role}`;
const description = `${profile.name} is a ${profile.role.toLowerCase()} building ERP systems, React and Angular dashboards, and Node.js services. Technical Consultant at Pragati Defence, previously at ZS Associates.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.url }],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    title,
    description,
    firstName: "Adamya",
    lastName: "Agrawal",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141a22" },
    { media: "(prefers-color-scheme: light)", color: "#eef1f5" },
  ],
};

// Applies a saved theme choice before first paint, so there's no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script below sets data-theme before React hydrates.
    <html
      lang="en"
      className={`${martian.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
