# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 4028
npm run build        # Production build
npm run serve        # Start production server
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier format (src/**/*.{ts,tsx,css,md,json})
npm run type-check   # TypeScript validation (tsc --noEmit)
```

> TypeScript and ESLint errors are intentionally ignored during `next build` (configured in `next.config.mjs`) to allow faster development iteration. Always run `type-check` and `lint` manually before shipping.

## Architecture

This is a **Next.js 15 / React 19** single-page landing site for "JF Estudio Digital", a Spanish-language web design agency. There are no API routes — all interactivity is client-side.

### Routing

The root `/` redirects to `/home` (configured in `next.config.mjs`). The entire site is the single route `src/app/home/page.tsx`, which composes all section components in order.

### Page structure

`src/app/home/page.tsx` assembles the page from section components in `src/app/home/components/`:

| Component | Purpose |
|---|---|
| `HeroSection` | Above-the-fold banner |
| `LogoBar` | Logo/brand separator |
| `CurriculumSection` | Services / portfolio |
| `PricingSection` | Three pricing tiers ($120/$220/$380) |
| `TestimonialsSection` | Social proof |
| `DownloadSection` | Contact form — submits via WhatsApp deep link |
| `ToolsSection` | Tech stack display |
| `MobileStickyBar` | Mobile-only sticky CTA bar |

Shared layout components (`Header`, `Footer`) live in `src/components/`. Reusable UI primitives (`AppLogo`, `AppIcon`, `AppImage`) are in `src/components/ui/`.

### State & data

No global state manager. All state is local React hooks (`useState`, `useRef`, `useEffect`). There is no data fetching — content is hardcoded in components. The contact form in `DownloadSection` constructs a WhatsApp URL with a pre-filled message and opens it via `window.open`.

### Styling

Tailwind CSS with a custom design system defined in `tailwind.config.js`:
- **Colors**: `slate`, `chrome`, `sky`, `periwinkle`, `frost` custom palettes
- **Fonts**: Plus Jakarta Sans (`font-sans`) and Fraunces (`font-display`)
- **Utilities**: `glass-card` (glass-morphism), `sky-gradient`, `slate-gradient`, `glass-gradient` background classes; `glow` box-shadow; `float-a/b/c` animations
- Dark theme throughout. Avoid adding light-mode variants unless explicitly requested.

Custom global CSS is in `src/styles/tailwind.css` (imported via `src/styles/index.css`).

### Path alias

`@/*` maps to `./src/*`. Always use this alias for imports.

### Images

External images are whitelisted in `next.config.mjs` (Unsplash, Pexels, Pixabay, img.rocket.new). Use `AppImage` (`src/components/ui/AppImage.tsx`) instead of `next/image` directly — it includes a fallback handler.

### Deployment

Configured for **Netlify** via `@netlify/plugin-nextjs`. Production source maps are enabled.
