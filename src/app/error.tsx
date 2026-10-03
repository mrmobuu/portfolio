"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { ErrorScreen, primaryButton, secondaryButton } from "@/components/ErrorScreen";

export default function Error({
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
    <ErrorScreen
      command="./portfolio"
      output={`error: ${error.digest ? `failed to render (ref ${error.digest})` : "failed to render"}`}
      title="Something went wrong"
      message="This page hit an unexpected error while loading. Try again, or go back to the home page."
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
  );
}
