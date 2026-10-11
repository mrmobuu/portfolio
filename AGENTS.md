<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project guide

Single-page personal portfolio for Adamya Agrawal, styled as a terminal session. Next.js (App Router), React 19, TypeScript, Tailwind CSS v4. Fully static: no API routes, no database, no data fetching.

## Commands

- `npm run dev` - dev server on http://localhost:3000
- `npm run lint` - ESLint; must pass with zero errors and zero warnings
- `npm run build` - production build; every route must prerender as static (`○`)
- `npx tsc --noEmit` - type check

## Where things live

- **Content:** all site text is in `src/data/resume.ts`. Change content there, never hard-code it in components.
- **Sections:** `windows` in `src/data/resume.ts` is the ordered list of section ids. It drives the status bar nav, the `0`-`5` keyboard shortcuts and the 404 page links. Each section component must render a matching `id` (via `Section`, or directly in `Hero`).
- **Theme:** color tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind through `@theme inline` (`bg-bg`, `text-amber`, `border-rule`, etc.). Light values appear twice, once under `prefers-color-scheme: light` and once under `:root[data-theme="light"]`; keep both in sync. Use `text-amber`/`border-amber` for amber text and lines, and `bg-accent` with `text-on-accent` for filled elements; never `bg-amber` with light text, which turns brown in light mode.
- **Theme toggle:** `ThemeToggle.tsx` sets `data-theme` on `<html>` and saves to `localStorage` under `THEME_KEY` from `src/components/theme.ts`. The inline script in `layout.tsx` applies it before first paint. No stored value means "follow the OS".
- **Error handling:** `not-found.tsx` (404), `error.tsx` (runtime errors), `global-error.tsx` (root layout failures). All three render `ErrorScreen`.

## Conventions

- **Server Components by default.** Only `StatusBar`, `ThemeToggle`, `CurrentPath`, `error.tsx` and `global-error.tsx` are client components. Keep it that way unless interactivity requires otherwise.
- **Never import plain values from a `"use client"` file into a Server Component.** They arrive as client references, not values (e.g. `.map is not a function` at build time). Shared data goes in `src/data/` or a non-client module like `src/components/theme.ts`.
- **Highlights:** `**text**` in content renders through `Rich.tsx` as amber mono. Use it for metrics only (`**98%**`, `**8 business modules**`), not for whole phrases or tech names.
- **Error boundaries:** in this Next.js version, `error.tsx` and `global-error.tsx` receive `retry()` (not the old `reset()`).
- **Copy:** plain, specific, sentence case. Buttons name the action ("Download resume (PDF)", "Email me"). Every claim must be traceable to the resume. No em dashes; use a plain hyphen.
- **Accessibility:** decorative glyphs (`$`, `*`, `+`, graph nodes) get `aria-hidden`. Keep visible focus rings, AA contrast in both themes, and respect `prefers-reduced-motion`.
- **Motion:** the only animation is the `whoami` typing effect plus cursor blink in the hero. Don't add more without a reason.
- **Privacy:** the phone number from the resume is intentionally not shown on the site.

## Verifying changes

1. `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass cleanly.
2. Check the page in a browser at desktop width and at 375px, in both themes. No horizontal page scroll; the status bar list may scroll sideways on its own.
3. For nav changes: click each tab, press `0`-`5`, and confirm the active tab follows scrolling, including `contact` at the very bottom.
4. For theme changes: toggle, reload (choice persists), and check the console for hydration warnings.
5. Unknown URLs (e.g. `/does-not-exist`) must return HTTP 404 with the custom page.
