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
          <div
            className="text-center"
            style={{ maxWidth: "760px", margin: "0 auto 64px" }}
          >
            <span
              className="block font-semibold uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
                marginBottom: "16px",
              }}
            >
              {method.eyebrow}
            </span>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.015em",
                color: "var(--text-inverse)",
                marginBottom: "16px",
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
                className="nm-card-dark"
                style={{
                  padding: "32px 28px",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-card-dark)",
                  height: "100%",
                  cursor: "default",
                }}
              >
                {/* Step number */}
                <span
                  className="block font-bold"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    color: "var(--accent-default)",
                    marginBottom: "12px",
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
                  className="block font-semibold uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--text-inverse-muted)",
                    marginBottom: "8px",
                  }}
                >
                  {step.name}
                </span>

                {/* Tagline */}
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.2",
                    color: "var(--text-inverse)",
                    marginBottom: "16px",
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
