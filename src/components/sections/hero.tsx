import ScrollReveal from "@/components/scroll-reveal";
import { hero, BOOK_URL, ASSESSMENT_URL } from "@/content";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "152px", // 72px nav + 80px breathing room
        paddingBottom: "128px",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <div style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            {/* Eyebrow + copper rule */}
            <div className="flex flex-col gap-3" style={{ marginBottom: "32px" }}>
              <span
                className="font-semibold uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent-default)",
                  lineHeight: 1.4,
                }}
              >
                {hero.eyebrow}
              </span>
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  backgroundColor: "var(--accent-default)",
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "var(--text-inverse)",
                marginBottom: "28px",
              }}
            >
              {hero.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p
              style={{
                fontSize: "clamp(1.0625rem, 1.5vw, 1.125rem)",
                lineHeight: "1.65",
                color: "var(--text-inverse-muted)",
                marginBottom: "48px",
                maxWidth: "580px",
              }}
            >
              {hero.subhead}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ marginBottom: "40px" }}
            >
              {/* Primary — copper pill */}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nm-cta-copper-lift inline-flex items-center justify-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-cta)",
                }}
              >
                {hero.ctaPrimary}
              </a>

              {/* Ghost CTA — AI Readiness Assessment (price from content.ts, canon: pricing-canonical.md) */}
              <a
                href={ASSESSMENT_URL}
                className="nm-ghost-cta inline-flex items-center justify-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "15px 32px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-dark-medium)",
                  color: "var(--text-inverse)",
                  textDecoration: "none",
                }}
              >
                {hero.ctaSecondary}
              </a>
            </div>

            {/* Social proof micro-signal */}
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-inverse-muted)",
                lineHeight: 1.5,
              }}
            >
              {hero.socialProof}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
