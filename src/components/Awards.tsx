import { achievements } from "@/data/resume";
import { Rich } from "./Rich";
import { Section } from "./Section";

export function Awards() {
  return (
    <Section id="awards" command="cat achievements.log">
      <ul className="space-y-3 leading-relaxed">
        {achievements.map((a) => (
          <li key={a.text} className="grid gap-x-4 sm:grid-cols-[7.5rem_1fr] sm:items-baseline">
            <span className="font-mono text-xs text-muted sm:text-[0.8rem]">
              [{a.date}]
            </span>
            <span>
              <Rich text={a.text} />
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
