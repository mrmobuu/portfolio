"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { ErrorScreen, primaryButton, secondaryButton } from "@/components/ErrorScreen";
import "./globals.css";

// Replaces the root layout when it fails, so it brings its own <html>, <body> and styles.
// Fonts from the layout aren't loaded here; the theme falls back to system fonts.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <title>Something went wrong</title>
        <ErrorScreen
          command="./portfolio"
          output={`error: ${error.digest ? `failed to start (ref ${error.digest})` : "failed to start"}`}
          title="Something went wrong"
          message="The site hit an unexpected error while loading. Try again, or go back to the home page."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => retry()} className={primaryButton}>
              Try again
            </button>
            <Link href="/" className={secondaryButton}>
              Go to home page
            </Link>
          </div>
        </ErrorScreen>
      </body>
    </html>
  );
}
