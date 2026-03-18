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
- `components/` — Reusable components (commit, job, project, skills-graph, section-title, etc.)
- `data/` — Static JSON data files (bio, jobs, work_projects, tweets)
- `hooks/` — Custom hooks (`use-in-view` for intersection observer)
- `components/providers/` — React context providers (github-data-provider)

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

### Performance
- `backdrop-blur` uses `md:backdrop-blur` (disabled on mobile for GPU performance)
- Boids canvas pauses when scrolled out of view
- Publications use static previews (YouTube thumbnails, images) instead of iframes

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

## GitHub Integration
- Fetches repos, commits, languages from GitHub API using token in `NEXT_PUBLIC_GITHUB_API_TOKEN`
- GitHub username: `Kylealanjeffrey`
- Contribution heatmap in `components/contribution-heatmap.tsx`
