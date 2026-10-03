import { career } from "@/data/resume";
import { Rich } from "./Rich";
import { Section } from "./Section";

// Career as `git log --graph`: newest commit on top, education as the root commit.
export function CareerLog() {
  return (
    <Section id="career" command="git log --graph career">
      <ol>
        {career.map((c, i) => {
          const isRoot = i === career.length - 1;
          const promoted = career[i + 1]?.org === c.org;
          return (
            <li key={c.title + c.period} className="relative pb-12 pl-9 last:pb-0 sm:pl-11">
              {/* graph rail + commit node */}
              {!isRoot && (
                <span
                  aria-hidden
                  className="absolute top-2 bottom-0 left-[7px] w-px bg-teal/60"
                />
              )}
              <span
                aria-hidden
                className={`absolute top-[0.4rem] left-0 size-[15px] rounded-full border-2 border-amber ${
                  c.head ? "bg-amber" : "bg-bg"
                }`}
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg leading-snug font-semibold">
                  {c.title}
                  <span className="font-normal text-muted"> @ </span>
                  {c.org}
                </h3>
                <p className="shrink-0 font-mono text-xs text-muted sm:text-[0.8rem]">
                  {c.period}
                </p>
              </div>

              {(c.head || promoted || c.note) && (
                <p className="mt-1.5 flex flex-wrap gap-2 font-mono text-xs">
                  {c.head && <span className="text-teal">(HEAD, current)</span>}
                  {promoted && <span className="text-teal">(promoted)</span>}
                  {c.note && <span className="text-amber">{c.note}</span>}
                </p>
              )}

              {c.bullets.length > 0 && (
                <ul className="mt-4 space-y-3 leading-relaxed">
                  {c.bullets.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span aria-hidden className="absolute left-0 font-mono text-muted">
                        +
                      </span>
                      <Rich text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
