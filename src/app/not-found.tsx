import type { Metadata } from "next";
import Link from "next/link";
import { CurrentPath } from "@/components/CurrentPath";
import { ErrorScreen, primaryButton } from "@/components/ErrorScreen";
import { windows } from "@/data/resume";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <ErrorScreen
      command={
        <>
          cd <CurrentPath />
        </>
      }
      output={
        <>
          cd: no such file or directory: <CurrentPath />
        </>
      }
      title="404: page not found"
      message="There's nothing at this address. The link may be mistyped or out of date."
    >
      <Link href="/" className={primaryButton}>
        Go to home page
      </Link>

      <nav aria-label="Sections" className="mt-8 font-mono text-sm">
        <p className="text-muted">
          <span aria-hidden>$ </span>ls ~
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {windows.map((w) => (
            <li key={w.id}>
              <Link href={`/#${w.id}`} className="text-teal underline-offset-4 hover:underline">
                {w.label}/
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </ErrorScreen>
  );
}
