import type { ReactNode } from "react";

// Shared terminal-style screen for the 404 and error pages.
export function ErrorScreen({
  command,
  output,
  title,
  message,
  children,
}: {
  command: ReactNode;
  output: ReactNode;
  title: string;
  message: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[880px] items-center px-4 py-16 sm:px-6">
      <div className="w-full border border-rule bg-panel">
        <div className="border-b border-rule px-4 py-2 font-mono text-xs text-muted sm:px-6">
          adamya@portfolio: ~
        </div>
        <div className="px-4 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10">
          <p className="font-mono text-sm break-all text-muted">
            <span aria-hidden>$ </span>
            <span className="text-text">{command}</span>
          </p>
          <p className="mt-1 font-mono text-sm break-all text-amber">{output}</p>

          <h1 className="mt-8 font-display text-[clamp(1.6rem,5vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-3 max-w-[56ch] leading-relaxed">{message}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export const primaryButton =
  "inline-block bg-amber px-4 py-2.5 text-center font-mono text-sm font-medium text-bg transition-opacity hover:opacity-85";
export const secondaryButton =
  "inline-block border border-rule px-4 py-2.5 text-center font-mono text-sm transition-colors hover:border-teal hover:text-teal";
