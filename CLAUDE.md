# Professional Website - Kyle Jeffrey

## Project Overview
Personal portfolio website for Kyle Jeffrey (robotics/agriculture AI engineer). Built with Next.js 15, React, TypeScript, Tailwind CSS. Deployed on Vercel.

## Tech Stack
- **Framework**: Next.js 15.5 (App Router)
- **Styling**: Tailwind CSS with dark mode (`dark:` prefix)
- **Language**: TypeScript (strict mode has pre-existing errors in `app/api.ts` — ignore those)
- **Package Manager**: npm
- **Deployment**: Vercel

## Architecture
- `app/` — Next.js app router pages and API utilities
- `components/sections/` — Major page sections (home, work, github, projects, publications, twitter, contact)
- `components/` — Reusable components (commit, job, project, skills-graph, section-title, navbar, etc.)
- `components/providers/` — React context providers (`app-provider` for theme, `github-data-provider`)
- `data/` — Static JSON data files (bio, jobs, work_projects, tweets)
- `hooks/` — Custom hooks (`use-in-view` for intersection observer)
- `lib/notes.ts` — Obsidian vault reader (filesystem, frontmatter, wikilinks, remark/rehype)
- `content/notes/` — Git submodule pointing to Obsidian vault

## Key Patterns

### Section Color System
Each section has an accent color used in titles, navbar active states, and decorations:
- **Work/Twitter**: sky (blue)
- **GitHub**: emerald (green)
- **Projects**: indigo (purple)
- **Publications**: amber (orange)
- **Contact**: violet

### Section Titles
`<SectionTitle category="..." title="..." number="..." color="..." />` — shared component with scroll-triggered staggered entrance animations and hover effects. See `components/section-title.tsx`.

### Scroll Animations
- `useInView` hook (`hooks/use-in-view.ts`) wraps IntersectionObserver. Once-only trigger (disconnects after first intersection).
- `SectionShell` wraps sections with fade-in-up animation.
- Home section uses `mounted` state for initial load entrance animation.

### Boids Simulation (Skills Graph)
Canvas-based flocking simulation in `components/skills-graph.tsx`. Features:
- Category-colored boids representing skills
- User-placeable attract/repel field points
- Fullscreen mode via `createPortal` to escape z-index stacking
- `boidsRef` / `fieldPointsRef` persist state across portal remounts
- IntersectionObserver pauses animation when off-screen

### Navigation
- **Always use `<Link>` from `next/link`** for internal page links — never plain `<a>` tags. `<a>` causes full page reloads and white flash. `<Link>` enables client-side navigation where the layout shell persists.
- Keep `<a>` only for external links and file downloads (e.g., resume PDF).
- Shared `Navbar` component (`components/navbar.tsx`) is used on all pages.

### URL Search Params (Next.js 15 App Router)
- Use `useSearchParams()` from `next/navigation` to read query params in client components.
- **`useSearchParams` auto-re-renders on back/forward** — no manual sync with `useEffect` needed.
- Derive state directly from `searchParams.get()` instead of syncing to local `useState`.
- On statically rendered routes, wrap components using `useSearchParams()` in `<Suspense>`.
- For **shallow URL updates** (no server re-fetch), use `window.history.pushState()` — Next.js hooks pick up the change automatically.
- For **full navigation** with server re-fetch, use `router.push()` from `useRouter()`.
- **Never set state during render** from searchParams — causes React error #418 (hydration mismatch).

### Dark Mode
- Centralized in `AppProvider` (`components/providers/app-provider.tsx`) via `useApp()` hook.
- Layout inline script reads `localStorage("theme")` and applies dark class before first paint (prevents FOUC).
- Default is dark mode. Toggle persists to `localStorage` key `"theme"` (`"dark"` or `"light"`).

### Performance
- `backdrop-blur` uses `md:backdrop-blur` (disabled on mobile for GPU performance)
- Boids canvas pauses when scrolled out of view
- Publications use static previews (YouTube thumbnails, images) instead of iframes
- Hero section content (h1, image) must NOT have fade-in animations — delays FCP/LCP

## Style Conventions
See `aesthetic.md` for the full visual guide. Key rules:
- Font: monospace for labels, tracking, and UI elements
- Glass-morphism cards: `bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10`
- Shadows use rgba with varying depths
- All animations use CSS transitions (not framer-motion)
- **Buttons are monochrome** (black/white), NOT colored — accent colors are only for labels, dots, borders
- Primary CTA: `bg-black text-white dark:bg-white dark:text-black`
- Ghost/secondary: `variant="ghost"` with gray text

## Dev Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type check (note: api.ts has pre-existing errors)
```

## Notes System
- Obsidian vault is a git submodule at `content/notes/`
- Vercel build command: `git submodule update --init --recursive && npm run build`
- `lib/notes.ts` reads `.md` files at build time, parses frontmatter (optional), resolves `[[wikilinks]]`
- Notes page (`app/notes/`) is Obsidian-style: sidebar file tree + content pane
- Catch-all route `app/notes/[...slug]/` preserves vault directory structure
- Tags are derived from folder names when frontmatter has no `tags` field
- `![[image embeds]]` are currently stripped (vault images not served)

## GitHub Integration
- Fetches repos, commits, languages from GitHub API using token in `NEXT_PUBLIC_GITHUB_API_TOKEN`
- GitHub username: `Kylealanjeffrey`
- Contribution heatmap in `components/contribution-heatmap.tsx`
