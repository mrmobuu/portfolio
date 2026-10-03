// Single source of truth for site content.
// Text wrapped in double asterisks is rendered as a highlighted metric/keyword.

export type Commit = {
  title: string;
  org: string;
  period: string;
  head?: boolean;
  note?: string;
  bullets: string[];
};

export type Project = {
  name: string;
  kind: string;
  slug: string;
  // Omit for this site itself; it renders "you are here" instead of a link.
  url?: string;
  host?: string;
  stack: string[];
  bullets: string[];
};

export const profile = {
  name: "Adamya Agrawal",
  handle: "adamya",
  role: "Full-stack engineer",
  summary:
    "I build products end to end, from the first design decision to the thing people use every day. At Pragati Defence I designed and built the company's ERP from scratch: the schema, auth, APIs and the screens people now work in. Before that, three years at ZS Associates doing the same at team scale, re-architecting services, designing dashboards and leading teams through delivery.",
  email: "adamyabansal@gmail.com",
  resume: "/adamya-agrawal-resume.pdf",
  links: [
    { label: "GitHub", url: "https://github.com/mrmobuu", text: "github.com/mrmobuu" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/adamya-agrawal-555530190/",
      text: "linkedin.com/in/adamya-agrawal",
    },
    { label: "LeetCode", url: "https://leetcode.com/u/mrmobuu/", text: "leetcode.com/u/mrmobuu" },
  ],
};

// Newest first, like `git log`. Education is the root commit.
export const career: Commit[] = [
  {
    title: "Technical Consultant",
    org: "Pragati Defence",
    period: "Jun 2026 - Present",
    head: true,
    bullets: [
      "Architected and developed an end-to-end ERP platform, digitizing **8 business modules** and replacing Excel-based workflows with centralized, role-based systems used by **10+ users** and supporting **100+ business transactions**.",
      "Modernized the company's digital platform by migrating its business-facing website from WordPress to Next.js, while independently designing and implementing the production ERP backend using Node.js, Express.js and PostgreSQL, with JWT authentication, database-backed sessions, RBAC and API security controls.",
    ],
  },
  {
    title: "Senior Software Development Engineer",
    org: "ZS Associates",
    period: "Jan 2026 - Jun 2026",
    bullets: [
      "Led a team of **6 engineers** delivering end-to-end features, coordinating technical execution, code quality and delivery priorities while improving team productivity by **25%**.",
      "Designed and implemented an LLM observability and analytics solution integrating GCP model telemetry with a React dashboard, aggregating usage, token, latency, request and performance metrics to give senior leadership centralized visibility into model behavior and consumption.",
      "Mentored junior developers in Angular, Node.js and RESTful API integration and clean coding practices, contributing to **30%** fewer bugs and **20%** faster development cycles.",
    ],
  },
  {
    title: "Software Development Engineer",
    org: "ZS Associates",
    period: "Aug 2023 - Dec 2025",
    bullets: [
      "Re-architected a MySQL-based weekly batch scheduler into a Node.js microservice with RESTful APIs and event-driven processing, eliminating redundant temporary-table workflows and cutting processing time by **97.5%**.",
      "Redesigned an Angular data-table interface with advanced search, filtering and multi-metric views, contributing to **40%** more user engagement.",
      "Optimized MySQL queries and schemas with indexing and partitioning, cutting query execution time by **20%** for frequently accessed workflows.",
      "Built a responsive React dashboard with advanced filtering, improving user task efficiency by **35%** and data security by **40%** through controlled access and permission-based routing.",
      "Worked with clients and cross-functional teams (data, engineering) using Agile to gather requirements, design scalable solutions and run sprints, achieving **25%** higher client satisfaction.",
    ],
  },
  {
    title: "B.Tech",
    org: "National Institute of Technology, Raipur",
    period: "Jul 2019 - Jul 2023",
    note: "CPI 8.35 / 10",
    bullets: [],
  },
];

export const projects: Project[] = [
  {
    name: "Portfolio",
    kind: "This site",
    slug: "portfolio",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    bullets: [
      "A static Next.js page styled as a terminal session: career as a git log graph, and a tmux-style.",
      "All content lives in one typed data file. Light and dark themes, works down to phone width.",
    ],
  },
  {
    name: "Air-Fly",
    kind: "Flight booking platform",
    slug: "air-fly",
    url: "https://fly.mrmobu.me/",
    host: "fly.mrmobu.me",
    stack: ["React", "NestJS", "PostgreSQL", "Supabase", "Tailwind"],
    bullets: [
      "Flight booking system with Supabase auth, user profiles, booking history and an analytics tab for booked flights, passenger details and usage statistics.",
      "Flight search with advanced filters, real-time seat updates over SSE, and automated email + PDF confirmation once a booking completes.",
    ],
  },
  {
    name: "MSGames",
    kind: "Multiplayer classroom simulation",
    slug: "msgames",
    url: "https://msgames.in/simulation-platform/onion-dilemma",
    host: "msgames.in",
    stack: ["React", "Node.js", "MongoDB", "WebSockets", "Tailwind"],
    bullets: [
      "Two-player management simulation built on the Prisoner's Dilemma, with WebSockets for real-time multiplayer play.",
      "Role-based gameplay with synchronized timers, automatic bot assignment for odd-numbered groups, and dashboards tracking individual and class-wide results for students and instructors.",
    ],
  },

];

export const stack: { key: string; items: string[] }[] = [
  { key: "languages", items: ["JavaScript", "TypeScript", "C++", "Python", "SQL", "Java"] },
  { key: "frontend", items: ["Angular", "React", "Next.js", "Tailwind CSS"] },
  { key: "backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Microservices"] },
  { key: "databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { key: "cloud_devops", items: ["AWS", "Docker", "CI/CD", "Git", "GitHub"] },
  { key: "concepts", items: ["Data Structures & Algorithms", "OOP", "Distributed Systems"] },
];

export const achievements: { date: string; text: string }[] = [
  { date: "2024-2026", text: "Best Employee of the Cycle at ZS Associates, **5 times**." },
  { date: "2025-04", text: "**2nd place** in the company-wide App-a-thon hackathon." },
  { date: "ongoing", text: "**500+** DSA problems solved across LeetCode, Coding Ninjas and GFG." },
];

// Page sections, in order. Shared by the status bar (nav + 0-5 shortcuts) and the 404 page.
export const windows = [
  { id: "whoami", label: "whoami" },
  { id: "career", label: "career" },
  { id: "projects", label: "projects" },
  { id: "stack", label: "stack" },
  { id: "awards", label: "awards" },
  { id: "contact", label: "contact" },
];
