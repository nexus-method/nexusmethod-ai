# Changelog

Running log of changes to nexusmethod-ai. Newest entries on top.

---

## 2026-09-21 — Removed expired pricing from nexusmethod.ai live site

**Why:** Implementation and Fractional Chief AI Officer service tiers were still quoting the three-tier ladder retired 8/12/26 ($10K–$25K, $1,500–$3,500/mo), exposing outdated numbers to prospects for 5+ weeks. Monthly Engagement ratification remains pending since 8/12/26; pulled stale numbers immediately rather than waiting for an uncertain deadline.

**Changed:**
- Replaced retired pricing in `src/content.ts` for Implementation and Fractional Chief AI Officer service lines with placeholder copy ("Custom scope · pricing discussed on your Discovery Call")
- Added `nexusmethod-ai/src/content.ts` to pricing-canonical.md's downstream-repoint tracking list to prevent silent drift on future pricing changes

---

## 2026-09-21 — Remove expired pricing from public services section

**Why:** The Implementation and Monthly Engagement tiers were displaying pricing retired on 8/12/26 ($10K–$25K and $1,500–$3,500/month) to real prospects on the live site. Pulled the figures immediately rather than waiting for pending ratification; replaced with non-committal copy to stop exposure while pricing decisions settle.

**Changed:**
- Removed "$10K-$25K - 4-8 weeks" from Implementation tier; now reads "Custom scope · pricing discussed on your Discovery Call"
- Removed "$1,500-$3,500/month - after implementation" from Monthly Engagement tier; now reads "Custom scope · pricing discussed on your Discovery Call"

---

## 2026-08-08 — Update nexusmethod.ai Implementation pricing floor to $10K

**Why:** Pricing ladder was ratified on Aug 3 with Implementation floor rising from $5K to $10K, but the live site still showed $5K-$25K. Pre-Aug 6 deadline has passed; this closes the overdue item.

**Changed:**
- `src/content.ts:136`: Updated Implementation scope band from "$5K-$25K · 4-8 weeks" to "$10K-$25K · 4-8 weeks"
- Built successfully and deployed to Vercel; verified live site displays correct pricing with zero $5K references remaining

---

## 2026-08-08 — Update nexusmethod Implementation price floor from $5K to $10K

**Why:** Implementation pricing ratified on 8/3 raised the floor from $5K to $10K per the new consulting ladder ($10K/$18K/$25K tiers). This overdue change brings the live site in sync with current pricing after the Aug 6 offer session deadline.

**Changed:**
- `src/content.ts:136` — updated Implementation band from `$5K–$25K · 4–8 weeks` to `$10K–$25K · 4–8 weeks`
- Swept site for surviving `$5K` references; none found beyond the primary band
- Deployed to Vercel; live site now displays `$10K–$25K` on both `nexusmethod-ai-nine.vercel.app` and `nexusmethod.ai`

---

## 2026-08-02 — Sharpen Commercial Lens marker with cross-functional bottleneck differentiator

**Why:** Molly's About page articulates a load-bearing claim ("the bottleneck is almost never inside a function") that wasn't reflected in the home page trust markers, creating narrative debt. Roundtable (Lyra, Flynn, Sage) aligned on sharpening marker 1 to carry both altitudes—P&L diagnostics and cross-functional systems thinking—without adding a fifth marker and breaking the four-beat rhythm.

**Changed:**
- Rewrote "Commercial Lens" marker under hero.tsx to include cross-functional bottleneck insight: "Twelve years working across sales, delivery, product, and finance is how I find the bottleneck, and it's almost never inside a function. It's in the handoff between them."
- Updated corresponding copy in services.tsx and content.ts to reflect the sharpened positioning
- Kept "P&L first, build second" title; held the four-marker strip at current weight (no fifth marker added)
- Deferred hero-subhead test per Sage; watching analytics before reopening the hero

## 2026-08-02 — Close layout gaps and finalize mollyjaggers.com visual polish

**Why:** Last deployment revealed card misalignment across the site where multi-line titles caused descriptions to start at different heights. Large apparent gaps in screenshots were animation artifacts (fade-in stalled in headless automation), but two real defects surfaced: service cards and speaking topics. Fixed both, verified all nine pages render clean, and posted the blocking decisions packet.

**Changed:**
- **Service cards** (`hero.tsx`, `services.tsx`): icon alignment (changed to `items-start` with `mt-1` on icon), reserved two-line title height with `min-h-[3.5rem]`, removed `max-w-prose` constraint on descriptions to use full card width
- **Trust markers** (`content.ts` rendering): reserved title height to align descriptions when "Fixed price, stated timeline" wraps to two lines
- **Speaking topics** (`content.ts` rendering): reserved title height to align descriptions when "AI without the hype" stays one line while others wrap
- **Visual QA**: swept all nine pages; confirmed /about, /method, /contact, /assessment, /score grid structures are immune to the defect; work-entry cards already flex-column safe; third /work card alone-in-row is symptom of thin page, resolves at four entries
- **Decisions packet** (`18JI9jq5BPX1Lua-_-mq5a3Z1-oqSG2oeXWPiIoazVsQ`): linked to ClickUp item 86bb72ja0; seven decisions, all recommendations stated; Item 7 (data/confidentiality claim) flagged pending Molly's accurate language

## 2026-08-02 — Tighten voice and remove sales register from copy

**Why:** The site was mixing strategic directness with internal sales vocabulary and contradicting itself on timing. Removing jargon and softening claims keeps the messaging honest and strengthens the trust argument.

**Changed:**
- Hero subheadline: rewritten from 21 words to tighter language; inverted the ownership line to land it last and harder
- Quiz answer CTA: replaced sales-pitch phrasing ("tell me where to send the full breakdown") with direct value statement ("your score, your band, your next move, where should I send a copy")
- FAQ: removed "pipeline" terminology; replaced "my pipeline only works if it's full of businesses I can actually help" with "this only works if I'm working with businesses I can actually help"
- Assessment timeline: corrected contradiction ("five touchpoints, one week" → "five touchpoints, about ten days"); clarified roadmap build window
- Retainer hook: removed tautology ("scale as you grow"); tightened to "keep your systems compounding after I leave"

## 2026-07-30 — Consulting CRM: migrate from ClickUp to Supabase

**Why:** Retiring ClickUp lead pipeline in favor of Supabase-backed consulting CRM. Establishes 5-table schema (companies, contacts, leads, engagements, touchpoints) with row-level security and migrates 8 ICP prospecting leads to Supabase as source of truth.

**Changed:**
- `env.example`: removed ClickUp list reference (901416970838), added Supabase URL and service role key placeholders with context-aware naming (Vercel vs Dell environments)
- `supabase/migrations/001_consulting_crm_schema.sql`: added 5-table DDL with RLS policies, explicit role GRANTs, indexes, and audit triggers
- `supabase/migrations/002_seed_prospecting_leads.sql`: added idempotent CTE chains to seed 8 ICP leads with score, tier, contact data, and enrichment notes from ClickUp

---

## 2026-07-30 — Consulting CRM: Supabase schema + ClickUp pipeline retired

**Why:** ClickUp list 901416970838 served as lead triage initially but lacks structure for scoring, enrichment, and engagement tracking. Supabase consulting CRM now owns the prospecting pipeline as the SoT; n8n lead-ingest pipeline and contact form now write directly to Supabase instead of ClickUp.

**Changed:**
- Created `nexusmethod-ai/supabase/migrations/001_consulting_crm_schema.sql` — 5-table schema (companies, contacts, leads, engagements, touchpoints) with RLS, explicit GRANTs, indexes, and change-tracking triggers
- Created `nexusmethod-ai/supabase/migrations/002_seed_prospecting_leads.sql` — idempotent seed CTE chains migrating 8 ICP prospecting leads from ClickUp list 901416970838 (scores, tiers, contacts, notes preserved)
- Created `agentos/automations/lead-webhook/seed-via-postgrest.sh` — PostgREST-based DML seeding script for environments where SQL Editor access is unavailable (Dell IPv6-only constraint workaround)
- Updated `nexusmethod-ai/env.example` — removed `CLICKUP_TOKEN` and `CLICKUP_LEAD_LIST_ID`, added `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, added deprecation note for ClickUp refs
- Updated n8n workflow `2LBq7QIM8MVAyAo6` (Lead Ingest Pipeline): removed ClickUp DEDUPE CHECK, added Supabase email-dedup query via PostgREST, switched enrichment writeback from ClickUp to Supabase PATCH using Python `urllib.request` + `json.dumps()`
- PATCH `ITM-01KYTSZCS4H0JQ4XEKYK90PVNP` to done; created follow-up blocker `ITM-01KYTV88288671AT36DC1TME3G` for applying migrations via Supabase Dashboard (blocked on Molly supplying nexus-method-consulting project credentials)

## 2026-07-27 — nexusmethod.ai launch with Supabase lead pipeline

**Why:** Launched nexusmethod.ai live to production with the consulting lead pipeline migrated from ClickUp to a dedicated Supabase project. Contact form now routes inbound leads to a single source of truth with RLS-enforced security, eliminating multi-store fragmentation.

**Changed:**
- Deployed nexusmethod.ai to production (Vercel, auto-deploys from `nexus-method/nexusmethod-ai` GitHub); site serves over HTTPS with auto-renewal
- Migrated lead ingestion to Supabase (`nexus-method-consulting` project, `leads` table, service-role RLS enforcement, no ClickUp writes)
- Updated contact form (`src/app/api/contact/route.ts`) to write leads to Supabase with structured schema (email, name, service, company, phone, message)
- Updated `.env.example` to document Supabase auth (removed ClickUp token references)
- Refreshed services section (`src/components/sections/services.tsx`) with current offerings and pricing ($499 Assessment, free Discovery Call)
- Updated privacy page (`src/app/privacy/page.tsx`) to reflect Supabase data handling
- Revised site content and metadata (`src/content.ts`) for launch readiness
- Set up Calendly + Stripe integrations for self-serve booking and payment (Assessment tier)

---

## 2026-07-27 — nexusmethod.ai launch: Supabase lead pipeline + contact form rewire

**Why:** Launched nexusmethod.ai live on Vercel with a dedicated lead-capture pipeline; migrated from ClickUp to a dedicated Supabase project (`nexus-method-consulting`, RLS-protected) and made pricing/offer stack visible (Assessment $499 via Calendly + Stripe, Discovery Call free).

**Changed:**
- env.example: added Supabase project credentials (URL, service-role key)
- src/app/api/contact/route.ts: rewired contact form to write to Supabase `leads` table with server-side auth instead of ClickUp
- src/components/sections/contact.tsx: updated contact form UI to surface Calendly link and pricing transparency
- src/components/sections/services.tsx: added Assessment ($499) and Discovery Call (free) offerings with live Calendly/Stripe links
- src/app/privacy/page.tsx: updated privacy policy to reflect Supabase lead storage and RLS controls
- src/content.ts: updated service descriptions, pricing copy, and offer stack to match live offering

## 2026-07-23 — Nexus Method website live with Supabase lead pipeline

**Why:** launched the Nexus Method consulting site on Vercel with a functioning lead-capture pipeline, migrating from a temporary ClickUp workaround to a dedicated Supabase project to enable real lead ingestion and scoring workflows.

**Changed:**
- Contact form (`src/app/api/contact/route.ts`) refactored to write leads to a dedicated Supabase project (`nexus-method-consulting` / `leads` table); RLS enabled for security
- Services section (`src/components/sections/services.tsx`) updated with live pricing ($499 Assessment, free Discovery Call) and booking/payment integration links (Calendly, Stripe)
- Privacy policy page added (`src/app/privacy/page.tsx`) to disclose data handling and Supabase storage
- Environment configuration (`env.example`) updated to reference Supabase credentials instead of ClickUp tokens
- Content structure (`src/content.ts`) refactored to support lead-pipeline messaging and service definitions
- Lead funnel visualization created (SVG source + PNG export) documenting the full contact → booking → assessment flow

## 2026-07-23 — Migrate contact form from ClickUp to Supabase leads table

**Why:** Move form submissions from ClickUp's external pipeline to Supabase for improved data control, security, and alignment with the new consulting CRM architecture.

**Changed:**
- Rewrote `/api/contact` route to insert submissions directly into Supabase `leads` table via REST API with server-side `service_role` key
- Updated contact form components to submit to the repointed `/api/contact` endpoint
- Created `leads` table in Supabase with schema (name, email, company, message, source, status, score, tier, enrichment, notes) and RLS enabled
- Granted `service_role` permissions on `leads` table for server-side inserts
- Added `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables to Vercel production
- Updated `env.example` with new Supabase configuration keys
- Configured privacy and services sections to reflect Supabase-backed form handling

---

## 2026-07-23 — Wire Assessment booking link to hero button

**Why:** Hero's "Take the AI Readiness Assessment" button was pointing nowhere; wired it to the paid Calendly event (`calendly.com/molly-nexusmethod/ai-readiness-assessment`) to make the $499 Assessment bookable directly from the site.

**Changed:**
- `src/content.ts`: Added `ASSESSMENT_URL` constant linking to paid AI-Readiness Assessment booking event
- `src/components/sections/contact.tsx`: Updated hero button CTA to route to Assessment URL instead of void link

---

## 2026-07-23 — Wire AI Readiness Assessment booking to Calendly + Stripe

**Why:** Assessment event needs to be bookable from the site and capable of collecting $499 payments through the existing Stripe-Calendly integration, verified live on Molly's account.

**Changed:**
- Added `ASSESSMENT_URL` constant to `src/content.ts` pointing to the paid Calendly event (`calendly.com/molly-nexusmethod/ai-readiness-assessment`)
- Updated site CTAs to link to the Assessment booking page
- Verified Stripe (`Nexus Method LLC`) is fully live with charges and payouts enabled, payouts routed to Thread Bank
- Verified both Calendly events active: Discovery Call (free), AI-Readiness Assessment (paid at $499 via Stripe)

---

## 2026-07-22 — NexusMark brand implementation for flagship site

**Why:** Applied the production brand (Deep Slate, Warm Copper, Bone White) and implemented all 6 sections to the Pixel design spec. Site is now staged at `nexusmethod-ai.vercel.app` and ready for DNS routing to the custom domain.

**Changed:**
- Added complete brand token system to `globals.css` (color palette, spacing, typography, shadows) and NexusMark logo CSS animation (20-particle entrance with stagger + nexus pulse)
- Created `src/content.ts` as single-source copy map for all sections and CTA labels
- Implemented `logo.tsx` with animated SVG particle system and `scroll-reveal.tsx` IntersectionObserver wrapper for staggered section reveals
- Rewrote `nav.tsx` with scroll-triggered header blur, dark mobile drawer overlay, and copper CTA pill
- Rewrote all 6 section components to spec: Hero (dark bg, copper rule, pill + ghost CTAs), Problem (white hover-lift cards), Method (dark 4-step flow cards), Services (accordion with first item open), About (2-col credential strip with proof variant flag), Contact (form + footer CTA export)
- Updated `layout.tsx` with Inter font via `next/font/google` and favicon metadata
- Updated `page.tsx` to import all sections and render complete site layout
- Built and deployed to staging at `nexusmethod-ai.vercel.app` (commit `de3d938`). TypeScript clean, all 4 static pages generated successfully.

## 2026-07-22 — Brand implementation and full site build

**Why:** Deployed the Nexus Method brand across the entire site per the design spec, implementing all 6 content sections with dark/light contrast, typography, animations, and form integration. Site now reflects the brand identity and is staged for QA.

**Changed:**
- Introduced brand color palette (Deep Slate, Warm Copper, Bone White) via CSS custom properties in `globals.css`, with `@keyframes` for logo particle entrance and scroll-reveal staggering
- Migrated typography to Inter via `next/font/google` and set as CSS variable
- Created `src/components/logo.tsx` — animated NexusMark SVG Server Component with 20 particles entering from outer orbit, nexus center pulse, and reduced-motion fallback
- Created `src/components/scroll-reveal.tsx` — Client Component wrapper using IntersectionObserver to trigger CSS animations on viewport entry
- Built `src/components/nav.tsx` with scroll state (transparent → blurred dark on scroll >80px), mobile full-screen drawer, and copper pill CTA
- Implemented all 6 section components per Pixel spec:
  - Hero: dark background, copper rule accent, staggered text reveal, dual CTAs (pill + ghost border)
  - Problem: light background, white raised cards with hover lift (-4px translate, shadow increase)
  - Method: dark background, 4-step copper-numbered cards with tagline/body, hover lift
  - Services: accordion (first item open by default), left sticky header, right scrolling panels with chevron rotation
  - About: 2-column grid, credential strip with copper values, conditional proof variant (logo-grid or testimonials)
  - Contact: copper pill form CTA + dedicated FooterCta section (dark, centered, large CTA)
- Consolidated all site copy into `src/content.ts` with structured sections, card items, steps, credentials, and testimonials
- Updated `src/app/layout.tsx` with Inter font setup, favicon metadata (32×32 PNG), and viewport config
- Updated `src/app/page.tsx` to compose all sections and FooterCta in proper order
- Added `PROOF_VARIANT` constant in content.ts for editorial flexibility (swap proof section content without code changes)
- Verified TypeScript compilation clean, production build exits 0, all 4 static pages generated
- Deployed to `nexusmethod-ai.vercel.app` staging; custom domain `nexusmethod.ai` pending DNS wiring from GoDaddy to Vercel

---

## 2026-07-21 — Scaffold nexusmethod.ai Next.js website

**Why:** Molly ratified the nexusmethod.ai website build assignment on 2026-07-21. Project uses Next.js 16 + Tailwind + Vercel stack per discovery brief IA.

**Changed:**
- Created Next.js 16 app with TypeScript and Tailwind v4 CSS-first styling
- Built responsive Nav component with sticky positioning and "Book a Call" CTA
- Implemented 6-section homepage: Hero, Problem, Method, Services, About, Contact — all per discovery brief §4.2 and covering OQ-1 through OQ-8
- Added brand token CSS variables in globals.css for centralized color and token management
- Created vercel.json config for Vercel deployment pipeline
- Added .env.local.example template for environment variables
- Marked all content gaps (framework copy, pricing, bio, case studies) with inline OQ comments for content team

## 2026-07-21 — Scaffold nexusmethod.ai single-page site

**Why:** Deliver the initial Next.js site structure with all 6 sections from the discovery brief (hero, problem, method, services, about, contact), ready for copy, design tokens, and Vercel deployment. Stack matches mollyjaggers.com for consistency.

**Changed:**
- Created full Next.js + TypeScript + Tailwind v4 site structure with CSS-first architecture
- Built navigation component with sticky layout and "Book a Call" CTA
- Implemented 6 main sections: hero with OQ-2 placeholder, problem/method/services frameworks, about/contact sections, all with OQ markers for future content swaps
- Added `globals.css` with CSS custom property brand tokens for color/spacing (ready for Lyra token updates)
- Configured `vercel.json` for staging deployment pipeline
- Created `env.example` template for environment variables
- Pushed to GitHub at `nexus-method/nexusmethod-ai` (ready for one-click Vercel import; staging URL: `nexusmethod-ai.vercel.app`)
