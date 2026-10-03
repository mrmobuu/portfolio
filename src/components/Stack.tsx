import { stack } from "@/data/resume";
import { Section } from "./Section";

// Skills printed as a TOML file.
export function Stack() {
  return (
    <Section id="stack" command="cat stack.toml">
      <dl className="border border-rule bg-panel p-5 font-mono text-sm leading-relaxed sm:p-6">
        {stack.map((group) => (
          <div
            key={group.key}
            className="grid gap-x-3 py-1.5 sm:grid-cols-[9.5rem_1fr]"
          >
            <dt className="text-teal">
              {group.key}
              <span aria-hidden className="text-muted sm:hidden"> =</span>
            </dt>
            <dd className="text-text">
              <span aria-hidden className="hidden text-muted sm:inline">= </span>
              <span aria-hidden className="text-muted">[</span>
              {group.items.map((item, i) => (
                <span key={item}>
                  <span className="text-amber">&quot;</span>
                  {item}
                  <span className="text-amber">&quot;</span>
                  {i < group.items.length - 1 && <span className="text-muted">, </span>}
                </span>
              ))}
              <span aria-hidden className="text-muted">]</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
