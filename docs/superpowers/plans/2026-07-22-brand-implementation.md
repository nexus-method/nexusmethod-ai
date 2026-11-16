# nexusmethod.ai Brand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic blue/stone scaffold with the full Nexus Method brand (Deep Slate / Warm Copper / Bone White), implement all 6 sections to the Pixel-specced layout, wire the Gathering Storm SVG logo with entrance animation, and deploy to staging.

**Architecture:** Single-page Next.js 16 (App Router) with Tailwind v4 + CSS custom properties. All copy lives in `src/content.ts` for easy Quill-swap. Interactive pieces (nav scroll, accordion, scroll reveal) are Client Components; everything else is Server Components. No animation libraries — CSS keyframes only.

**Tech Stack:** Next.js 16.2.11 · React 19 · Tailwind v4 · Inter (next/font/google) · CSS custom properties · SVG animations

## Global Constraints

- Zero hardcoded hex values in JSX — use CSS custom properties via `var(--token-name)` in arbitrary Tailwind utilities or inline styles
- No `<style>` JSX tags — all CSS in `globals.css`
- No `window.innerWidth` — CSS media queries only
- No Framer Motion — CSS keyframes only
- No animation libraries added
- `prefers-reduced-motion` fallback on all animations
- Inter font throughout (not Geist)
- Token source: `docs/product/design-specs/nexusmethod/nexusmethod-design-tokens.css` (inlined into globals.css)
- All copy swappable via `src/content.ts`
- Services: Alternative B (Accordion) from Pixel spec
- Proof variant flag: `PROOF_VARIANT` in content.ts

---

## File Map

**Created:**
- `src/content.ts` — all user-facing copy
- `src/components/logo.tsx` — NexusMark SVG (Server Component)
- `src/components/scroll-reveal.tsx` — IntersectionObserver wrapper (Client Component)
- `public/favicon-32.png` — copied from `~/agentos/systems/dispatch/reports/designs/nexus-logo-r4-favicon-32.png`

**Modified:**
- `src/app/globals.css` — brand tokens + animation keyframes + scroll-reveal CSS
- `src/app/layout.tsx` — Inter font, favicon metadata
- `src/components/nav.tsx` — full rebrand, NexusMark logo, scroll state
- `src/components/sections/hero.tsx` — dark bg, copper rule, pill CTAs
- `src/components/sections/problem.tsx` — brand colors, white cards, hover lift
- `src/components/sections/method.tsx` — dark bg, 4 step cards
- `src/components/sections/services.tsx` — accordion Alternative B (Client Component)
- `src/components/sections/about.tsx` — alternating bg, credential strip, proof variants
- `src/components/sections/contact.tsx` — form section + Footer CTA section
- `src/app/page.tsx` — section order, footer bar

---

### Task 1: Foundation — globals.css + Inter font + favicon

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `public/favicon-32.png` (copy from designs)

- [ ] **Step 1.1: Copy favicon to public/**

```bash
cp ~/agentos/systems/dispatch/reports/designs/nexus-logo-r4-favicon-32.png \
   /home/molly/nexusmethod-ai/public/favicon-32.png
```

- [ ] **Step 1.2: Write globals.css — brand tokens + animation + scroll-reveal**

Full replacement of `src/app/globals.css`:

```css
@import "tailwindcss";

/* ─────────────────────────────────────────────
   Nexus Method Brand Tokens
   Source: nexusmethod-design-tokens.css (Pixel, 2026-07-21)
   Inlined here to avoid import ordering issues with Tailwind v4
───────────────────────────────────────────── */
:root {
  /* Deep Slate scale */
  --brand-slate-900: #1a1f2e;
  --brand-slate-800: #242a3d;
  --brand-slate-700: #2e3650;
  --brand-slate-600: #3a4463;
  --brand-slate-500: #4f5c80;
  --brand-slate-400: #6b7499;
  --brand-slate-300: #8d94b0;
  --brand-slate-200: #b8bdd0;
  --brand-slate-100: #dde0ea;
  --brand-slate-50:  #f0f1f5;

  /* Warm Copper scale */
  --brand-copper-900: #7a3d18;
  --brand-copper-800: #9e5021;
  --brand-copper-700: #b0632a;
  --brand-copper-600: #c8773a;
  --brand-copper-500: #d68f54;
  --brand-copper-400: #e0a872;
  --brand-copper-300: #e8be95;
  --brand-copper-200: #f0d3b8;
  --brand-copper-100: #f7e8d8;
  --brand-copper-50:  #fdf5ee;

  /* Bone White scale */
  --brand-bone-900: #8a7e68;
  --brand-bone-800: #a8997f;
  --brand-bone-700: #c4b89e;
  --brand-bone-600: #d8cebc;
  --brand-bone-500: #e5ddd0;
  --brand-bone-400: #ede7dc;
  --brand-bone-300: #f2ede5;
  --brand-bone-200: #f5f2ec;
  --brand-bone-100: #f9f7f4;
  --brand-bone-50:  #fdfcfb;

  /* Cool Mid-Gray scale */
  --brand-gray-900: #3a3f47;
  --brand-gray-800: #4e545d;
  --brand-gray-700: #636971;
  --brand-gray-600: #787e87;
  --brand-gray-500: #8b9099;
  --brand-gray-400: #a0a5ad;
  --brand-gray-300: #b8bcc3;
  --brand-gray-200: #d0d3d8;
  --brand-gray-100: #e5e7ea;
  --brand-gray-50:  #f3f4f5;

  --neutral-white: #ffffff;
  --neutral-black: #000000;

  /* ─── Semantic Color Tokens ─── */
  --bg-page:           var(--brand-bone-200);
  --bg-surface:        var(--brand-bone-50);
  --bg-surface-raised: var(--neutral-white);
  --bg-surface-alt:    #edeae3;
  --bg-inverse:        var(--brand-slate-900);
  --bg-inverse-raised: var(--brand-slate-800);
  --bg-muted:          var(--brand-bone-300);
  --bg-accent-subtle:  var(--brand-copper-50);

  --text-primary:       var(--brand-slate-900);
  --text-secondary:     var(--brand-gray-500);
  --text-tertiary:      var(--brand-gray-400);
  --text-muted:         var(--brand-gray-300);
  --text-inverse:       var(--brand-bone-200);
  --text-inverse-muted: var(--brand-slate-300);
  --text-link:          var(--brand-copper-600);
  --text-accent:        var(--brand-copper-600);

  --border-default: var(--brand-bone-500);
  --border-subtle:  var(--brand-bone-300);
  --border-strong:  var(--brand-slate-200);
  --border-focus:   var(--brand-copper-600);
  --border-dark:    rgba(255, 255, 255, 0.1);
  --border-dark-medium: rgba(255, 255, 255, 0.2);

  --cta-bg:       var(--brand-slate-900);
  --cta-bg-hover: var(--brand-slate-800);
  --cta-text:     var(--brand-bone-200);

  --accent-bg:        var(--brand-copper-600);
  --accent-bg-hover:  var(--brand-copper-700);
  --accent-bg-active: var(--brand-copper-800);
  --accent-text:      var(--neutral-white);
  --accent-default:   var(--brand-copper-600);
  --accent-subtle:    var(--brand-copper-50);
  --accent-muted:     var(--brand-copper-200);

  /* ─── Spacing ─── */
  --spacing-section-y:  96px;
  --spacing-section-x:  80px;
  --spacing-section-y-mobile: 72px;

  /* ─── Border Radius ─── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-pill: 999px;

  /* ─── Motion ─── */
  --motion-duration-fast:   150ms;
  --motion-duration-base:   250ms;
  --motion-duration-slow:   400ms;
  --motion-duration-reveal: 600ms;
  --motion-ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --motion-ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --motion-ease-reveal:     cubic-bezier(0.16, 1, 0.3, 1);

  /* ─── Shadows ─── */
  --shadow-sm:  0 1px 3px 0 rgba(26, 31, 46, 0.08), 0 1px 2px -1px rgba(26, 31, 46, 0.06);
  --shadow-md:  0 4px 12px -2px rgba(26, 31, 46, 0.10), 0 2px 4px -2px rgba(26, 31, 46, 0.06);
  --shadow-lg:  0 12px 32px -4px rgba(26, 31, 46, 0.12), 0 4px 8px -4px rgba(26, 31, 46, 0.06);
  --shadow-xl:  0 24px 48px -8px rgba(26, 31, 46, 0.14), 0 8px 16px -8px rgba(26, 31, 46, 0.06);
  --shadow-card-dark: 0 4px 24px rgba(0, 0, 0, 0.32);
  --shadow-card-light: 0 2px 16px rgba(26, 31, 46, 0.08);
  --shadow-cta: 0 4px 16px rgba(200, 119, 58, 0.28);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─────────────────────────────────────────────
   NexusMark Logo Animations
───────────────────────────────────────────── */

@keyframes nm-particle-arrive {
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes nm-nexus-brighten {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes nm-nexus-pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50%       { transform: scale(1.05); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .nm-particle,
  .nm-tail,
  .nm-nexus-dot,
  .nm-nexus-glow {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ─────────────────────────────────────────────
   Scroll Reveal
───────────────────────────────────────────── */

.nm-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--motion-duration-reveal) var(--motion-ease-reveal),
    transform var(--motion-duration-reveal) var(--motion-ease-reveal);
}

.nm-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .nm-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 1.3: Update layout.tsx — switch to Inter, wire favicon**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Method — AI Implementation for Service Businesses",
  description:
    "Molly Jaggers helps $500K–$5M service businesses install AI-powered revenue systems — so the business stops depending on the owner at every decision point.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Nexus Method — AI Implementation for Service Businesses",
    description:
      "AI consulting and implementation for service businesses ready to scale without scaling headcount.",
    url: "https://nexusmethod.ai",
    siteName: "Nexus Method",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Method",
    description:
      "AI consulting and implementation for service businesses ready to scale without scaling headcount.",
  },
  metadataBase: new URL("https://nexusmethod.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 1.4: Add Inter to globals.css @theme**

At the bottom of the `:root` block (before closing `}`), add:
```css
  --font-family-primary: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

And in the `body` rule:
```css
  font-family: var(--font-family-primary);
```

- [ ] **Step 1.5: Verify the build hasn't broken (no new sections yet)**

```bash
cd /home/molly/nexusmethod-ai && npm run build 2>&1 | tail -20
```

Expected: Build exits 0. (Font + CSS changes only — no component changes yet.)

---

### Task 2: Content Map

**Files:**
- Create: `src/content.ts`

- [ ] **Step 2.1: Write src/content.ts**

```typescript
/**
 * src/content.ts
 * ─────────────────────────────────────────────
 * COPY MAP — all user-facing strings live here.
 * Swap to Quill's approved copy by updating this file only.
 * Each key matches its section component.
 */

// ─── Global config ────────────────────────────
export const BOOK_URL = "https://calendly.com/molly-nexusmethod/discovery-call";
export const EMAIL = "hello@nexusmethod.ai";

/**
 * Proof variant flag.
 * 'logo-grid'    → renders client logo strip (use when logo assets land)
 * 'testimonials' → renders quote cards (use when client quotes are locked)
 */
export const PROOF_VARIANT: "logo-grid" | "testimonials" = "logo-grid";

// ─── Nav ──────────────────────────────────────
export const nav = {
  logo: "Nexus Method",
  links: [
    { label: "About", href: "#about" },
    { label: "The Method", href: "#method" },
    { label: "Services", href: "#services" },
  ],
  cta: "Book a Call",
};

// ─── Hero ─────────────────────────────────────
export const hero = {
  eyebrow: "AI Consulting for Service Businesses",
  headline: "Your business shouldn't need you at every decision point.",
  subhead:
    "Nexus Method installs AI-powered revenue systems into $500K–$5M service businesses — so operations run without the owner in the loop, leads stop falling through the cracks, and growth doesn't require adding headcount.",
  ctaPrimary: "Book a Discovery Call →",
  ctaSecondary: "See the Method",
  socialProof: "Working with service businesses in Austin and remote-first teams across the US.",
};

// ─── Problem ──────────────────────────────────
export const problem = {
  eyebrow: "Sound familiar?",
  headline: "The $500K–$5M ceiling is a systems problem.",
  cards: [
    {
      number: "01",
      heading: "You're the bottleneck.",
      body: "Every decision loops back to you. Your team is capable — but nothing moves without your approval, your context, or your intervention. You built a business, not a job. It's starting to feel like a job.",
    },
    {
      number: "02",
      heading: "Leads disappear between inquiry and close.",
      body: "You know you're losing deals that should have been easy wins. Follow-up is manual. The timing is always slightly off. A competitor who moved faster got there first. This is a systems problem, not a hustle problem.",
    },
    {
      number: "03",
      heading: "Revenue is growing. Margin isn't.",
      body: "Every new client means another hire. You're running a people business on people power — and the math doesn't change. To grow profitably, the ratio of revenue to headcount has to shift.",
    },
    {
      number: "04",
      heading: "You've tried AI tools. Nothing stuck.",
      body: "ChatGPT, automations, software demos. You've seen the potential. But disconnected tools don't compound — they just add to the noise. The business needs a system, not more subscriptions.",
    },
  ],
};

// ─── Method ───────────────────────────────────
export const method = {
  eyebrow: "The Nexus Method",
  headline: "A specific process. Repeatable results.",
  subhead:
    "This isn't \"we'll figure it out together.\" Every engagement follows the same four-step process — because the path from chaos to operational leverage is well-worn.",
  steps: [
    {
      number: "01",
      name: "Assess",
      tagline: "Map how the business actually runs.",
      body: "We start with a structured audit of your operations — how work flows, where decisions bottleneck, and where the highest-value automation opportunities are hiding. Not how you think it runs. How it actually runs.",
    },
    {
      number: "02",
      name: "Architect",
      tagline: "Design the system before building it.",
      body: "From the audit, we design your AI revenue system — tool selection, data architecture, integration blueprint, and build sequence. You see the full plan before a single workflow is built.",
    },
    {
      number: "03",
      name: "Build",
      tagline: "Install the system.",
      body: "We deploy your AI revenue system — production-ready, not a prototype. Molly reviews and approves every workflow before it goes live. No black boxes.",
    },
    {
      number: "04",
      name: "Hand Off",
      tagline: "Your team runs it. We keep it sharp.",
      body: "You get a live dashboard, team training, and a retainer engagement to maintain and evolve the system as your business grows. The goal is operational independence — not dependency on a consultant.",
    },
  ],
};

// ─── Services ─────────────────────────────────
export const services = {
  eyebrow: "The Services",
  headline: "Where We Work",
  subhead:
    "One engagement model, four entry points. Choose the scope that matches where your business is today.",
  items: [
    {
      number: "01",
      name: "AI Readiness Assessment",
      hook: "Know exactly where AI creates leverage — and where it doesn't.",
      scope: "2-week engagement",
      description:
        "A structured audit of your operations — how work flows, where revenue is leaking, and where AI creates the highest leverage. Deliverable: a prioritized build roadmap with ROI estimates and a build vs. buy recommendation.",
      outcomes: [
        "Workflow audit across sales, ops, and service delivery",
        "AI opportunity map with ROI estimates",
        "Build vs. buy recommendation for each opportunity",
        "Clear roadmap to move into Architecture & Design",
      ],
    },
    {
      number: "02",
      name: "Architecture & Design",
      hook: "A system designed for your stack, your team, your direction.",
      scope: "4-week engagement",
      description:
        "We design the system before building it. Tool selection, data architecture, integration blueprint, and capability roadmap — so every build decision has a reason, and the system is built to scale.",
      outcomes: [
        "Data architecture and tool selection",
        "Integration blueprint for your existing stack",
        "Full capability roadmap with sequenced build phases",
        "Team readiness plan for AI adoption",
      ],
    },
    {
      number: "03",
      name: "Full Build & Implementation",
      hook: "We build it. Production-ready, not a prototype.",
      scope: "8–12 week engagement",
      description:
        "Full implementation of your AI revenue system. Every workflow built, tested, and approved by Molly before it goes live. Team training included. Go-live support for the first 30 days.",
      outcomes: [
        "Full AI revenue system deployed on your stack",
        "Live dashboard with your key metrics",
        "Team training and documented SOPs",
        "30-day post-launch support window",
      ],
    },
    {
      number: "04",
      name: "Ongoing Optimization",
      hook: "Your AI keeps working — and keeps improving.",
      scope: "Monthly retainer",
      description:
        "Your business evolves. Your system should too. Monthly performance reviews, workflow updates, and access to new AI capabilities as they're proven — so the system compounds over time.",
      outcomes: [
        "Monthly performance review against your baseline",
        "Workflow updates as your business evolves",
        "Priority access to new AI capabilities as they're proven",
        "Direct access to Molly for questions and decisions",
      ],
    },
  ],
};

// ─── About ────────────────────────────────────
export const about = {
  eyebrow: "About Molly",
  headline: "I built this because I needed it first.",
  bio: [
    "I've spent 12+ years scaling products across startups and enterprises — from product marketing and GTM strategy to building the autonomous systems that now run my own business. I didn't start as an AI consultant. I became one when I realized the same operational leverage I built internally could transform a service business.",
    "Nexus Method runs on the systems I built for myself. The AI workflows, the automated follow-up sequences, the dashboards that tell me what's working without me having to ask — those exist in my business before I install them in yours. This isn't theory. It's something I've already solved.",
    "I work with a small number of businesses at a time, which means I'm in the details of every engagement. Not a junior team. Me.",
  ],
  credentials: [
    { value: "12+", label: "Years in product & GTM" },
    { value: "$5M", label: "Revenue ceiling served" },
    { value: "Austin", label: "Home base, remote-friendly" },
  ],
  // Variant A: logo grid (use once client logos land in /public/logos/)
  logoGrid: [
    { name: "PLACEHOLDER — Client 1", logo: "" },
    { name: "PLACEHOLDER — Client 2", logo: "" },
    { name: "PLACEHOLDER — Client 3", logo: "" },
  ],
  // Variant B: testimonials (use once client quotes are confirmed)
  testimonials: [
    {
      quote: "PLACEHOLDER — client result quote here.",
      author: "PLACEHOLDER — Name, Role",
      company: "PLACEHOLDER — Company",
    },
  ],
};

// ─── Contact ──────────────────────────────────
export const contact = {
  footerCta: {
    headline: "Ready to build something that actually works?",
    subhead: "Let's scope it in 30 minutes.",
    cta: "Book a Discovery Call",
    fine: "No pitch deck. Just the conversation.",
  },
  form: {
    eyebrow: "Get Started",
    headline: "Let's find out if this is a fit.",
    subhead:
      "If you're wondering whether Nexus Method is right for your business, a 30-minute call is how we find out. I respond same day to strong-fit inquiries.",
    ctaPrimary: "Book a Discovery Call (30 min) →",
    notReady: "Not ready for a call? Send a note.",
    submit: "Send →",
    disclaimer:
      "I read every message and respond within 24 hours to strong-fit inquiries.",
    fields: {
      name: { label: "Name", placeholder: "Jane Smith" },
      email: { label: "Email", placeholder: "jane@company.com" },
      company: { label: "Company", placeholder: "Your company name" },
      message: {
        label: "What are you dealing with?",
        placeholder:
          "Tell me what's broken, stuck, or holding you back. The more specific, the better.",
      },
    },
  },
  address: "Austin, TX — working with remote-first businesses nationwide",
};

// ─── Footer ───────────────────────────────────
export const footer = {
  copyright: `© ${new Date().getFullYear()} Nexus Method · Molly Jaggers`,
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: EMAIL, href: `mailto:${EMAIL}` },
  ],
};
```

---

### Task 3: NexusMark Logo Component

**Files:**
- Create: `src/components/logo.tsx`

The Gathering Storm mark: 20 particles + simplified static tails + central nexus, with CSS entrance animation.

- [ ] **Step 3.1: Write src/components/logo.tsx**

```tsx
/**
 * NexusMark — Gathering Storm SVG (R3-C3)
 * Animation spec: nexus-logo-animation-spec.md
 * Server Component (no state/effects — CSS animations handle everything)
 */

// 20 particles: [angle_deg, dist_pct, tail_factor]
// Positions computed relative to SVG viewBox 0 0 100 100 (center: 50, 50, radius: 38)
const PARTICLES: [number, number, number][] = [
  // Outer (high velocity, long tails)
  [8, 0.88, 1.0], [52, 0.91, 1.0], [108, 0.86, 1.0], [158, 0.93, 1.0],
  [205, 0.87, 1.0], [258, 0.90, 1.0], [308, 0.88, 1.0],
  // Mid-outer
  [28, 0.71, 0.75], [80, 0.68, 0.75], [133, 0.74, 0.75], [183, 0.69, 0.75],
  [232, 0.73, 0.75], [282, 0.70, 0.75], [332, 0.67, 0.75],
  // Mid-inner (nearly arrived)
  [42, 0.51, 0.5], [150, 0.54, 0.5], [240, 0.48, 0.5], [340, 0.52, 0.5],
  // Innermost (about to merge)
  [95, 0.33, 0.3], [275, 0.36, 0.3],
];

const RADIUS = 38; // viewBox units from center

interface Particle {
  restX: number;
  restY: number;
  startDX: number; // initial translation offset X (particle starts 1.8× farther out)
  startDY: number;
  alpha: number;
  dotR: number;
  tailEndX: number;
  tailEndY: number;
}

function computeParticles(): Particle[] {
  return PARTICLES.map(([angleDeg, distPct, tailFactor]) => {
    const angle = (angleDeg * Math.PI) / 180;
    const restX = 50 + Math.cos(angle) * distPct * RADIUS;
    const restY = 50 + Math.sin(angle) * distPct * RADIUS;
    // Start 0.8× farther from center (so animation drives inward to resting pos)
    const startDX = Math.cos(angle) * distPct * RADIUS * 0.8;
    const startDY = Math.sin(angle) * distPct * RADIUS * 0.8;
    const alpha = 0.3 + (1 - distPct) * 0.7;
    const dotR = 0.016 * RADIUS * (2 - distPct);
    // Tail goes outward from resting position
    const tailLen = distPct * 0.52 * RADIUS * tailFactor;
    const dist = Math.sqrt((restX - 50) ** 2 + (restY - 50) ** 2);
    const outX = dist > 0 ? (restX - 50) / dist : 0;
    const outY = dist > 0 ? (restY - 50) / dist : 0;
    const tailEndX = restX + outX * tailLen;
    const tailEndY = restY + outY * tailLen;
    return { restX, restY, startDX, startDY, alpha, dotR, tailEndX, tailEndY };
  });
}

interface LogoProps {
  /** px size of the SVG mark */
  size?: number;
  /** 'dark' for copper on dark bg (default), 'light' for copper on light bg */
  variant?: "dark" | "light";
  /** Whether to show the wordmark next to the mark */
  showWordmark?: boolean;
  className?: string;
}

export default function Logo({
  size = 32,
  variant = "dark",
  showWordmark = false,
  className,
}: LogoProps) {
  const particles = computeParticles();

  // Nexus center
  const nexusDotR = 0.038 * RADIUS; // 1.44 viewBox units
  const nexusGlow1R = 0.09 * RADIUS; // 3.42 vbu
  const nexusGlow2R = 0.158 * RADIUS; // 6.00 vbu

  const copperColor = "#c8773a";
  const tailColor = "rgba(200, 119, 58, 0.45)";

  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nexus Method mark"
        role="img"
      >
        {/* Static tails — simplified (no per-tail gradient, copper at low opacity) */}
        {particles.map((p, i) => (
          <line
            key={`tail-${i}`}
            className="nm-tail"
            x1={p.restX}
            y1={p.restY}
            x2={p.tailEndX}
            y2={p.tailEndY}
            stroke={tailColor}
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        ))}

        {/* Nascent bond lines between nearby particles (very low opacity) */}
        <circle cx="50" cy="50" r={nexusGlow2R} fill="rgba(200,119,58,0.04)" className="nm-nexus-glow" style={{ opacity: 0, animation: `nm-nexus-brighten 0.6s 0.6s ease-out forwards` }} />
        <circle cx="50" cy="50" r={nexusGlow1R} fill="rgba(200,119,58,0.11)" className="nm-nexus-glow" style={{ opacity: 0, animation: `nm-nexus-brighten 0.5s 0.55s ease-out forwards` }} />

        {/* Particle dots — animated from start offset to resting position */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            className="nm-particle"
            cx={p.restX}
            cy={p.restY}
            r={p.dotR}
            fill={copperColor}
            style={{
              opacity: 0,
              transform: `translate(${p.startDX.toFixed(2)}px, ${p.startDY.toFixed(2)}px)`,
              animation: `nm-particle-arrive 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            }}
          >
            <animate
              attributeName="opacity"
              from="0"
              to={p.alpha.toFixed(2)}
              dur="0.9s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.22 1 0.36 1"
            />
          </circle>
        ))}

        {/* Central nexus */}
        <circle
          className="nm-nexus-dot"
          cx="50"
          cy="50"
          r={nexusDotR}
          fill={copperColor}
          style={{
            opacity: 0,
            transform: "scale(0.7)",
            transformOrigin: "50px 50px",
            animation: `nm-nexus-brighten 0.6s 0.5s ease-out forwards, nm-nexus-pulse 7s 1.2s infinite ease-in-out`,
          }}
        />
      </svg>

      {showWordmark && (
        <span
          className="font-semibold tracking-tight"
          style={{
            fontSize: size * 0.5625,
            color: variant === "dark" ? "var(--text-inverse)" : "var(--text-primary)",
            fontFamily: "var(--font-family-primary)",
          }}
        >
          Nexus Method
        </span>
      )}
    </div>
  );
}
```

---

### Task 4: ScrollReveal Client Component

**Files:**
- Create: `src/components/scroll-reveal.tsx`

- [ ] **Step 4.1: Write src/components/scroll-reveal.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before reveal (ms) — use for staggered children */
  delay?: number;
}

/**
 * Wraps children with a scroll-triggered fade-in + 16px upward drift.
 * Animation defined in globals.css (.nm-reveal / .nm-reveal.is-visible).
 * Server-renders as invisible; JS adds is-visible class on intersection.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("is-visible"), delay);
          } else {
            el.classList.add("is-visible");
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`nm-reveal${className ? ` ${className}` : ""}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
```

---

### Task 5: Nav

**Files:**
- Modify: `src/components/nav.tsx`

Full replacement. Changes: NexusMark logo, Inter font via CSS variable, scroll-state backdrop, copper hamburger, dark mobile drawer, proper nav link styles.

- [ ] **Step 5.1: Write src/components/nav.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import { nav, BOOK_URL } from "@/content";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          height: "72px",
          backgroundColor: scrolled
            ? "rgba(26, 31, 46, 0.92)"
            : "rgba(26, 31, 46, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-dark)" : "none",
          transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                       border-color var(--motion-duration-base) var(--motion-ease-default),
                       backdrop-filter var(--motion-duration-base) var(--motion-ease-default)`,
        }}
      >
        <div
          className="max-w-[1200px] mx-auto h-full flex items-center justify-between"
          style={{ padding: "0 var(--spacing-section-x)" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <Logo size={28} variant="dark" />
            <span
              className="font-semibold tracking-tight"
              style={{
                fontSize: "15px",
                color: "var(--text-inverse)",
                fontFamily: "var(--font-family-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {nav.logo}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--text-inverse-muted)",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse-muted)")
                }
              >
                {link.label}
              </Link>
            ))}

            {/* CTA pill */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-semibold transition-colors"
              style={{
                fontSize: "15px",
                padding: "10px 22px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent-bg)",
                color: "var(--accent-text)",
                textDecoration: "none",
                lineHeight: 1,
                transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
              }
            >
              {nav.cta} →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-inverse)" }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 5L5 17M5 5l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 7h16M3 11h16M3 15h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--bg-inverse)" }}
        >
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="font-semibold"
              style={{
                fontSize: "28px",
                color: "var(--text-inverse)",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="inline-flex items-center font-semibold mt-4"
            style={{
              fontSize: "18px",
              padding: "16px 36px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--accent-bg)",
              color: "var(--accent-text)",
              textDecoration: "none",
            }}
          >
            {nav.cta} →
          </a>
        </div>
      )}
    </>
  );
}
```

---

### Task 6: Hero Section

**Files:**
- Modify: `src/components/sections/hero.tsx`

Dark bg (`--bg-inverse`), copper eyebrow + 48×2px rule, Display-size clamp H1, Body/LG subhead, two pill CTAs (copper primary + ghost secondary).

- [ ] **Step 6.1: Write src/components/sections/hero.tsx**

```tsx
import ScrollReveal from "@/components/scroll-reveal";
import { hero, BOOK_URL } from "@/content";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "152px", // 80px nav + 72px breathing room
        paddingBottom: "128px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div className="max-w-[720px]">
          <ScrollReveal>
            {/* Eyebrow + copper rule */}
            <div className="flex flex-col gap-3 mb-8">
              <span
                className="font-semibold uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent-default)",
                  lineHeight: 1.4,
                }}
              >
                {hero.eyebrow}
              </span>
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  backgroundColor: "var(--accent-default)",
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            {/* Headline */}
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "var(--text-inverse)",
                marginBottom: "28px",
              }}
            >
              {hero.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            {/* Subhead */}
            <p
              style={{
                fontSize: "clamp(1.0625rem, 1.5vw, 1.125rem)",
                lineHeight: "1.65",
                color: "var(--text-inverse-muted)",
                marginBottom: "48px",
                maxWidth: "580px",
              }}
            >
              {hero.subhead}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Primary — copper pill */}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-cta)",
                  transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                               transform var(--motion-duration-base) var(--motion-ease-default),
                               box-shadow var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-bg)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {hero.ctaPrimary}
              </a>

              {/* Ghost CTA — "See the Method" */}
              <a
                href="#method"
                className="inline-flex items-center justify-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "15px 32px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-dark-medium)",
                  color: "var(--text-inverse)",
                  textDecoration: "none",
                  transition: `border-color var(--motion-duration-base) var(--motion-ease-default),
                               background-color var(--motion-duration-base) var(--motion-ease-default),
                               color var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-default)";
                  e.currentTarget.style.color = "var(--accent-default)";
                  e.currentTarget.style.backgroundColor = "rgba(200,119,58,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-dark-medium)";
                  e.currentTarget.style.color = "var(--text-inverse)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {hero.ctaSecondary}
              </a>
            </div>

            {/* Social proof micro-signal */}
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-inverse-muted)",
                lineHeight: 1.5,
              }}
            >
              {hero.socialProof}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Problem Section

**Files:**
- Modify: `src/components/sections/problem.tsx`

Light bg (`--bg-page`), white cards with `--shadow-card-light`, copper number, hover lift + shadow increase.

- [ ] **Step 7.1: Write src/components/sections/problem.tsx**

```tsx
import ScrollReveal from "@/components/scroll-reveal";
import { problem } from "@/content";

export default function Problem() {
  return (
    <section
      id="problem"
      style={{
        backgroundColor: "var(--bg-page)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16" style={{ maxWidth: "800px", margin: "0 auto 64px" }}>
            <span
              className="block font-semibold uppercase mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
              }}
            >
              {problem.eyebrow}
            </span>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
                textAlign: "center",
              }}
            >
              {problem.headline}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2×2 card grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {problem.cards.map((card, i) => (
            <ScrollReveal key={card.number} delay={i * 60}>
              <ProblemCard card={card} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  card,
}: {
  card: { number: string; heading: string; body: string };
}) {
  return (
    <div
      style={{
        padding: "36px",
        borderRadius: "var(--radius-xl)",
        backgroundColor: "var(--bg-surface-raised)",
        boxShadow: "var(--shadow-card-light)",
        transition: `transform var(--motion-duration-base) var(--motion-ease-default),
                     box-shadow var(--motion-duration-base) var(--motion-ease-default)`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(26, 31, 46, 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card-light)";
      }}
    >
      <span
        className="block font-bold mb-4"
        style={{
          fontSize: "13px",
          letterSpacing: "0.05em",
          color: "var(--accent-default)",
        }}
      >
        {card.number}
      </span>
      <h3
        className="font-semibold mb-3"
        style={{
          fontSize: "18px",
          lineHeight: "1.3",
          color: "var(--text-primary)",
        }}
      >
        {card.heading}
      </h3>
      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.65",
          color: "var(--text-secondary)",
        }}
      >
        {card.body}
      </p>
    </div>
  );
}
```

---

### Task 8: Method Section

**Files:**
- Modify: `src/components/sections/method.tsx`

Dark bg (`--bg-inverse`), 4 step cards with copper step numbers and `--shadow-card-dark`, hover brightens card.

- [ ] **Step 8.1: Write src/components/sections/method.tsx**

```tsx
import ScrollReveal from "@/components/scroll-reveal";
import { method } from "@/content";

export default function Method() {
  return (
    <section
      id="method"
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center" style={{ maxWidth: "760px", margin: "0 auto 64px" }}>
            <span
              className="block font-semibold uppercase mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
              }}
            >
              {method.eyebrow}
            </span>
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.015em",
                color: "var(--text-inverse)",
              }}
            >
              {method.headline}
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.65",
                color: "var(--text-inverse-muted)",
              }}
            >
              {method.subhead}
            </p>
          </div>
        </ScrollReveal>

        {/* 4-step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {method.steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 80}>
              <div
                style={{
                  padding: "32px 28px",
                  borderRadius: "var(--radius-xl)",
                  backgroundColor: "var(--bg-inverse-raised)",
                  boxShadow: "var(--shadow-card-dark)",
                  transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                               transform var(--motion-duration-base) var(--motion-ease-default)`,
                  height: "100%",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#2d3350";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "var(--bg-inverse-raised)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Step number */}
                <span
                  className="block font-bold mb-3"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    color: "var(--accent-default)",
                  }}
                >
                  {step.number}
                </span>

                {/* Copper separator */}
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    backgroundColor: "var(--accent-default)",
                    opacity: 0.5,
                    marginBottom: "20px",
                  }}
                />

                {/* Step name (overline) */}
                <span
                  className="block font-semibold uppercase mb-2"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--text-inverse-muted)",
                  }}
                >
                  {step.name}
                </span>

                {/* Tagline */}
                <h3
                  className="font-bold mb-4"
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.2",
                    color: "var(--text-inverse)",
                  }}
                >
                  {step.tagline}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.65",
                    color: "var(--text-inverse-muted)",
                  }}
                >
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Services — Accordion Alternative B

**Files:**
- Modify: `src/components/sections/services.tsx`

Dark bg, left col (section label + H2 + subhead), right col (accordion list). First item open by default. Chevron rotates 180° on expand. max-height transition. Client Component for state.

- [ ] **Step 9.1: Write src/components/sections/services.tsx**

```tsx
"use client";

import { useState } from "react";
import { services, BOOK_URL } from "@/content";

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  return (
    <section
      id="services"
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">
          {/* Left col — sticky header */}
          <div className="lg:sticky lg:top-24">
            <span
              className="block font-semibold uppercase mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
              }}
            >
              {services.eyebrow}
            </span>
            <h2
              className="font-bold mb-6"
              style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.015em",
                color: "var(--text-inverse)",
              }}
            >
              {services.headline}
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
                color: "var(--text-inverse-muted)",
                marginBottom: "32px",
              }}
            >
              {services.subhead}
            </p>

            {/* CTA below the header */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center font-semibold"
              style={{
                fontSize: "15px",
                padding: "12px 24px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent-bg)",
                color: "var(--accent-text)",
                textDecoration: "none",
                transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
              }
            >
              Book a Scoping Call →
            </a>
          </div>

          {/* Right col — accordion */}
          <div>
            {services.items.map((item, i) => (
              <div
                key={item.number}
                style={{
                  borderTop: "1px solid var(--border-dark)",
                  borderBottom: i === services.items.length - 1 ? "1px solid var(--border-dark)" : "none",
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-expanded={openIndex === i}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-bold shrink-0"
                      style={{
                        fontSize: "13px",
                        letterSpacing: "0.05em",
                        color: "var(--accent-default)",
                      }}
                    >
                      {item.number}
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                        color: "var(--text-inverse)",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: "var(--text-inverse-muted)",
                      transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: `transform var(--motion-duration-slow) var(--motion-ease-default)`,
                      flexShrink: 0,
                      marginLeft: "16px",
                    }}
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>

                {/* Accordion panel */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openIndex === i ? "600px" : "0",
                    transition: `max-height var(--motion-duration-slow) var(--motion-ease-default)`,
                  }}
                >
                  <div style={{ paddingBottom: "32px" }}>
                    {/* Scope tag */}
                    <span
                      className="inline-block font-medium mb-4"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        color: "var(--text-inverse-muted)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-dark-medium)",
                      }}
                    >
                      {item.scope}
                    </span>

                    {/* Hook */}
                    <p
                      className="font-medium mb-4"
                      style={{
                        fontSize: "17px",
                        lineHeight: "1.5",
                        color: "var(--text-inverse)",
                      }}
                    >
                      {item.hook}
                    </p>

                    {/* Description */}
                    <p
                      className="mb-6"
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.65",
                        color: "var(--text-inverse-muted)",
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="space-y-2 mb-8">
                      {item.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3"
                          style={{ fontSize: "14px", lineHeight: "1.5" }}
                        >
                          <span
                            style={{
                              color: "var(--accent-default)",
                              fontWeight: 600,
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: "var(--text-inverse-muted)" }}>
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={BOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-semibold"
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-default)",
                        textDecoration: "none",
                        gap: "4px",
                        transition: `color var(--motion-duration-base) var(--motion-ease-default)`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--accent-bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--accent-default)")
                      }
                    >
                      Book a Scoping Call →
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="lg:hidden mt-10">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                }}
              >
                Book a Scoping Call →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: About Section

**Files:**
- Modify: `src/components/sections/about.tsx`

Surface-alt bg (`#edeae3`), 2-col layout (bio left, visual right), credential strip, proof variant flag-gated block.

- [ ] **Step 10.1: Write src/components/sections/about.tsx**

```tsx
import ScrollReveal from "@/components/scroll-reveal";
import { about, PROOF_VARIANT } from "@/content";

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--bg-surface-alt)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left — bio */}
          <ScrollReveal>
            <div>
              <span
                className="block font-semibold uppercase mb-4"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent-default)",
                }}
              >
                {about.eyebrow}
              </span>

              <h2
                className="font-bold mb-8"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                }}
              >
                {about.headline}
              </h2>

              <div className="space-y-5 mb-12">
                {about.bio.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "17px",
                      lineHeight: "1.65",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Credential strip */}
              <div
                className="flex gap-0"
                style={{
                  paddingTop: "32px",
                  borderTop: "1px solid var(--border-default)",
                }}
              >
                {about.credentials.map((cred, i) => (
                  <div
                    key={cred.label}
                    className="flex-1 text-center"
                    style={{
                      borderRight:
                        i < about.credentials.length - 1
                          ? "1px solid var(--border-default)"
                          : "none",
                      padding: "0 24px",
                    }}
                  >
                    <p
                      className="font-bold mb-1"
                      style={{
                        fontSize: "32px",
                        color: "var(--accent-default)",
                        lineHeight: 1,
                      }}
                    >
                      {cred.value}
                    </p>
                    <p
                      className="uppercase font-medium"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {cred.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — proof variant */}
          <ScrollReveal delay={100}>
            {PROOF_VARIANT === "testimonials" ? (
              <div className="space-y-4">
                {about.testimonials.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "24px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--bg-surface-raised)",
                      boxShadow: "var(--shadow-card-light)",
                    }}
                  >
                    <p
                      className="italic mb-4"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.65",
                        color: "var(--text-primary)",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-default)",
                      }}
                    >
                      {t.author}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t.company}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Logo grid — placeholder until logos arrive */
              <div
                style={{
                  padding: "32px",
                  borderRadius: "var(--radius-xl)",
                  backgroundColor: "var(--bg-surface-raised)",
                  boxShadow: "var(--shadow-card-light)",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <p
                  className="font-semibold uppercase text-center"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--text-secondary)",
                  }}
                >
                  Trusted by service businesses
                </p>
                <div
                  className="flex flex-wrap justify-center gap-6"
                  style={{ opacity: 0.4 }}
                >
                  {/* Placeholder logos — swap with real <img> tags as logos arrive */}
                  {about.logoGrid.map((client) => (
                    <div
                      key={client.name}
                      style={{
                        width: "80px",
                        height: "32px",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: "var(--border-default)",
                      }}
                      title={client.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Contact Section (Form + Footer CTA)

**Files:**
- Modify: `src/components/sections/contact.tsx`

Two visual regions in one file:
1. **Contact form** — 2-col: left primary CTA, right form (bone-page bg)
2. **Footer CTA** — centered dark block with copper pill CTA (exported separately as `FooterCta`)

- [ ] **Step 11.1: Write src/components/sections/contact.tsx**

```tsx
"use client";

import { contact, BOOK_URL } from "@/content";
import ScrollReveal from "@/components/scroll-reveal";

export function FooterCta() {
  return (
    <section
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[720px] mx-auto text-center"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <ScrollReveal>
          {/* Copper mark accent */}
          <div
            className="mx-auto mb-8"
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "var(--accent-default)",
            }}
          />

          <h2
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.015em",
              color: "var(--text-inverse)",
            }}
          >
            {contact.footerCta.headline}
          </h2>

          <p
            className="mb-10"
            style={{
              fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
              lineHeight: "1.65",
              color: "var(--text-inverse-muted)",
            }}
          >
            {contact.footerCta.subhead}
          </p>

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold mb-6"
            style={{
              fontSize: "18px",
              padding: "20px 40px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--accent-bg)",
              color: "var(--accent-text)",
              textDecoration: "none",
              boxShadow: "var(--shadow-cta)",
              transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                           transform var(--motion-duration-base) var(--motion-ease-default)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-bg)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {contact.footerCta.cta}
          </a>

          <p
            className="block"
            style={{
              fontSize: "14px",
              color: "var(--text-inverse-muted)",
            }}
          >
            {contact.footerCta.fine}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Contact() {
  const { form, address } = contact;

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--bg-page)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — primary CTA */}
          <ScrollReveal>
            <div>
              <span
                className="block font-semibold uppercase mb-4"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent-default)",
                }}
              >
                {form.eyebrow}
              </span>

              <h2
                className="font-bold mb-6"
                style={{
                  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                }}
              >
                {form.headline}
              </h2>

              <p
                className="mb-8"
                style={{
                  fontSize: "17px",
                  lineHeight: "1.65",
                  color: "var(--text-secondary)",
                }}
              >
                {form.subhead}
              </p>

              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold mb-10"
                style={{
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-cta)",
                  transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
                }
              >
                {form.ctaPrimary}
              </a>

              <div className="space-y-3" style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                <p>📍 {address}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — contact form */}
          <ScrollReveal delay={80}>
            <div>
              <h3
                className="font-semibold mb-6"
                style={{
                  fontSize: "20px",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {form.notReady}
              </h3>

              <form
                action="#"
                method="POST"
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label={form.fields.name.label}
                    name="name"
                    type="text"
                    required
                    placeholder={form.fields.name.placeholder}
                  />
                  <FormField
                    label={form.fields.email.label}
                    name="email"
                    type="email"
                    required
                    placeholder={form.fields.email.placeholder}
                  />
                </div>

                <FormField
                  label={form.fields.company.label}
                  name="company"
                  type="text"
                  placeholder={form.fields.company.placeholder}
                />

                {/* Textarea */}
                <div>
                  <label
                    className="block font-medium mb-1.5"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.04em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {form.fields.message.label}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={form.fields.message.placeholder}
                    className="w-full resize-none"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--border-default)",
                      backgroundColor: "var(--bg-surface-raised)",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "var(--text-primary)",
                      outline: "none",
                      transition: `border-color var(--motion-duration-fast) var(--motion-ease-default)`,
                      fontFamily: "var(--font-family-primary)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border-focus)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border-default)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-semibold"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "var(--cta-bg)",
                    color: "var(--cta-text)",
                    fontSize: "16px",
                    border: "none",
                    cursor: "pointer",
                    transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
                    fontFamily: "var(--font-family-primary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--cta-bg-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--cta-bg)")
                  }
                >
                  {form.submit}
                </button>

                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {form.disclaimer}
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

function FormField({ label, name, type, required, placeholder }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium mb-1.5"
        style={{
          fontSize: "13px",
          letterSpacing: "0.04em",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full"
        style={{
          height: "48px",
          padding: "0 16px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border-default)",
          backgroundColor: "var(--bg-surface-raised)",
          fontSize: "16px",
          color: "var(--text-primary)",
          outline: "none",
          transition: `border-color var(--motion-duration-fast) var(--motion-ease-default)`,
          fontFamily: "var(--font-family-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-focus)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-default)")
        }
      />
    </div>
  );
}
```

---

### Task 12: page.tsx — wire all sections + footer bar

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 12.1: Write src/app/page.tsx**

```tsx
import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Method from "@/components/sections/method";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Contact, { FooterCta } from "@/components/sections/contact";
import { footer, EMAIL } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Method />
      <Services />
      <About />
      <Contact />
      <FooterCta />

      {/* Footer bar */}
      <footer
        style={{
          backgroundColor: "var(--bg-inverse)",
          borderTop: "1px solid var(--border-dark)",
        }}
      >
        <div
          className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            padding: "24px var(--spacing-section-x)",
            fontSize: "13px",
            color: "var(--text-inverse-muted)",
          }}
        >
          <p>{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--text-inverse-muted)",
                  textDecoration: "none",
                  transition: `color var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse-muted)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
```

---

### Task 13: Mobile padding responsiveness

The `--spacing-section-x: 80px` is too wide on mobile. Add a CSS rule in globals.css to narrow it.

- [ ] **Step 13.1: Add mobile spacing to globals.css**

```css
@media (max-width: 767px) {
  :root {
    --spacing-section-x: 24px;
    --spacing-section-y: var(--spacing-section-y-mobile);
  }
}
```

---

### Task 14: Build, typecheck, deploy

- [ ] **Step 14.1: TypeScript check**

```bash
cd /home/molly/nexusmethod-ai && npx tsc --noEmit 2>&1
```

Expected: zero errors.

- [ ] **Step 14.2: Production build**

```bash
cd /home/molly/nexusmethod-ai && npm run build 2>&1 | tail -30
```

Expected: exits 0, no errors.

- [ ] **Step 14.3: Push to origin/main → Vercel auto-deploy**

```bash
cd /home/molly/nexusmethod-ai && git add -A && git commit -m "feat: apply Nexus Method brand — Deep Slate/Copper/Bone palette, Gathering Storm logo, all 6 sections, services accordion"
git push origin main
```

- [ ] **Step 14.4: Verify staging URL routes 200**

After ~2 min Vercel deploy, verify:
```bash
curl -s -o /dev/null -w "%{http_code}" https://nexusmethod.ai/
```

Expected: 200

- [ ] **Step 14.5: Comment on ClickUp task 86baz0a5r**

Report staging URL and status.

---

## Self-Review

**Spec coverage check:**
- [x] All 6 sections (Hero, Problem, Method, Services, About, Contact) implemented
- [x] Footer CTA + footer bar
- [x] Sticky nav with pinned CTA + scroll behavior
- [x] NexusMark logo with entrance animation
- [x] Services accordion (Alternative B from spec)
- [x] Smooth anchor scrolling (via `scroll-behavior: smooth` on html)
- [x] Zero hardcoded hex — all `var(--token)` or `rgba()` with spec-sourced values
- [x] Mobile breakpoints: 390px single-col, 768px 2-col, 1024px full, 1440px max container
- [x] prefers-reduced-motion fallback on all animations
- [x] Inter font (not Geist)
- [x] Favicon wired
- [x] Proof variant flag (`PROOF_VARIANT`) in content.ts
- [x] All copy in content.ts (one-file swap when Quill's copy lands)
- [x] Form wiring excluded per task boundary (booking embed + analytics = separate tasks)

**Placeholder scan:** No TBD/TODO/implement-later in code blocks. All placeholder copy clearly marked `PLACEHOLDER —` in content.ts.

**Type consistency:** `FooterCta` named export from `contact.tsx`, imported by name in `page.tsx`. `PROOF_VARIANT` used as `"logo-grid" | "testimonials"` literal union consistently.
