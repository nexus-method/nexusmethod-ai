"use client";

import { useState } from "react";
import ScrollReveal from "@/components/scroll-reveal";
import { contact, BOOK_URL, ASSESSMENT_URL } from "@/content";

export function FooterCta() {
  return (
    <section
      style={{
        backgroundColor: "var(--bg-inverse)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div
        className="max-w-[720px] mx-auto text-center"
        style={{ padding: "0 var(--spacing-section-x)" }}
      >
        <ScrollReveal>
          {/* Copper accent line */}
          <div
            className="mx-auto"
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "var(--accent-default)",
              marginBottom: "32px",
            }}
          />

          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.015em",
              color: "var(--text-inverse)",
              marginBottom: "24px",
            }}
          >
            {contact.footerCta.headline}
          </h2>

          <p
            style={{
              fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
              lineHeight: "1.65",
              color: "var(--text-inverse-muted)",
              marginBottom: "40px",
            }}
          >
            {contact.footerCta.subhead}
          </p>

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold"
            style={{
              fontSize: "18px",
              padding: "20px 40px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--accent-bg)",
              color: "var(--accent-text)",
              textDecoration: "none",
              boxShadow: "var(--shadow-cta)",
              marginBottom: "24px",
              transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                           transform var(--motion-duration-base) var(--motion-ease-default)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-bg)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {contact.footerCta.ctaPrimary}
          </a>

          {/* Secondary CTA — the paid AI Readiness Assessment */}
          <a
            href={ASSESSMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold"
            style={{
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "transparent",
              color: "var(--text-inverse)",
              border: "1.5px solid var(--border-dark-medium)",
              textDecoration: "none",
              marginLeft: "12px",
              marginBottom: "24px",
              transition: `border-color var(--motion-duration-base) var(--motion-ease-default)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-dark-medium)";
            }}
          >
            {contact.footerCta.ctaSecondary}
          </a>

          <p
            className="block"
            style={{
              fontSize: "14px",
              color: "var(--text-inverse-muted)",
            }}
          >
            {contact.footerCta.fine}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Contact() {
  const { form, address } = contact;
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    // Honeypot: humans never see this field; a filled value means a bot. Drop silently.
    if (data.get("company_website")) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
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
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — primary CTA */}
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
                {form.eyebrow}
              </span>

              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                }}
              >
                {form.headline}
              </h2>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.65",
                  color: "var(--text-secondary)",
                  marginBottom: "32px",
                }}
              >
                {form.subhead}
              </p>

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
                  boxShadow: "var(--shadow-cta)",
                  marginBottom: "40px",
                  transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
                }
              >
                {form.ctaPrimary}
              </a>

              <div style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                <p>📍 {address}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — contact form */}
          <ScrollReveal delay={80}>
            <div>
              <h3
                className="font-semibold"
                style={{
                  fontSize: "20px",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  marginBottom: "24px",
                }}
              >
                {form.notReady}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot — off-screen, hidden from humans, catches bots */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                  }}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label={form.fields.name.label}
                    name="name"
                    type="text"
                    required
                    placeholder={form.fields.name.placeholder}
                  />
                  <FormField
                    label={form.fields.email.label}
                    name="email"
                    type="email"
                    required
                    placeholder={form.fields.email.placeholder}
                  />
                </div>

                <FormField
                  label={form.fields.company.label}
                  name="company"
                  type="text"
                  placeholder={form.fields.company.placeholder}
                />

                {/* Textarea */}
                <div>
                  <label
                    className="block font-medium"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.04em",
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    {form.fields.message.label}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={form.fields.message.placeholder}
                    className="w-full resize-none"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--border-default)",
                      backgroundColor: "var(--bg-surface-raised)",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "var(--text-primary)",
                      outline: "none",
                      transition: `border-color var(--motion-duration-fast) var(--motion-ease-default)`,
                      fontFamily: "var(--font-family-primary)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border-focus)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border-default)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full font-semibold"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "var(--cta-bg)",
                    color: "var(--cta-text)",
                    fontSize: "16px",
                    border: "none",
                    cursor: status === "submitting" ? "default" : "pointer",
                    opacity: status === "submitting" ? 0.7 : 1,
                    transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
                    fontFamily: "var(--font-family-primary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--cta-bg-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--cta-bg)")
                  }
                >
                  {status === "submitting" ? "Sending…" : form.submit}
                </button>

                {status === "success" ? (
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--accent-default)",
                      lineHeight: 1.5,
                    }}
                  >
                    Thanks — your message is in. I&apos;ll respond within 24 hours
                    to strong-fit inquiries.
                  </p>
                ) : status === "error" ? (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#c0392b",
                      lineHeight: 1.5,
                    }}
                  >
                    Something went wrong sending that. Email me directly at{" "}
                    <a
                      href="mailto:hello@nexusmethod.ai"
                      style={{ color: "#c0392b", textDecoration: "underline" }}
                    >
                      hello@nexusmethod.ai
                    </a>{" "}
                    and I&apos;ll get right back to you.
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {form.disclaimer}
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

function FormField({ label, name, type, required, placeholder }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium"
        style={{
          fontSize: "13px",
          letterSpacing: "0.04em",
          color: "var(--text-secondary)",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full"
        style={{
          height: "48px",
          padding: "0 16px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border-default)",
          backgroundColor: "var(--bg-surface-raised)",
          fontSize: "16px",
          color: "var(--text-primary)",
          outline: "none",
          transition: `border-color var(--motion-duration-fast) var(--motion-ease-default)`,
          fontFamily: "var(--font-family-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-focus)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-default)")
        }
      />
    </div>
  );
}
