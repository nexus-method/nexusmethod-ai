// COPY: Pricing transparency is OQ-3 (Molly's call).
// Current placeholder shows structure without dollar amounts — uncomment pricing
// when Molly confirms whether to show $15K setup / $3K/mo retainer.

const BOOK_URL = "https://calendly.com/molly-nexusmethod/discovery-call";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-[var(--color-brand-surface)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
            What&apos;s Included
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] leading-tight mb-4">
            One clear engagement. One clear outcome.
          </h2>
          <p className="text-[var(--color-brand-secondary)] text-lg leading-relaxed">
            Nexus Method runs as a two-phase engagement: a structured installation, then an ongoing
            system that keeps evolving as your business does.
          </p>
        </div>

        {/* Two-column offer cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Phase 1 — The Installation */}
          <div className="p-8 rounded-xl border-2 border-[var(--color-brand-accent)] bg-[var(--color-brand-bg)]">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-3">
              Phase 1
            </p>
            <h3 className="text-2xl font-bold text-[var(--color-brand-primary)] mb-4">
              The Installation
            </h3>

            <ul className="space-y-3 mb-8 text-[var(--color-brand-secondary)]">
              {[
                "Operations audit — how the business actually runs",
                "Prioritized automation roadmap (ROI-ranked, not complexity-ranked)",
                "AI revenue system built and deployed on your stack",
                "Live dashboard + team training at handoff",
                "30-day post-launch support window",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-[var(--color-brand-accent)] font-bold mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Pricing — uncomment when OQ-3 resolved */}
            {/* <p className="text-3xl font-bold text-[var(--color-brand-primary)] mb-1">$15,000</p>
            <p className="text-sm text-[var(--color-brand-muted)]">One-time setup fee</p> */}

            <p className="text-sm text-[var(--color-brand-secondary)] italic">
              Investment discussed on discovery call.
            </p>
          </div>

          {/* Phase 2 — The Retainer */}
          <div className="p-8 rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)]">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              Phase 2
            </p>
            <h3 className="text-2xl font-bold text-[var(--color-brand-primary)] mb-4">
              The Retainer
            </h3>

            <ul className="space-y-3 mb-8 text-[var(--color-brand-secondary)]">
              {[
                "Ongoing system monitoring and maintenance",
                "Monthly performance review against your baseline metrics",
                "Workflow updates as your business evolves",
                "Priority access to new AI capabilities as they're proven",
                "Slack/email access to Molly for questions + decisions",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-[var(--color-brand-accent)] font-bold mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Pricing — uncomment when OQ-3 resolved */}
            {/* <p className="text-3xl font-bold text-[var(--color-brand-primary)] mb-1">$3,000<span className="text-lg font-normal">/mo</span></p>
            <p className="text-sm text-[var(--color-brand-muted)]">Month-to-month, cancel anytime</p> */}

            <p className="text-sm text-[var(--color-brand-secondary)] italic">
              Retainer structure discussed post-installation.
            </p>
          </div>
        </div>

        {/* Fit clarity note */}
        <div className="p-6 rounded-xl bg-[var(--color-brand-warm)] border border-amber-200 max-w-3xl">
          <p className="text-sm text-[var(--color-brand-primary)] leading-relaxed">
            <strong>Is this a fit for my business?</strong> Nexus Method is built for service businesses
            with $500K–$5M in revenue, 5–15 employees, and a founder who&apos;s still in the
            operations. If you&apos;re bigger, more complex, or looking for enterprise software — this
            probably isn&apos;t the right engagement. A 30-minute call is how we find out.
          </p>
        </div>

        <div className="mt-10">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[var(--color-brand-accent)] text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Book a Discovery Call →
          </a>
        </div>
      </div>
    </section>
  );
}
