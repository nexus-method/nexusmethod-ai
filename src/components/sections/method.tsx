// COPY PENDING: OQ-1 — 4-step Nexus Method framework from Sage/Flynn.
// Placeholder names and descriptions align with brief §3; update when framework is confirmed.

const steps = [
  {
    number: "01",
    name: "Assess",
    tagline: "Map how the business actually runs.",
    description:
      "We start with a structured audit of your operations — how work flows, where decisions bottleneck, and where the highest-value automation opportunities are hiding. Not how you think it runs. How it actually runs.",
  },
  {
    number: "02",
    name: "Diagnose",
    tagline: "Prioritize by ROI, not complexity.",
    description:
      "From the audit, we identify the lead-rescue opportunities and owner-dependency choke points that will move the needle fastest. You get a clear, ranked implementation roadmap — not a feature wishlist.",
  },
  {
    number: "03",
    name: "Build",
    tagline: "Install the system.",
    description:
      "We deploy your AI revenue system — typically on GoHighLevel or an equivalent stack purpose-built for your business. Molly reviews and approves every workflow before it goes live. No black boxes.",
  },
  {
    number: "04",
    name: "Hand Off",
    tagline: "Your team runs it. We keep it sharp.",
    description:
      "You get a live dashboard, team training, and a retainer engagement to maintain and evolve the system as your business grows. The goal is operational independence — not dependency on a consultant.",
  },
];

export default function Method() {
  return (
    <section
      id="method"
      className="py-24 md:py-32 bg-[var(--color-brand-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
            The Nexus Method
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] leading-tight mb-4">
            A specific process. Repeatable results.
          </h2>
          <p className="text-[var(--color-brand-secondary)] text-lg leading-relaxed">
            This isn&apos;t &quot;we&apos;ll figure it out together.&quot; Every engagement follows the same four-step process — because the path from chaos to operational leverage is well-worn.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-10 right-10 h-px bg-[var(--color-brand-border)]" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Step number bubble */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-accent)] text-white flex items-center justify-center text-sm font-bold mb-6 relative z-10">
                  {step.number.replace("0", "")}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-muted)] mb-1">
                  {step.name}
                </p>
                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mb-3">
                  {step.tagline}
                </h3>
                <p className="text-sm text-[var(--color-brand-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
