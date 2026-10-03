"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY, type Theme } from "./theme";

const lightQuery = "(prefers-color-scheme: light)";

// The theme in effect: an explicit choice on <html data-theme>, otherwise the OS setting.
function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia(lightQuery).matches ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(lightQuery);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function ThemeToggle() {
  // null on the server, where the theme isn't known yet.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "light" ? "dark" : "light";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this visit only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      className="ml-auto flex shrink-0 items-center gap-1.5 px-1.5 py-0.5 text-muted transition-colors hover:text-text"
    >
      <span aria-hidden className="text-amber">
        {theme === "light" ? "☀" : "☾"}
      </span>
      {/* Fixed width so the bar doesn't shift when the label changes or hydrates. */}
      <span className="inline-block w-[5ch] text-left">{theme ?? ""}</span>
    </button>
  );
}
