import Link from "next/link";
import { EMAIL } from "@/content";

export const metadata = {
  title: "Privacy Policy — Nexus Method",
  description:
    "How Nexus Method LLC collects, uses, and protects the information you share through nexusmethod.ai.",
};

const UPDATED = "July 23, 2026";

export default function PrivacyPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--bg-page)",
        minHeight: "100vh",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "760px", padding: "0 var(--spacing-section-x)" }}
      >
        <Link
          href="/"
          style={{
            fontSize: "14px",
            color: "var(--accent-default)",
            textDecoration: "none",
          }}
        >
          ← Back to nexusmethod.ai
        </Link>

        <h1
          className="font-bold"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            margin: "24px 0 8px",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "40px" }}>
          Last updated {UPDATED}
        </p>

        <Section title="Who we are">
          Nexus Method is operated by Nexus Method LLC, a single-member company
          based in Austin, Texas. This policy explains what information we
          collect through nexusmethod.ai, how we use it, and the choices you
          have. Questions? Email us at{" "}
          <a href={`mailto:${EMAIL}`} style={link}>
            {EMAIL}
          </a>
          .
        </Section>

        <Section title="Information we collect">
          <ul style={ul}>
            <li style={li}>
              <strong>What you send us.</strong> When you submit the contact
              form, you share your name, email address, optionally your company,
              and the message you write. When you book a discovery call or an AI
              Readiness Assessment, our scheduling provider collects the details
              you enter to confirm the meeting.
            </li>
            <li style={li}>
              <strong>Payment information.</strong> If you purchase the AI
              Readiness Assessment, payment is processed by Stripe. We never see
              or store your full card number; Stripe handles that directly.
            </li>
            <li style={li}>
              <strong>Usage data.</strong> We use privacy-respecting analytics to
              understand how the site is used (pages viewed, general location,
              device type). We do not sell this data.
            </li>
          </ul>
        </Section>

        <Section title="How we use it">
          <ul style={ul}>
            <li style={li}>To respond to your inquiry and follow up about working together.</li>
            <li style={li}>To schedule, confirm, and prepare for calls and assessments.</li>
            <li style={li}>To process payment for services you purchase.</li>
            <li style={li}>To improve the site and understand what content is useful.</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            We do not sell your personal information, and we do not use it for
            advertising to third parties.
          </p>
        </Section>

        <Section title="Service providers">
          We rely on a small set of trusted providers to run the business:
          Calendly (scheduling), Stripe (payments), Google Meet (video calls),
          Vercel (hosting), and ClickUp (managing inquiries). Each processes your
          information only to provide their service to us.
        </Section>

        <Section title="How long we keep it">
          We keep inquiry and client information for as long as needed to serve
          you and to meet legal and accounting obligations, then delete or
          anonymize it. You can ask us to delete your information at any time.
        </Section>

        <Section title="Your choices">
          You can ask us to access, correct, or delete the personal information
          we hold about you. Email{" "}
          <a href={`mailto:${EMAIL}`} style={link}>
            {EMAIL}
          </a>{" "}
          and we will respond promptly.
        </Section>

        <Section title="Changes to this policy">
          We may update this policy as the business grows. When we do, we will
          revise the date at the top of this page.
        </Section>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "48px" }}>
          Nexus Method LLC · Austin, TX ·{" "}
          <a href={`mailto:${EMAIL}`} style={link}>
            {EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}

const link = { color: "var(--accent-default)", textDecoration: "underline" };
const ul = { margin: 0, padding: 0, listStyle: "none" as const };
const li = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--text-secondary)",
  marginBottom: "14px",
  paddingLeft: "18px",
  position: "relative" as const,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2
        className="font-semibold"
        style={{
          fontSize: "20px",
          color: "var(--text-primary)",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-secondary)" }}>
        {children}
      </div>
    </section>
  );
}
