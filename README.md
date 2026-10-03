# Adamya Agrawal - Portfolio

Personal portfolio site, styled as a terminal session. A single static page built with Next.js, TypeScript and Tailwind CSS.

## Features

- **Terminal design.** Each section is printed by a shell command: `whoami`, `git log --graph career`, `ls projects/`, `cat stack.toml`, `cat achievements.log`, `./contact.sh`.
- **Career as a git log.** Jobs and education are drawn as commits on a graph, newest first, with `(HEAD, current)` on the current role.
- **tmux-style status bar.** The sticky top bar is the site nav. It highlights the section in view, and keys `0`-`5` jump to each section.
- **Light and dark themes.** Follows the OS setting by default. The toggle in the status bar overrides it and remembers the choice.
- **Resume download.** The PDF is served from `public/adamya-agrawal-resume.pdf`.
- **Error pages.** Unknown URLs get a terminal-style 404 page (real `404` status, `noindex`). Runtime errors get a "Try again" screen.
- **Accessible and responsive.** Semantic sections, visible focus rings, a skip link, AA contrast in both themes, reduced motion respected, and works down to 320px wide. Lighthouse scores 100 for accessibility, best practices and SEO.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command         | What it does                       |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server               |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Run ESLint                         |

## Editing content

All text on the site comes from one file: [`src/data/resume.ts`](src/data/resume.ts).

| Export         | Section                                                        |
| -------------- | -------------------------------------------------------------- |
| `profile`      | Name, role, hero summary, email, social links, resume path     |
| `career`       | Jobs and education, newest first (the last entry is the root)  |
| `projects`     | Project cards. Omit `url`/`host` to show "you are here"        |
| `stack`        | Skills, grouped as TOML keys                                   |
| `achievements` | Achievements log                                               |
| `windows`      | Section ids and labels, in order (nav, shortcuts, 404 links)  |

Wrap a number in `**double asterisks**` to highlight it in amber, e.g. `cutting processing time by **97.5%**`. Keep highlights to metrics so they stand out on a skim.

To update the downloadable resume, replace `public/adamya-agrawal-resume.pdf`.

## Project structure

```
src/
  app/
    layout.tsx         fonts, metadata, pre-paint theme script
    page.tsx           composes the sections, Person JSON-LD
    globals.css        color tokens for both themes, base styles
    not-found.tsx      404 page
    error.tsx          runtime error screen
    global-error.tsx   fallback when the root layout itself fails
    icon.svg           favicon
  components/
    StatusBar.tsx      sticky nav, active-section tracking, 0-5 shortcuts
    ThemeToggle.tsx    light/dark button
    Hero.tsx, CareerLog.tsx, Projects.tsx, Stack.tsx, Awards.tsx, Contact.tsx
    Section.tsx        "$ command" section heading
    Rich.tsx           renders **highlights**
    ErrorScreen.tsx    shared layout for 404 and error pages
  data/
    resume.ts          all site content
public/
  adamya-agrawal-resume.pdf
```

## Design

| Token         | Dark      | Light     | Used for                                     |
| ------------- | --------- | --------- | -------------------------------------------- |
| `--bg`        | `#141a22` | `#f7f8fa` | Page background                              |
| `--panel`     | `#1b2330` | `#ffffff` | Terminal window, cards                       |
| `--rule`      | `#2a3444` | `#dfe4eb` | Borders                                      |
| `--text`      | `#d7dce3` | `#18202b` | Body text                                    |
| `--muted`     | `#8a95a5` | `#5b6676` | Dates, prompts, secondary text               |
| `--amber`     | `#f2b45a` | `#ad4e0c` | Amber text and lines: metrics, active nav    |
| `--accent`    | `#f2b45a` | `#f5a524` | Filled elements: buttons, chip, cursor       |
| `--on-accent` | `#141a22` | `#18202b` | Text on `--accent` fills                     |
| `--teal`      | `#6fc3b2` | `#0e7066` | Links, graph rail                            |

`--amber` and `--accent` are separate because in light mode a bright orange is too pale for text, and a text-safe orange looks brown as a fill. All text pairs meet WCAG AA.

Fonts: **Martian Mono** for the name and section commands, **IBM Plex Sans** for body text, **IBM Plex Mono** for dates, tags and code-like output.

## Deploying

The page is fully static, so it can be hosted on any static or Next.js host. On [Vercel](https://vercel.com/new), import the repo and deploy with the default settings.

After deploying, add the live `url` and `host` to the Portfolio entry in `projects` in `src/data/resume.ts` so its card links to the site.

## Known issues

- The GitHub link (`github.com/EnCoder101`) returns 404; the account appears to have been renamed. Update it in `profile.links`.
- `npm audit` reports high-severity advisories in `eslint-config-next`'s dev dependencies. They don't ship to the site, and the only automatic fix downgrades Next.js lint tooling to v14.
