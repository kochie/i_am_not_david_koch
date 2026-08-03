# "I am Not David Koch" — Visual Redesign

Date: 2026-08-03
Status: Approved

## Goal

The page's content (the jokes, the tweets, the running "I keep getting mistaken
for David Koch" bit) is good and stays as-is. The presentation is flat: plain
stacked Tailwind text blocks and `react-tweet` embeds with inconsistent ad hoc
widths (`md:w-96`, `md:w-[600px]`, `md:w-[700px]`), no visual hierarchy, and no
personality. This redesign makes it look intentional and adds humor through
small visual details rather than new jokes — direction chosen: **"Clean +
sharp, minimal bit."**

Constraints from stakeholder (Robert):
- Existing sentences/tweets are untouched — no rewriting content.
- A few small decorative additions are OK (badges, captions, hover titles) as
  long as they don't require new "joke writing" — visual/structural humor only.
- No strong opinion on palette/fonts — pick something cohesive.

## 0. Prerequisite: toolchain repair (not a design decision)

The repo has an uncommitted, half-finished dependency bump (Next 14→16,
Tailwind 3→4, React 18→19, TypeScript 5→7) that currently breaks `next build`:

- `tsconfig.json` sets `target: "es5"`, which TypeScript 7 no longer accepts
  → change to `"es2019"` (compatible with the existing `esnext`/`dom.iterable`
  lib list).
- `postcss.config.js` and `global.css` still use Tailwind v3 syntax
  (`tailwindcss` postcss plugin, `@tailwind base/components/utilities`)
  against a v4 install, where the postcss plugin moved to the separate
  `@tailwindcss/postcss` package and CSS entry uses `@import "tailwindcss";`.

This must be fixed first simply so the redesign can be verified with
`next build` / `next dev`. It is mechanical and carries no design intent.

## 1. Visual system

- **Typography**: Inter (`next/font/google`) for body copy; Space Grotesk
  (`next/font/google`) for the headline and section labels/badges. Both
  self-hosted via `next/font`, no runtime request.
- **Color**: neutral slate base (light: slate-50/white, dark: slate-900),
  plus one accent — warm amber/orange — used for links, badges, hover
  accents, and the hero "VS" divider. Chosen as a wink at "Sunrise"
  (the TV show and the literal sunrise), while staying restrained.
- **Spacing**: replace the scattered arbitrary widths with one consistent
  prose max-width (`max-w-2xl` equivalent) and a shared vertical rhythm
  scale, instead of one-off `md:w-[...]` values repeated throughout.
- **Config**: Tailwind v4 is CSS-first. `tailwind.config.js` is deleted (it
  has no customization today); the new tokens (accent color, font
  variables) are defined via an `@theme` block in `global.css`.

## 2. Structure & components

Break the current single ~190-line `index.tsx` into small presentational
components under `src/components/`:

- **`Hero`** — headline + a side-by-side "spot the difference" comparison
  of David's photo and Robert's (currently stacked vertically), with a small
  amber "VS" badge between them.
- **`Section`** — wraps a caption/paragraph block with consistent
  typography and spacing. Replaces the ~12 repeated
  `<div className="flex justify-center md:w-[600px] ...">` blocks.
- **`TweetBlock`** — consistent spacing wrapper around `<Tweet>` embeds
  (embed styling itself is left to `react-tweet`).
- **`EvidenceGrid`** — the photo-grid sections (p1–p5, josh1–2): each photo
  gets a subtle bordered/shadowed frame plus a small numbered "Exhibit #"
  badge.
- **`Footer`** — small sign-off treatment for the closing Koch Brothers
  photo instead of the page just trailing off after it.

`index.tsx` becomes composition of these components in the existing content
order — no section is reordered or reworded, only re-wrapped/re-styled.

## 3. Humor micro-details

Small, purely visual/structural additions — no new "written" jokes:

- "Exhibit #" badges in the photo-evidence grids (ties into the existing
  "cowards who delete their tweets" line already in the copy).
- Amber "VS" badge in the hero photo comparison.
- A couple of dry `title` attributes (hover tooltips) on the confusion
  photos — invisible unless hovered, zero layout risk.

## 4. Interactions

Deliberately restrained, matching "minimal bit":
- Hover scale/shadow transitions on photos and tweet card wrappers.
- Smooth scrolling.
- No scroll-triggered JS animation library — keeps the page dependency-light
  and robust. CSS `transition`/`hover:` utilities only.

## Out of scope

- Rewriting or reordering any existing sentence or tweet.
- Adding a dark-mode toggle (existing automatic `dark:`/`prefers-color-scheme`
  behavior is preserved, just restyled).
- Any new pages/routes — this is still a single-page site.
- Upgrading `next-seo`/other deps beyond what's already staged, beyond what's
  needed to make the build pass.

## Verification

- `next build` succeeds after the toolchain fix and after the redesign.
- Manual visual check via `next dev` (or a static screenshot pass) confirms
  layout renders correctly at mobile and `md:` breakpoints, light and dark.
