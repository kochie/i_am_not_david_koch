# "I am Not David Koch" Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the project's broken build toolchain, then restyle the single-page "I am Not David Koch" site with a cohesive "clean + sharp, minimal bit" visual system, while leaving every existing sentence and tweet untouched.

**Architecture:** A Next.js Pages Router app (`src/pages/index.tsx`) that currently mixes structure and content in one ~190-line file with ad hoc Tailwind widths. This plan extracts five small presentational components (`Hero`, `Section`, `TweetBlock`, `EvidenceGrid`, `Footer`) under `src/components/`, defines a small design-token set (accent color + two fonts) via Tailwind v4's CSS-first `@theme`, and reassembles `index.tsx` as a flat composition of those components in the exact original content order.

**Tech Stack:** Next.js 16 (Pages Router), React 19, TypeScript 7, Tailwind CSS v4, `next/font/google` (Inter, Space Grotesk), `react-tweet`.

## Global Constraints

- Every existing sentence, link href/text, image `alt` text, and tweet ID must appear in the final `index.tsx` unchanged and in the same order as today (see `src/pages/index.tsx` inventory in the design spec at `docs/superpowers/specs/2026-08-03-page-redesign-design.md`).
- No new written jokes/copy beyond what the spec explicitly approved: "Exhibit #" badges (numeric, not written), one "vs" badge, and two dry `title` hover tooltips total (on the Sunrise-David photo and the Koch-Brothers photo).
- No test framework exists in this repo (no Jest/Vitest/Playwright test files, no `test` script in `package.json`). Verification for each task is: `pnpm exec tsc --noEmit` (typecheck) and `pnpm build` (build + lint, since `next build` runs ESLint by default). The final task adds a one-time visual/screenshot check.
- Tailwind v4 config is CSS-first: no `tailwind.config.js`. All tokens live in `src/styles/global.css` under `@theme`.
- Single page, no new routes.

---

### Task 1: Repair the broken build toolchain

**Files:**
- Modify: `tsconfig.json`
- Modify: `postcss.config.js`
- Modify: `src/styles/global.css`
- Delete: `tailwind.config.js`
- Modify: `package.json`, `pnpm-lock.yaml` (via `pnpm add`)

**Interfaces:**
- Produces: a working `pnpm build` / `pnpm exec tsc --noEmit` for every later task to verify against.

- [ ] **Step 1: Fix the TypeScript target**

`tsconfig.json` currently has `"target": "es5"`, which TypeScript 7 rejects outright (`error TS5108: Option 'target=ES5' has been removed`). Change it:

```json
{
  "compilerOptions": {
    "target": "es2019",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

- [ ] **Step 2: Install the Tailwind v4 PostCSS plugin**

Tailwind v4.3.3 is already installed (per `package.json`), but its PostCSS integration moved to a separate package that isn't installed yet.

Run: `pnpm add -D @tailwindcss/postcss`
Expected: `package.json` devDependencies gains `@tailwindcss/postcss`, `pnpm-lock.yaml` updates, command exits 0.

- [ ] **Step 3: Point PostCSS at the new plugin**

Replace the entire contents of `postcss.config.js`:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

(v4 handles vendor prefixing and `@import` resolution itself, so `autoprefixer` is no longer needed here.)

- [ ] **Step 4: Switch the CSS entrypoint to v4 syntax**

Replace the entire contents of `src/styles/global.css`:

```css
@import "tailwindcss";
```

(Task 2 will extend this file with an `@theme` block — leave it at just the import for this step.)

- [ ] **Step 5: Delete the now-unused v3 config**

Delete `tailwind.config.js`. It only declared `content` and empty `theme.extend`/`plugins`, which v4's automatic content detection and CSS-first `@theme` replace.

Run: `rm tailwind.config.js`

- [ ] **Step 6: Verify the toolchain is fixed**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no errors.

Run: `pnpm build`
Expected: build completes successfully (you'll see `✓ Compiled successfully` and a route summary for `/`). The page will look unstyled/plain at this point — that's expected, styling comes in later tasks.

- [ ] **Step 7: Commit**

```bash
git add tsconfig.json postcss.config.js src/styles/global.css package.json pnpm-lock.yaml
git rm tailwind.config.js
git commit -m "fix: repair build toolchain for Tailwind v4 / TS 7 / Next 16"
```

---

### Task 2: Design tokens and fonts

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/_app.tsx`

**Interfaces:**
- Produces: Tailwind utilities `font-sans` (Inter), `font-display` (Space Grotesk), `bg-accent-{100,400,500,600}` / `text-accent-{100,400,500,600}` / `decoration-accent-{100,400,500,600}`, available to every component built in later tasks.

- [ ] **Step 1: Load the fonts in `_app.tsx`**

Read the current file first (`src/pages/_app.tsx`) — it has a Fathom analytics effect that must be preserved untouched. Add font loading and wrap `Component` in a `<main>` carrying the font CSS variables:

```tsx
import "../styles/global.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID || "", {
      includedDomains: ["iamnotdavidkoch.com"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <main className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
export default MyApp;
```

- [ ] **Step 2: Define theme tokens**

Replace the contents of `src/styles/global.css`:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui,
    sans-serif;

  --color-accent-100: #fef3c7;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;
}
```

This overrides Tailwind's built-in `--font-sans` key (so the `font-sans` utility now renders Inter) and adds a new `--font-display` key (Space Grotesk) plus a 4-stop `accent` color scale, generating `bg-accent-500`, `text-accent-600`, etc.

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

Run: `pnpm build`
Expected: build succeeds. (Fonts/colors won't visibly change anything yet since no component uses them — that's Tasks 3-7.)

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/pages/_app.tsx
git commit -m "feat: add Inter/Space Grotesk fonts and accent color theme tokens"
```

---

### Task 3: `Section` component

**Files:**
- Create: `src/components/Section.tsx`

**Interfaces:**
- Produces: `Section({ children, className? }: { children: ReactNode; className?: string })` — a JSX component. Used by Task 8 to wrap every standalone caption/paragraph.

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return (
    <div
      className={`mx-auto max-w-2xl px-4 text-center text-lg leading-relaxed text-slate-700 md:text-left dark:text-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0 (component is not yet used anywhere, but must type-check standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/Section.tsx
git commit -m "feat: add Section component for caption/paragraph blocks"
```

---

### Task 4: `TweetBlock` component

**Files:**
- Create: `src/components/TweetBlock.tsx`

**Interfaces:**
- Produces: `TweetBlock({ children }: { children: ReactNode })`. Used by Task 8 to wrap every `<Tweet>` embed.

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";

type TweetBlockProps = {
  children: ReactNode;
};

export function TweetBlock({ children }: TweetBlockProps) {
  return (
    <div className="flex justify-center transition-transform duration-300 hover:scale-[1.02]">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/TweetBlock.tsx
git commit -m "feat: add TweetBlock component for tweet embed spacing"
```

---

### Task 5: `Hero` component

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `StaticImageData` type from `next/image`.
- Produces: `Hero({ davidSrc, meSrc }: { davidSrc: StaticImageData; meSrc: StaticImageData })`. Used by Task 8 as the first element on the page.

- [ ] **Step 1: Create the component**

This reproduces the existing headline (including the literal underscores around "not", which is the original text — not markdown), the existing "Look at this beautiful egg shaped man..." caption, and the existing image alt text, restructured into a side-by-side comparison with a "vs" badge. One `title` tooltip is added on David's photo (per the approved spec's "couple of dry title attributes").

```tsx
import Image, { type StaticImageData } from "next/image";

type HeroProps = {
  davidSrc: StaticImageData;
  meSrc: StaticImageData;
};

export function Hero({ davidSrc, meSrc }: HeroProps) {
  return (
    <div className="flex flex-col items-center gap-8 px-4 pt-10 md:pt-24">
      <h1 className="text-center font-display text-4xl font-bold md:text-6xl">
        I am{" "}
        <span className="italic text-accent-600 dark:text-accent-400">
          _not_
        </span>{" "}
        David Koch.
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
          <Image
            src={davidSrc}
            alt="image of david koch from sunrise"
            title="Not this guy"
            className="h-auto w-full"
          />
        </div>
        <span className="z-10 rounded-full bg-accent-500 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-white shadow-md md:-mx-6">
          vs
        </span>
        <div className="w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
          <Image
            src={meSrc}
            alt="image of me robert koch"
            className="h-auto w-full"
          />
        </div>
      </div>
      <p className="max-w-xl text-center text-lg text-slate-600 dark:text-slate-300">
        Look at this beautiful egg shaped man, now look at me.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero component with side-by-side comparison"
```

---

### Task 6: `EvidenceGrid` component

**Files:**
- Create: `src/components/EvidenceGrid.tsx`

**Interfaces:**
- Consumes: `StaticImageData` type from `next/image`.
- Produces: `EvidenceGrid({ items, columns?, startIndex?, className? }: EvidenceGridProps)` where `EvidenceGrid` is exported alongside its `EvidenceItem = { src: StaticImageData; alt: string }` type. Used by Task 8 for both the 5-photo grid and the 2-photo Josh grid.

- [ ] **Step 1: Create the component**

```tsx
import Image, { type StaticImageData } from "next/image";

export type EvidenceItem = {
  src: StaticImageData;
  alt: string;
};

type EvidenceGridProps = {
  items: EvidenceItem[];
  columns?: string;
  startIndex?: number;
  className?: string;
};

export function EvidenceGrid({
  items,
  columns = "md:grid-cols-5",
  startIndex = 1,
  className = "",
}: EvidenceGridProps) {
  return (
    <div
      className={`mx-auto grid grid-cols-1 gap-4 px-4 ${columns} ${className}`}
    >
      {items.map((item, i) => (
        <figure
          key={item.alt}
          className="relative overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-700 dark:ring-white/10"
        >
          <Image src={item.src} alt={item.alt} className="h-auto w-full" />
          <figcaption className="absolute left-2 top-2 rounded-full bg-accent-500 px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-white shadow">
            Exhibit {startIndex + i}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/EvidenceGrid.tsx
git commit -m "feat: add EvidenceGrid component with Exhibit badges"
```

---

### Task 7: `Footer` component

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `StaticImageData` type from `next/image`.
- Produces: `Footer({ davidKochBrosSrc }: { davidKochBrosSrc: StaticImageData })`. Used by Task 8 as the last element on the page.

- [ ] **Step 1: Create the component**

Reproduces the existing final image and its exact `alt` text, adding the second (and last) approved `title` tooltip.

```tsx
import Image, { type StaticImageData } from "next/image";

type FooterProps = {
  davidKochBrosSrc: StaticImageData;
};

export function Footer({ davidKochBrosSrc }: FooterProps) {
  return (
    <footer className="flex justify-center px-4 pb-24">
      <div className="w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
        <Image
          src={davidKochBrosSrc}
          alt="image of David Koch from Koch Brothers."
          title="Also not this guy"
          className="h-auto w-full"
        />
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 8: Reassemble `index.tsx`

**Files:**
- Modify: `src/pages/index.tsx`

**Interfaces:**
- Consumes: `Hero` (Task 5), `Section` (Task 3), `TweetBlock` (Task 4), `EvidenceGrid` + `EvidenceItem` (Task 6), `Footer` (Task 7).

- [ ] **Step 1: Replace the full file contents**

Every sentence, link, `alt` text, and tweet ID below is copied verbatim from the current file — only the wrapping structure changes. The two commented-out dead references (`{/* <MichaelLynch /> */}`, `{/* <Spotty /> */}`) are dropped as inert leftovers, not content.

```tsx
import Head from "next/head";
import Script from "next/script";
import { NextSeo } from "next-seo";

import David from "../assets/images/david.jpeg";
import DavidKoch from "../assets/images/davidkoch.jpeg";
import Me from "../assets/images/melb-marathon.jpeg";

import p1 from "../assets/images/1.png";
import p2 from "../assets/images/2.jpeg";
import p3 from "../assets/images/3.jpeg";
import p4 from "../assets/images/4.jpeg";
import p5 from "../assets/images/5.jpeg";

import josh1 from "../assets/images/josh1.jpeg";
import josh2 from "../assets/images/josh2.jpeg";

import { Tweet } from "react-tweet";

import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { TweetBlock } from "../components/TweetBlock";
import { EvidenceGrid } from "../components/EvidenceGrid";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Head>
        <title>I am Not David Koch</title>
      </Head>
      <NextSeo
        title="I am not David Koch"
        description="Seriously I am not on Sunrise."
        openGraph={{
          url: `https://${process.env.VERCEL_URL}`,
          title: "I am not David Koch",
          description: "Seriously I am not on Sunrise.",
          images: [
            {
              url: `https://${process.env.VERCEL_URL}/Sunrise.png`,
              width: 1200,
              height: 675,
              alt: "Sunrise Cover with my face over David Koch",
              type: "image/png",
            },
          ],
          site_name: "I am not David Koch",
        }}
        twitter={{
          handle: "@kochie",
          cardType: "summary_large_image",
        }}
      />

      <div className="flex flex-col items-center gap-16 pb-10">
        <Hero davidSrc={David} meSrc={Me} />

        <Section>
          {
            "Don't be fooled by how much we're #twinning we couldn't be more different. Well we're both white Australian males, but David is 38 years older than me."
          }
        </Section>

        <Section>
          {
            'As the chairman of the Port Adelaide Football Club David gets a lot of "fan" support. But sometimes in the heat of the moment his critics will mistake his twitter handle of '
          }
          <a
            className="font-medium text-accent-600 underline decoration-accent-400/60 underline-offset-2 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            href="https://twitter.com/kochie_online"
          >
            @kochie_online
          </a>
          {" with mine "}
          <a
            className="font-medium text-accent-600 underline decoration-accent-400/60 underline-offset-2 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            href="https://twitter.com/kochie"
          >
            @kochie
          </a>
          {"."}
        </Section>

        <TweetBlock>
          <Tweet id="1114324112011214849" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1242652582482292737" />
        </TweetBlock>
        <TweetBlock>
          <Tweet id="1223362204310753280" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1437154932616949762" />
        </TweetBlock>

        <Section>{"Oof Leigh, tell me how you really feel."}</Section>

        <TweetBlock>
          <Tweet id="1277777946397143040" />
        </TweetBlock>

        <Section>{"Michael really doesn't like me :("}</Section>

        <TweetBlock>
          <Tweet id="1558592495532982272" />
        </TweetBlock>
        <Section>
          {
            "Archie is upset a commercial TV show has no scientific data on it. May I suggest ABC News Archie?"
          }
        </Section>

        <Section>
          {
            "And it's not just his detractors, politicians get it wrong...\n all. the. time."
          }
        </Section>

        <TweetBlock>
          <Tweet id="1549503540821098496" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1549861881632157696" />
        </TweetBlock>

        <Section>
          {
            "But don't feel bad if you can't tell us apart. His co-host couldn't either."
          }
        </Section>

        <TweetBlock>
          <Tweet id="431138757220110337" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1729316763584856544" />
        </TweetBlock>

        <Section>{"I get in on the fun too."}</Section>
        <TweetBlock>
          <Tweet id="1729372641914699866" />
        </TweetBlock>

        <Section>
          {"But Alas, all good things must come to an end."}
        </Section>
        <TweetBlock>
          <Tweet id="1663074550115074049" />
        </TweetBlock>

        <Section>
          {"Or so I thought! I present my pièce de résistance!"}
        </Section>
        <TweetBlock>
          <Tweet id="529024175285878784" />
        </TweetBlock>

        <Section>
          {
            "If I was the Chairman of the Port Adelaide Football Club this would already be on their t-shirts."
          }
        </Section>
        <TweetBlock>
          <Tweet id="1782642492267237729" />
        </TweetBlock>

        <Section>{"Also some copy pasta"}</Section>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 md:flex-row md:flex-wrap md:justify-center">
          <TweetBlock>
            <Tweet id="1758110242863227017" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1757255984945193032" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1757228226290573620" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759323123852185847" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759466016709460028" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759762423400091767" />
          </TweetBlock>
        </div>

        <Section>{"I'm always happy to help the little guys"}</Section>
        <TweetBlock>
          <Tweet id="1788341779097657430" />
        </TweetBlock>

        <Section>
          {
            "Also to all the cowards out there who delete your mistake as soon as I tell you. I see you..."
          }
        </Section>
        <EvidenceGrid
          items={[
            { src: p1, alt: "screen grab of tweet1" },
            { src: p2, alt: "screen grab of tweet2" },
            { src: p3, alt: "screen grab of tweet3" },
            { src: p4, alt: "screen grab of tweet4" },
            { src: p5, alt: "screen grab of tweet5" },
          ]}
          columns="md:grid-cols-5"
          className="max-w-5xl"
        />

        <Section>{"Even you Josh."}</Section>
        <EvidenceGrid
          items={[
            { src: josh1, alt: "screen grab of tweet1 from josh" },
            { src: josh2, alt: "screen grab of tweet2 from josh" },
          ]}
          columns="md:grid-cols-2"
          startIndex={6}
          className="max-w-2xl"
        />

        <Section>
          {
            "But hey it could be worse, at least no one thinks I'm this David Koch."
          }
        </Section>
        <Footer davidKochBrosSrc={DavidKoch} />
      </div>
    </div>
  );
}
```

Note: `Script` is imported but was unused in the original file too (dead import) — keep it as-is to avoid an unrelated cleanup; if `pnpm build`'s lint step flags it as unused, remove that one import line only (it was already inert, removing it changes no behavior).

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

Run: `pnpm build`
Expected: build succeeds with no errors. If ESLint flags the unused `Script` import, delete that import line and re-run.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.tsx
git commit -m "refactor: reassemble index.tsx from new presentational components"
```

---

### Task 9: Visual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server in the background**

Run: `pnpm dev` (background)
Expected: log line containing `Ready in`.

- [ ] **Step 2: Screenshot at mobile width, light mode**

Use the Playwright MCP tools: `browser_navigate` to `http://localhost:3000`, `browser_resize` to `390x844`, `browser_take_screenshot`.
Expected: Hero headline, side-by-side photos (stacked on mobile per `md:flex-row`), amber "vs" badge, and consistent Section spacing are all visible with no layout overflow.

- [ ] **Step 3: Screenshot at desktop width, light mode**

`browser_resize` to `1280x900`, `browser_take_screenshot`.
Expected: Hero photos side-by-side, 5-column Exhibit grid, 2-column Josh grid, tweet embeds centered, no horizontal scrollbar.

- [ ] **Step 4: Screenshot in dark mode**

Run `browser_evaluate` with the function body `() => document.documentElement.classList.add('dark')` — this forces the `dark:` utility classes on without needing OS-level `prefers-color-scheme` control, and is a valid proxy since the site's dark/light switching mechanism itself is untouched by this plan (only the `dark:`-prefixed styles are new).

Then run `browser_take_screenshot`.
Expected: slate-900 background, slate-100 text, amber accents still legible, photo frames show the `dark:ring-white/10` outline.

- [ ] **Step 5: Stop the dev server**

Kill the background `pnpm dev` process.

- [ ] **Step 6: Fix anything visually broken, or confirm done**

If a screenshot shows overflow, misalignment, or an unstyled element, fix it in the relevant component file from Tasks 3-8, re-run `pnpm build`, and re-screenshot. Once all three screenshots look correct, no commit is needed for this task (verification-only).
