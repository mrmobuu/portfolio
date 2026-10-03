"use client";

import { useEffect, useRef, useState } from "react";
import { windows } from "@/data/resume";
import { ThemeToggle } from "./ThemeToggle";

// tmux-style status line. It is the site nav; the window in view is highlighted.
export function StatusBar({ session }: { session: string }) {
  const [active, setActive] = useState(windows[0].id);
  const listRef = useRef<HTMLUListElement>(null);
  const [moreRight, setMoreRight] = useState(false);

  // Fade the right edge only while more windows are hidden off-screen.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const check = () =>
      setMoreRight(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
    check();
    list.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      list.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // On narrow screens the window list scrolls sideways; keep the active one visible.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !item) return;
    const left = item.offsetLeft;
    if (left < list.scrollLeft || left + item.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - 8 });
    }
  }, [active]);

  useEffect(() => {
    const sections = windows
      .map((w) => document.getElementById(w.id))
      .filter((el): el is HTMLElement => el !== null);

    // Active = last section whose top has passed 35% of the viewport.
    // At the very bottom the last section wins, since it may be too short to reach that line.
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      const line = window.innerHeight * 0.35;
      const current = atBottom
        ? sections[sections.length - 1]
        : sections.findLast((s) => s.getBoundingClientRect().top <= line);
      setActive((current ?? sections[0]).id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Keyboard shortcuts: press 0-5 to jump to that window, like switching tmux windows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const w = windows[Number(e.key)];
      const section = /^\d$/.test(e.key) && w ? document.getElementById(w.id) : null;
      if (!section) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${w.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-panel/90 backdrop-blur">
      <nav
        aria-label="Sections"
        className="mx-auto flex max-w-[880px] items-center gap-4 px-4 font-mono text-[0.8rem] sm:px-6"
      >
        <span className="shrink-0 bg-accent px-2 py-0.5 font-medium text-on-accent">
          [{session}]
        </span>
        <ul
          ref={listRef}
          className={`relative -mx-1 flex min-w-0 gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] ${
            moreRight ? "[mask-image:linear-gradient(to_right,black_85%,transparent)]" : ""
          }`}
        >
          {windows.map((w, i) => {
            const isActive = active === w.id;
            return (
              <li key={w.id} className="shrink-0">
                <a
                  href={`#${w.id}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-keyshortcuts={String(i)}
                  className={`block px-1.5 py-0.5 transition-colors ${
                    isActive ? "text-amber" : "text-muted hover:text-text"
                  }`}
                >
                  <span aria-hidden>{i}:</span>
                  {w.label}
                  <span aria-hidden className={isActive ? "" : "invisible"}>
                    *
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
