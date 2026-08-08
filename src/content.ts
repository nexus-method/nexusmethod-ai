/**
 * src/content.ts
 * ─────────────────────────────────────────────
 * COPY MAP — all user-facing strings live here.
 * Copy: Quill draft 2026-07-21, Lyra reviewed, Molly approved 2026-07-22.
 * Swap any value in this file to update the live site with no component changes.
 */

// ─── Global config ────────────────────────────
/** Free 30-minute discovery call — Calendly link (verified live 2026-07-22) */
export const BOOK_URL = "https://calendly.com/molly-nexusmethod/30min";

/** AI Readiness Assessment — paid Calendly event ($1,000 per pricing-canonical.md, ratified 2026-08-01; Stripe amount updated in Calendly by Molly) */
export const ASSESSMENT_URL = "https://calendly.com/molly-nexusmethod/ai-readiness-assessment";

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
  headline: "Build systems that run your business — without you in the room.",
  subhead:
    "You've heard the AI pitch from a hundred consultants. What you need is an implementation partner who understands your P&L first, builds second, and hands it over complete. Nexus Method is boutique AI consulting for owner-operators in trades, professional services, and home services. We build it. Your team operates it. That's the difference.",
  ctaPrimary: "Book a free 30-minute discovery call",
  ctaSecondary: "Take the AI Readiness Assessment ($1,000)",
  socialProof: "Working with service businesses in Austin and remote-first teams across the US.",
};

// ─── Problem ──────────────────────────────────
export const problem = {
  eyebrow: "Sound familiar?",
  headline: "Know exactly where AI moves the needle — and what's leaking before it does",
  cards: [
    {
      number: "01",
      heading: "You're the bottleneck.",
      body: "You've built a real business. Profitable. Growing. And you're still approving quoting, updating client files, and being the person who has to be in the room when things go sideways. Your team is solid — but they wait on you for things that shouldn't need your approval.",
    },
    {
      number: "02",
      heading: "You're the information hub.",
      body: "Nothing moves without your context. You're the approval step because there's no system to handle it. You're the information hub because nobody else has the context. The business didn't scale its systems alongside its revenue — and that gap routes everything back to you.",
    },
    {
      number: "03",
      heading: "You know AI could help. You don't know where.",
      body: "Knowing where AI could help isn't the hard part. The hard part is diagnosing why you're the bottleneck in the first place — what's actually leaking before you try to automate it. Time, accuracy, communication, cash flow. The diagnosis comes first.",
    },
    {
      number: "04",
      heading: "You've tried solutions. Nothing transferred.",
      body: "Beautiful roadmaps that nobody implemented. Software your team was never trained on. Consultants who disappeared when implementation got hard. The missing piece isn't ideas — it's an operator who builds it, trains your team, and hands it over complete.",
    },
  ],
};

// ─── Method ───────────────────────────────────
export const method = {
  eyebrow: "The Nexus Method",
  headline: "A process designed to hand everything off, not hand you a bill",
  subhead:
    "This isn't advise-and-leave consulting. Every engagement follows the same four-step process — assess what's leaking, design the system, build it ourselves, then hand it to your team.",
  steps: [
    {
      number: "01",
      name: "Assess",
      tagline: "Map exactly where you're leaving money on the table.",
      body: "A working session (60–90 minutes) where we audit your highest-leverage workflows and identify where the operation leaks. You walk out with automation opportunities, ROI projections, and a phased roadmap — whether or not you work with us.",
    },
    {
      number: "02",
      name: "Architect",
      tagline: "Design the systems your team will actually use.",
      body: "We document exactly what each system handles, who'll operate it, and what training they need. Your team provides input. We're building for your business, not fitting your business to a template.",
    },
    {
      number: "03",
      name: "Build",
      tagline: "We build it. Your team doesn't.",
      body: "Weekly check-ins so you're in the loop. No surprises at the end. Your job: be available for decisions and feedback. Our job: deliver a working system on schedule.",
    },
    {
      number: "04",
      name: "Hand Off",
      tagline: "Training is a named deliverable.",
      body: "Before we close, your team runs the system. They can operate it, troubleshoot it, and adjust it without us. Documented playbooks. Recorded walkthroughs. A trained team. You don't need us anymore — that's the measure of success.",
    },
  ],
};

// ─── Services ─────────────────────────────────
export const services = {
  eyebrow: "The Services",
  headline: "Three ways to work with us",
  subhead:
    "Three entry points. Pick the one that matches where you are right now. If you're unsure, start with the Assessment.",
  sectionCta: "Book a Discovery Call →",
  items: [
    {
      number: "01",
      name: "AI Readiness Assessment",
      hook: "Find out exactly where AI moves the needle.",
      scope: "$1,000 · 1 session (60–90 min)",
      description:
        "A live working session with Molly. We audit your highest-leverage workflows and identify which ones benefit most from automation. You walk out with a roadmap of what to tackle first, ROI for each phase, and timeline — even if you decide not to implement with us.",
      outcomes: [
        "Workflow audit — identify which bottlenecks move the needle",
        "ROI projections — time recovered per workflow, revenue impact",
        "Phased roadmap — what to tackle first, what's secondary",
        "Your decision — build it yourself or implement with us",
      ],
      cta: "Schedule your AI Readiness Assessment",
    },
    {
      number: "02",
      name: "Implementation",
      hook: "Build it. Own it. Run it without us.",
      scope: "$10K–$25K · 4–8 weeks",
      description:
        "Four-phase engagement. We handle the build. Your team learns as we go. Before we close, your team can operate, troubleshoot, and adjust every system we built. You own it completely — no consultant on retainer, no 'call us when it breaks.'",
      outcomes: [
        "Dedicated assessment — confirm which workflows we're automating and why",
        "Documented architecture — every system documented so your team understands it",
        "Team training — a named deliverable built into the engagement",
        "Handoff documentation — playbooks, recorded walkthroughs, troubleshooting guides",
      ],
      cta: "Book a Discovery Call",
    },
    {
      number: "03",
      name: "Fractional Chief AI Officer",
      hook: "Keep your systems running. Scale as you grow.",
      scope: "$1,500–$3,500/month · after implementation",
      description:
        "For businesses that want a systems architect on retainer after implementation: quarterly audits, optimization sprints, and support for new workflows as you grow. Optional, cancel anytime. Starts with a 3-month minimum so your systems have time to stabilize — then month-to-month.",
      outcomes: [
        "Quarterly system audits — is everything running optimally?",
        "Optimization sprints — refine and expand what's working",
        "New workflow support — scope, build, and hand off as your business scales",
        "Strategic perspective — which workflows move the needle most",
      ],
      cta: "Book a Discovery Call",
    },
  ],
};

// ─── About ────────────────────────────────────
export const about = {
  eyebrow: "About Molly",
  headline: "Molly builds what she sells.",
  bio: [
    "Molly spent a decade in product marketing and growth strategy — startups to platform companies and everything in between. She's seen how businesses actually work at every scale: the bottlenecks that don't change size, the metrics that matter, the cash flow constraints. She watched founders at small companies work 70-hour weeks to manually approve things their team should handle.",
    "When everyone suddenly decided 'AI is the answer,' consultants started pitching business owners with zero business context. Beautiful roadmaps that nobody could implement. They disappeared when things got hard.",
    "Molly runs multiple businesses now, and she runs them with the exact automation systems she's selling to you. Every claim she makes about what's possible — she's proven it in her own operations. She knows the difference between a beautiful roadmap and a system that actually works. She knows where consultants fail: the handoff. She doesn't.",
  ],
  credentials: [
    { value: "10+", label: "Years in product & GTM" },
    { value: "Live", label: "Systems she runs herself" },
    { value: "Austin", label: "TX — remote-friendly" },
  ],
  // Variant A: logo grid (swap in when client logos land in /public/logos/)
  logoGrid: [
    { name: "Client 1 — coming soon", logo: "" },
    { name: "Client 2 — coming soon", logo: "" },
    { name: "Client 3 — coming soon", logo: "" },
  ],
  // Variant B: testimonials (swap in when client quotes are confirmed)
  testimonials: [
    {
      quote: "Client quote — coming soon.",
      author: "Name, Role",
      company: "Company",
    },
  ],
};

// ─── Contact ──────────────────────────────────
export const contact = {
  footerCta: {
    headline: "Ready to find your nexus?",
    subhead: "Pick the entry point that fits where you are right now.",
    ctaPrimary: "Book a free 30-minute discovery call",
    ctaSecondary: "Take the AI Readiness Assessment ($1,000)",
    fine: "Either path, you'll know exactly what's possible — and what it means for your revenue.",
  },
  form: {
    eyebrow: "Get Started",
    headline: "Let's talk about your business.",
    subhead:
      "If you think there's an opportunity worth exploring, book a free 30-minute discovery call. No pitch. Just conversation about where you're losing time and revenue, and whether Nexus Method is the right fit.",
    ctaPrimary: "Book a free 30-minute discovery call →",
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
