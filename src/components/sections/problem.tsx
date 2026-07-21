const problems = [
  {
    number: "01",
    heading: "You're the bottleneck.",
    body:
      "Every decision loops back to you. Your team is capable — but nothing moves without your approval, your context, or your intervention. You built a business, not a job. It's starting to feel like a job.",
  },
  {
    number: "02",
    heading: "Leads disappear between inquiry and close.",
    body:
      "You know you're losing deals that should have been easy wins. Follow-up is manual. The timing is always slightly off. A competitor who moved faster got there first. This is a systems problem, not a hustle problem.",
  },
  {
    number: "03",
    heading: "Revenue is growing. Margin isn't.",
    body:
      "Every new client means another hire. You're running a people business on people power — and the math doesn't change. To grow profitably, the ratio of revenue to headcount has to shift.",
  },
  {
    number: "04",
    heading: "You've tried AI tools. Nothing stuck.",
    body:
      "ChatGPT, automations, software demos. You've seen the potential. But disconnected tools don't compound — they just add to the noise. The business needs a system, not more subscriptions.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="py-24 md:py-32 bg-[var(--color-brand-surface)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
            Sound familiar?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] leading-tight">
            The $500K–$5M ceiling is a systems problem.
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((p) => (
            <div
              key={p.number}
              className="p-8 rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)]"
            >
              <span className="text-xs font-bold tracking-widest text-[var(--color-brand-muted)] mb-3 block">
                {p.number}
              </span>
              <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                {p.heading}
              </h3>
              <p className="text-[var(--color-brand-secondary)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
