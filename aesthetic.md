# Visual Aesthetic Guide

## Core Palette
- **Monochrome primary**: Black/white swap between light and dark mode
  - Primary buttons: `bg-black text-white dark:bg-white dark:text-black`
  - Hover: `hover:bg-black/90 dark:hover:bg-white/90`
  - Shadow: `shadow-[0_12px_30px_rgba(0,0,0,0.2)]`
- **Glass-morphism**: Semi-transparent cards with subtle borders
  - `bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10`
  - Backdrop blur on desktop only: `md:backdrop-blur`
- **Text**: Gray scale with weight-based hierarchy
  - Headings: `text-gray-900 dark:text-white font-black`
  - Body: `text-gray-600 dark:text-gray-300`
  - Muted: `text-gray-500 dark:text-gray-400`
  - Labels: `text-gray-400 dark:text-gray-500`

## Accent Colors (labels/decorations only, NOT button backgrounds)
- **Work/Twitter**: sky-500/400
- **GitHub**: emerald-500/400
- **Projects**: indigo-500/400
- **Publications**: amber-500/400
- **Contact**: violet-500/400
- **Writeups**: indigo-500/400
- **Notes**: emerald-500/400

## Usage Rules
- Accent colors are for: section titles, tracking labels, dot indicators, border highlights on hover, gradient accents
- Accent colors are NOT for: button backgrounds, large filled areas, navigation elements
- Buttons use monochrome (black/white) with shadow depth for emphasis
- Ghost/secondary buttons: `variant="ghost"` with gray text, no background
- Interactive hover: `-translate-y-0.5` lift with increased shadow depth
- Font: monospace (`font-mono`) for labels, tracking text, numbers, technical content

## Shadows
- Cards: `shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]`
- Hover: `shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)]`
- CTA buttons: `shadow-[0_12px_30px_rgba(0,0,0,0.2)]`
- Glass cards: `shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`

## Typography
- Headings: `font-black tracking-tight` with monospace family for hero text
- Labels: `text-xs font-mono font-bold tracking-[0.3em]` (all-caps)
- Body: system sans-serif, `leading-relaxed` or `leading-1.8`
- Tags/pills: `rounded-full border px-3 py-1 text-xs font-mono font-bold tracking-wider`

## Transitions
- All interactive: `transition-all duration-300`
- Entrance animations: `transition-all duration-700 ease-out`
- No framer-motion — CSS transitions only
