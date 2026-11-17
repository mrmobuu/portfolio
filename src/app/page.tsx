import { Awards } from "@/components/Awards";
import { CareerLog } from "@/components/CareerLog";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { StatusBar } from "@/components/StatusBar";
import type { Metadata } from "next";
import { profile, stack } from "@/data/resume";

// Canonical lives here, not in the layout, so the noindex 404 page doesn't inherit it.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ids = {
  website: `${profile.url}/#website`,
  page: `${profile.url}/#profile`,
  person: `${profile.url}/#person`,
};

// WebSite feeds Google's site name; ProfilePage + Person describe the visible page.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: profile.url,
      name: profile.name,
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": ids.page,
      url: profile.url,
      name: `${profile.name} - ${profile.role}`,
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": ids.person },
    },
    {
      "@type": "Person",
      "@id": ids.person,
      name: profile.name,
      url: profile.url,
      jobTitle: profile.role,
      description: profile.summary,
      email: `mailto:${profile.email}`,
      alumniOf: { "@type": "CollegeOrUniversity", name: "National Institute of Technology, Raipur" },
      worksFor: { "@type": "Organization", name: "Pragati Defence" },
      knowsAbout: stack.flatMap((group) => group.items),
      sameAs: profile.links.map((l) => l.url),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-20 bg-accent px-3 py-2 font-mono text-sm text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <StatusBar session={profile.handle} />
      <main id="main" className="mx-auto max-w-[880px] px-4 pb-24 sm:px-6">
        <Hero />
        <CareerLog />
        <Projects />
        <Stack />
        <Awards />
        <Contact />
        <footer className="mt-20 font-mono text-xs text-muted">
          <span aria-hidden>$ </span>exit 0
        </footer>
      </main>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
