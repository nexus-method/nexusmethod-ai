"use client";

import { useState } from "react";
import { services, BOOK_URL, ASSESSMENT_URL } from "@/content";

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  return (
    <section
      id="services"
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
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">
          {/* Left col — sticky header */}
          <div className="lg:sticky lg:top-24">
            <span
              className="block font-semibold uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--accent-default)",
                marginBottom: "16px",
              }}
            >
              {services.eyebrow}
            </span>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.015em",
                color: "var(--text-inverse)",
                marginBottom: "24px",
              }}
            >
              {services.headline}
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
                color: "var(--text-inverse-muted)",
                marginBottom: "32px",
              }}
            >
              {services.subhead}
            </p>

            {/* CTA — desktop only */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center font-semibold"
              style={{
                fontSize: "15px",
                padding: "12px 24px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent-bg)",
                color: "var(--accent-text)",
                textDecoration: "none",
                transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
              }
            >
              {services.sectionCta}
            </a>
          </div>

          {/* Right col — accordion */}
          <div>
            {services.items.map((item, i) => (
              <div
                key={item.number}
                style={{
                  borderTop: "1px solid var(--border-dark)",
                  borderBottom:
                    i === services.items.length - 1
                      ? "1px solid var(--border-dark)"
                      : "none",
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-expanded={openIndex === i}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-bold shrink-0"
                      style={{
                        fontSize: "13px",
                        letterSpacing: "0.05em",
                        color: "var(--accent-default)",
                      }}
                    >
                      {item.number}
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                        color: "var(--text-inverse)",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: "var(--text-inverse-muted)",
                      transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: `transform var(--motion-duration-slow) var(--motion-ease-default)`,
                      flexShrink: 0,
                      marginLeft: "16px",
                    }}
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>

                {/* Accordion panel */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openIndex === i ? "600px" : "0",
                    transition: `max-height var(--motion-duration-slow) var(--motion-ease-default)`,
                  }}
                >
                  <div style={{ paddingBottom: "32px" }}>
                    {/* Scope tag */}
                    <span
                      className="inline-block font-medium"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        color: "var(--text-inverse-muted)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-dark-medium)",
                        marginBottom: "16px",
                      }}
                    >
                      {item.scope}
                    </span>

                    {/* Hook */}
                    <p
                      className="font-medium"
                      style={{
                        fontSize: "17px",
                        lineHeight: "1.5",
                        color: "var(--text-inverse)",
                        marginBottom: "16px",
                      }}
                    >
                      {item.hook}
                    </p>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.65",
                        color: "var(--text-inverse-muted)",
                        marginBottom: "24px",
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="space-y-2" style={{ marginBottom: "32px" }}>
                      {item.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3"
                          style={{ fontSize: "14px", lineHeight: "1.5" }}
                        >
                          <span
                            style={{
                              color: "var(--accent-default)",
                              fontWeight: 600,
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: "var(--text-inverse-muted)" }}>
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Per-item CTA — Assessment (card 01) books the paid $499 event; others route to the free discovery call */}
                    <a
                      href={item.number === "01" ? ASSESSMENT_URL : BOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-semibold"
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-default)",
                        textDecoration: "none",
                        gap: "4px",
                        transition: `color var(--motion-duration-base) var(--motion-ease-default)`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--accent-bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--accent-default)")
                      }
                    >
                      {item.cta} →
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="lg:hidden mt-10">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold"
                style={{
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                }}
              >
                {services.sectionCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
