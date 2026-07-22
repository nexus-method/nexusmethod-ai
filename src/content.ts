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
