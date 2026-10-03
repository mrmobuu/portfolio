import { profile } from "@/data/resume";
import { Section } from "./Section";

export function Contact() {
  const rows = [
    { label: "email", url: `mailto:${profile.email}`, text: profile.email, external: false },
    ...profile.links.map((l) => ({
      label: l.label.toLowerCase(),
      url: l.url,
      text: l.text,
      external: true,
    })),
    { label: "resume", url: profile.resume, text: "adamya-agrawal-resume.pdf", external: false },
  ];

  return (
    <Section id="contact" command="./contact.sh">
      <p className="max-w-[56ch] leading-relaxed">
        Open to full-stack and backend roles. Email is the fastest way to reach me.
      </p>
      <dl className="mt-6 font-mono text-sm">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[5.5rem_1fr] gap-x-3 border-b border-rule py-3 first:border-t sm:grid-cols-[8rem_1fr]"
          >
            <dt className="text-muted">{r.label}</dt>
            <dd className="min-w-0">
              <a
                href={r.url}
                {...(r.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : r.label === "resume"
                    ? { download: true }
                    : {})}
                className="break-words text-teal underline-offset-4 hover:underline"
              >
                {r.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
