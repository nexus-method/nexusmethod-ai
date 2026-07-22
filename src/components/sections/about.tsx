import ScrollReveal from "@/components/scroll-reveal";
import { about, PROOF_VARIANT } from "@/content";

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--bg-surface-alt)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left — bio */}
          <ScrollReveal>
            <div>
              <span
                className="block font-semibold uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent-default)",
                  marginBottom: "16px",
                }}
              >
                {about.eyebrow}
              </span>

              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                  marginBottom: "32px",
                }}
              >
                {about.headline}
              </h2>

              <div className="space-y-5" style={{ marginBottom: "48px" }}>
                {about.bio.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "17px",
                      lineHeight: "1.65",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Credential strip */}
              <div
                className="flex"
                style={{
                  paddingTop: "32px",
                  borderTop: "1px solid var(--border-default)",
                }}
              >
                {about.credentials.map((cred, i) => (
                  <div
                    key={cred.label}
                    className="flex-1 text-center"
                    style={{
                      borderRight:
                        i < about.credentials.length - 1
                          ? "1px solid var(--border-default)"
                          : "none",
                      padding: "0 24px",
                    }}
                  >
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "32px",
                        color: "var(--accent-default)",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {cred.value}
                    </p>
                    <p
                      className="uppercase font-medium"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {cred.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — proof variant */}
          <ScrollReveal delay={100}>
            {PROOF_VARIANT === "testimonials" ? (
              <div className="space-y-4">
                {about.testimonials.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "24px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--bg-surface-raised)",
                      boxShadow: "var(--shadow-card-light)",
                    }}
                  >
                    <p
                      className="italic"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.65",
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-default)",
                      }}
                    >
                      {t.author}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t.company}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Logo grid — placeholder until logos arrive */
              <div
                style={{
                  padding: "32px",
                  borderRadius: "var(--radius-xl)",
                  backgroundColor: "var(--bg-surface-raised)",
                  boxShadow: "var(--shadow-card-light)",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <p
                  className="font-semibold uppercase text-center"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--text-secondary)",
                  }}
                >
                  Trusted by service businesses
                </p>
                <div
                  className="flex flex-wrap justify-center gap-6"
                  style={{ opacity: 0.4 }}
                >
                  {about.logoGrid.map((client) => (
                    <div
                      key={client.name}
                      style={{
                        width: "80px",
                        height: "32px",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: "var(--border-default)",
                      }}
                      title={client.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
