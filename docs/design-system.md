# Design System — Palette & Typography

This document records the brand color palette and typography integration as
**implemented** in the codebase. It is the source of truth for how colors and
fonts are wired across the site.

## Brand palette

| Name | Hex | Role |
| --- | --- | --- |
| Deep teal | `#07161e` | Primary ink (light theme) / page surface (dark theme) |
| Soft slate-blue | `#7899ad` | Accent, secondary text (dark theme), borders (dark) |
| Warm cream | `#f2f0e8` | Page/card surface (light theme) / primary ink (dark theme) |
| Muted slate | `#6f7c80` | Muted/secondary text (light theme), borders (light) |

Direction chosen: **cream base + dark-teal ink**. Light mode sits on warm cream
with deep-teal text; dark mode inverts to deep-teal surfaces with cream text.

## Design tokens

Tokens live in `app/globals.css` and are exposed to Tailwind v4 through the
`@theme inline` block (`--color-*`). Components consume them via semantic
utilities such as `bg-background`, `text-foreground`, `border-foreground/8`,
etc., so changing the root tokens recolors the whole site.

### Light (`:root`)

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `#f2f0e8` | Warm cream surface |
| `--foreground` | `#07161e` | Deep-teal ink |
| `--muted` | `#e7e4d9` | Derived cream tint (subtle fills) |
| `--muted-foreground` | `#6f7c80` | Muted slate text |
| `--border` | `#6f7c80` | Derived; used at low alpha |
| `--accent` | `#7899ad` | Soft slate-blue |
| `--ring` | `#6f7c80` | Focus ring |
| `--frame` | `#f2f0e8` | Decorative site frame matches surface |

### Dark (`.dark`)

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `#07161e` | Deep-teal surface |
| `--foreground` | `#f2f0e8` | Cream ink |
| `--muted` | `#0e2731` | Derived teal tint |
| `--muted-foreground` | `#7899ad` | Soft slate-blue text |
| `--border` | `#7899ad` | Derived; used at low alpha |
| `--accent` | `#7899ad` | Soft slate-blue |
| `--ring` | `#7899ad` | Focus ring |
| `--frame` | `#07161e` | Decorative site frame matches surface |

`--color-accent` was added to the `@theme inline` mapping so Tailwind utilities
like `text-accent`, `bg-accent`, `border-accent` are available.

## Typography

| Purpose | Font | Variable | Fallback stack |
| --- | --- | --- | --- |
| Headings / display | Playfair Display | `--font-playfair` | `ui-serif, Georgia, serif` |
| Body / content | Inter | `--font-inter` | `system-ui, -apple-system, sans-serif` |
| Small uppercase labels | JetBrains Mono | `--font-jetbrains` | `ui-monospace, monospace` |

Fonts are loaded via `next/font/google` in `app/layout.tsx` with
`display: "swap"` and the `latin` subset. The CSS variables are attached to
`<body>` and consumed by `--font-sans` / `--font-serif` / `--font-mono` in
`globals.css`. Existing usage of `font-sans`, `font-serif`, and `font-mono`
utilities therefore picks up the new faces with no per-component font changes.

## Changes made (as implemented)

### `app/globals.css`
- Replaced `:root` and `.dark` color tokens with the palette above.
- Added `--accent` token and `--color-accent` theme mapping.
- Repointed font variables: `--font-sans` → Inter, `--font-serif` →
  Playfair Display, `--font-mono` → JetBrains Mono.

### `app/layout.tsx`
- Swapped `next/font` imports from `Fraunces, Geist, Geist_Mono` to
  `Playfair_Display, Inter, JetBrains_Mono`.
- Renamed font variables to `--font-playfair`, `--font-inter`,
  `--font-jetbrains`.
- Updated `<body>` variable classes accordingly.
- Updated `viewport.themeColor` to `#f2f0e8` (light) / `#07161e` (dark).

### `components/shaders/shader-flow.tsx`
- Recolored default WebGL uniforms `colorLowA` / `colorHighA` to palette-derived
  deep-teal (`[0.03, 0.09, 0.12]`) and soft slate-blue (`[0.47, 0.60, 0.68]`).
- `readBgColor()` already reads `--background`, so the shader backdrop syncs to
  cream/teal automatically.

### `components/ui/polaroid-strip.tsx`
- Replaced literal `bg-white`, `border-neutral-300/40`, `dark:bg-neutral-900`,
  `dark:border-white/15` with palette tokens (`bg-background`,
  `border-muted-foreground/40`, `dark:bg-muted`, `dark:border-accent/25`).

### Heading optical pass (Playfair Display)
Playfair Display has a smaller x-height and lighter appearance than the previous
Fraunces face, so heading sizes were scaled up roughly 6–8% and large display
headings were moved from `font-medium` (500) to `font-semibold` (600) to
preserve presence. Scale mapping applied across every `font-serif` heading in
`components/` and `app/`:

| Original | New |
| --- | --- |
| `1.5rem` | `1.625rem` |
| `1.75rem` | `1.875rem` |
| `2rem` | `2.125rem` |
| `2.25rem` | `2.375rem` |
| `2.5rem` | `2.625rem` |
| `2.75rem` | `2.875rem` |
| `3rem` | `3.125rem` |
| `3.25rem` | `3.375rem` |
| `3.5rem` | `3.625rem` |
| `3.75rem` | `3.875rem` |

Responsive variants (`sm:`, `md:`, `lg:`) were scaled with the same mapping.
The hero `E·Cell` wordmark keeps Tailwind's `text-6xl` / `text-7xl` sizes and
now renders `font-semibold`.

Affected files:
- `components/archives/workforce-grid.tsx`
- `components/archives/aftermovie-gallery.tsx`
- `components/archives/events-timeline.tsx`
- `components/contact/contact-card.tsx`
- `components/departments/departments.tsx`
- `components/hero/hero.tsx`
- `components/home/stats.tsx`
- `components/home/flagships.tsx`
- `app/page.tsx`
- `app/archives/page.tsx` (+ `events`, `workforce`, `aftermovie`)
- `app/newsletter/page.tsx`
- `app/contact/page.tsx`
- `app/departments/page.tsx`
- `app/podcasts/page.tsx`

## Verification

- `npm run typecheck` — passes.
- `npm run lint` — passes.
- `npm run dev` — all routes return HTTP 200: `/`, `/departments`,
  `/newsletter`, `/podcasts`, `/archives`, `/archives/events`,
  `/archives/workforce`, `/archives/aftermovie`, `/contact`.
- Compiled CSS confirmed to contain `--background: #f2f0e8` / `#07161e`,
  `--accent: #7899ad`, and the Inter / Playfair / JetBrains font stacks.
- `<body>` renders the `inter`, `jetbrains_mono`, and `playfair_display`
  variable classes.
- Material Symbols markup (`material-symbols-rounded`) confirmed rendering on
  all pages; brand SVG marks confirmed on `/contact`.

## Iconography

Lucide React was removed in favor of **Google Material Symbols (Rounded)** for
UI and department icons, plus **official brand SVGs** for social platforms.

### Loading
Material Symbols is loaded as a variable icon font via a Google Fonts
stylesheet `<link>` in the root layout `<head>` (`app/layout.tsx`), requesting
`opsz,wght,FILL,GRAD@20..48,300..500,0..1,0`. The `.material-symbols-rounded`
base class is defined in `app/globals.css` (font-family, ligatures, sizing,
`user-select: none`).

### Components
- `components/ui/icon.tsx` — `Icon` renders a Material Symbol by name. Props:
  `name` (typed as `MaterialSymbolName`), `className`, `fill` (boolean, maps to
  the `FILL` axis), `weight` (maps to `wght`), `ariaHidden` (default `true`),
  and `style`. Size is controlled with Tailwind `text-[Npx]`; color inherits
  `currentColor`.
- `components/ui/brand-icon.tsx` — `BrandIcon` renders official single-path
  brand marks (`instagram`, `linkedin`, `youtube`, `x`, `spotify`). `BrandName`
  is exported for typing.

### Icon mapping (replaced lucide names -> Material Symbols)
| Lucide | Material Symbol | Usage |
| --- | --- | --- |
| `ArrowRight` | `arrow_forward` | inline "next" CTAs |
| `ArrowUpRight` | `arrow_outward` | external / onward links |
| `Menu` / `X` | `menu` / `close` | mobile nav toggle |
| `Sun` / `Moon` | `light_mode` / `dark_mode` | theme toggle |
| `Mail` | `mail` | email CTAs and info block |
| `Check` | `check` | copy/subscribe confirmation |
| `Copy` | `content_copy` | copy email |
| `MapPin` | `location_on` | contact info block |
| `Play` | `play_arrow` | podcast/aftermovie play (filled) |
| `Radio` | `podcasts` | Spotify platform link |
| `Mic` | `rss_feed` | all-platforms podcast link |
| `Clapperboard` | `movie` | filming / aftermovie |
| `CalendarDays` | `event` | events / Pitch Perfect |
| `Trophy` | `trophy` | E-Summit |
| `Mic2` | `mic` | Founder Fireside |
| `Users` | `groups` | workforce |
| `BookOpen` | `menu_book` | Research & Learning |
| `ClipboardList` | `assignment` | Administration |
| `Handshake` | `handshake` | Projects & Partnerships |
| `Landmark` | `account_balance` | Sponsorships & Finance |
| `Lightbulb` | `lightbulb` | Incubation & Innovation |
| `Megaphone` | `campaign` | PR & Creatives |
| `Package` | `inventory_2` | Operations & Logistics |
| `Instagram`/`Linkedin`/`Youtube`/`Twitter` | `BrandIcon` SVG | social marks (X replaces Twitter) |

Affected files: all components/app pages that previously imported from
`lucide-react` — `nav.tsx`, `hero-ctas.tsx`, `contact-button.tsx`,
`contact-card.tsx`, `contact-card-ctas.tsx`, `subscribe-box.tsx`,
`departments.tsx`, `flagships.tsx`, `podcast-episodes.tsx`,
`aftermovie-gallery.tsx`, `newsletter-list.tsx`, `app/archives/page.tsx`,
`app/contact/page.tsx`.

Note: `lucide-react` remains in `package.json` but is no longer imported; it can
be removed in a follow-up.

## Copy style

All em dashes (`—`) were removed from site copy, replaced with colons or commas
where suitable (28 occurrences across components and app pages). Middle dots
(`·`) used as separators in labels and meta lines were intentionally retained.

## Notes / follow-ups

- `border-foreground/8`-style utilities are alpha applied to the ink color.
  Against a cream surface these read slightly softer than against pure white; if
  borders need more presence, bump the alpha (e.g. `/8` → `/12`).
- Shader recoloring uses the component defaults, so all three call sites
  (`components/layout/page-backdrop.tsx`, `components/hero/hero.tsx`,
  `components/contact/contact-card.tsx`) inherit the palette without edits.
- The Material Symbols stylesheet `<link>` triggers the
  `@next/next/no-page-custom-font` lint warning; it is suppressed inline in
  `app/layout.tsx` because the rule targets the legacy pages router and the link
  in the root App Router layout applies globally.
- Out of scope but flagged: `components/home/flagships.tsx` uses a
  `group-hover:` class on an element whose parent lacks a `group` class, so that
  hover never fires.
