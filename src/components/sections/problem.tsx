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
          <div style={{ maxWidth: "800px", margin: "0 auto 64px", textAlign: "center" }}>
            <span
              className="block font-semibold uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
                marginBottom: "16px",
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
      className="nm-card-light"
      style={{
        padding: "36px",
        borderRadius: "var(--radius-xl)",
        backgroundColor: "var(--bg-surface-raised)",
        cursor: "default",
        height: "100%",
      }}
    >
      <span
        className="block font-bold"
        style={{
          fontSize: "13px",
          letterSpacing: "0.05em",
          color: "var(--accent-default)",
          marginBottom: "16px",
        }}
      >
        {card.number}
      </span>
      <h3
        className="font-semibold"
        style={{
          fontSize: "18px",
          lineHeight: "1.3",
          color: "var(--text-primary)",
          marginBottom: "12px",
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
