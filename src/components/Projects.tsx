import { projects } from "@/data/resume";
import { Rich } from "./Rich";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" command="ls projects/">
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li
            key={p.slug}
            className="flex flex-col border border-rule bg-panel p-5 sm:p-6 sm:odd:last:col-span-2"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-mono text-base font-medium">
                {p.slug}
                <span className="text-muted">/</span>
              </h3>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-teal underline-offset-4 hover:underline"
                >
                  {p.host}
                  <span aria-hidden> ↗</span>
                  <span className="sr-only"> (opens {p.name} in a new tab)</span>
                </a>
              ) : (
                <span className="font-mono text-xs text-amber">you are here</span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">
              {p.name} - {p.kind}
            </p>

            <ul className="mt-4 flex-1 space-y-3 text-[0.95rem] leading-relaxed">
              {p.bullets.map((b) => (
                <li key={b}>
                  <Rich text={b} />
                </li>
              ))}
            </ul>

            <ul
              aria-label="Built with"
              className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-rule pt-4 font-mono text-xs text-muted"
            >
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
