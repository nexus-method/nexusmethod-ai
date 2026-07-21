// COPY PENDING: OQ-2 — Hero headline + subhead options from Sage/Flynn.
// Placeholder copy matches the brief's framing; swap before launch.

const BOOK_URL = "https://calendly.com/molly-nexusmethod/discovery-call";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 bg-[var(--color-brand-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-6">
            AI Consulting for Service Businesses
          </p>

          {/* Headline — OQ-2 placeholder */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-brand-primary)] leading-tight tracking-tight mb-6">
            Your business shouldn&apos;t need you at every decision point.
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-[var(--color-brand-secondary)] leading-relaxed mb-10 max-w-2xl">
            Nexus Method installs AI-powered revenue systems into $500K–$5M service businesses —
            so operations run without the owner in the loop, leads stop falling through the cracks,
            and growth doesn&apos;t require adding headcount.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[var(--color-brand-accent)] text-white font-semibold text-base hover:opacity-90 transition-opacity"
            >
              Book a Discovery Call →
            </a>
            <a
              href="#method"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md border border-[var(--color-brand-border)] text-[var(--color-brand-primary)] font-semibold text-base hover:bg-stone-100 transition-colors"
            >
              See the Method
            </a>
          </div>

          {/* Social proof micro-signal */}
          <p className="mt-8 text-sm text-[var(--color-brand-muted)]">
            Working with service businesses in Austin and remote-first teams across the US.
          </p>
        </div>
      </div>
    </section>
  );
}
