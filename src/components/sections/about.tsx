// CONTENT: OQ-8 — Professional headshot needed. Replace placeholder with real image path.
// Bio copy is placeholder; Molly to review tone and update with specific company names/outcomes.

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[var(--color-brand-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <div className="order-2 md:order-1">
            <div className="aspect-[4/5] max-w-sm mx-auto md:mx-0 rounded-2xl bg-stone-200 flex items-center justify-center">
              {/* OQ-8: Replace with real headshot */}
              <p className="text-stone-400 text-sm text-center px-6">
                [Professional headshot — OQ-8]
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="order-1 md:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
              About Molly
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] leading-tight mb-6">
              I built this because I needed it first.
            </h2>

            <div className="space-y-4 text-[var(--color-brand-secondary)] leading-relaxed">
              <p>
                I&apos;ve spent 12+ years scaling products across startups and enterprises — from product
                marketing and GTM strategy to building the autonomous systems that now run my own
                business. I didn&apos;t start as an AI consultant. I became one when I realized the
                same operational leverage I built internally could transform a service business.
              </p>
              <p>
                Nexus Method runs on the systems I built for myself. The AI workflows, the
                automated follow-up sequences, the dashboards that tell me what&apos;s working without
                me having to ask — those exist in my business before I install them in yours.
                This isn&apos;t theory. It&apos;s something I&apos;ve already solved.
              </p>
              <p>
                I work with a small number of businesses at a time, which means I&apos;m in the details
                of every engagement. Not a junior team. Me.
              </p>
            </div>

            {/* Credibility signals */}
            <div className="mt-8 pt-8 border-t border-[var(--color-brand-border)]">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-[var(--color-brand-primary)]">12+</p>
                  <p className="text-xs text-[var(--color-brand-muted)] mt-1">Years in product &amp; GTM</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-brand-primary)]">$5M</p>
                  <p className="text-xs text-[var(--color-brand-muted)] mt-1">Revenue ceiling served</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-brand-primary)]">Austin</p>
                  <p className="text-xs text-[var(--color-brand-muted)] mt-1">Home base, remote-friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
