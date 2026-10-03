"use client";

import { usePathname } from "next/navigation";

// The 404 page is a Server Component without access to the URL, so read it on the client.
export function CurrentPath() {
  return <>{usePathname()}</>;
}
