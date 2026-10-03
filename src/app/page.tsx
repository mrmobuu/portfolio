import { Awards } from "@/components/Awards";
import { CareerLog } from "@/components/CareerLog";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { StatusBar } from "@/components/StatusBar";
import { profile } from "@/data/resume";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "National Institute of Technology, Raipur" },
  worksFor: { "@type": "Organization", name: "Pragati Defence" },
  sameAs: profile.links.map((l) => l.url),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-20 bg-amber px-3 py-2 font-mono text-sm text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
