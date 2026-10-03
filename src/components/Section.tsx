import type { ReactNode } from "react";

// A page section whose heading is the shell command that "prints" it.
export function Section({
  id,
  command,
  children,
}: {
  id: string;
  command: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-cmd`} className="mt-20 sm:mt-28">
      <h2
        id={`${id}-cmd`}
        className="font-display text-[0.95rem] font-medium tracking-tight sm:text-lg"
      >
        <span aria-hidden className="mr-2 select-none text-muted">
          $
        </span>
        {command}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
