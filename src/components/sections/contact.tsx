// OQ-7: Replace BOOK_URL with actual Calendly link when confirmed.
// Contact form is a static HTML form; wire to Formspree / n8n webhook for production.
// FORM_ENDPOINT placeholder — update before launch.

const BOOK_URL = "https://calendly.com/molly-nexusmethod/discovery-call";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[var(--color-brand-surface)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — primary CTA */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] leading-tight mb-6">
              Let&apos;s find out if this is a fit.
            </h2>
            <p className="text-[var(--color-brand-secondary)] text-lg leading-relaxed mb-8">
              If you&apos;re wondering whether Nexus Method is right for your business, a 30-minute call
              is how we find out. I respond same day to strong-fit inquiries.
            </p>

            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[var(--color-brand-accent)] text-white font-semibold text-base hover:opacity-90 transition-opacity mb-8"
            >
              Book a Discovery Call (30 min) →
            </a>

            <div className="space-y-3 text-sm text-[var(--color-brand-secondary)]">
              <p>📍 Austin, TX — working with remote-first businesses nationwide</p>
              <p>📬 <a href="mailto:molly@nexusmethod.ai" className="underline hover:text-[var(--color-brand-primary)]">molly@nexusmethod.ai</a></p>
            </div>
          </div>

          {/* Right — secondary contact form */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-6">
              Not ready for a call? Send a note.
            </h3>

            {/* Wire to Formspree or n8n webhook before launch — update action URL */}
            <form
              action="#"
              method="POST"
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-primary)] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-md border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-primary)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-md border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-primary)] mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-3 rounded-md border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-primary)] mb-1.5">
                  What are you dealing with?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-md border border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent resize-none"
                  placeholder="Tell me what's broken, stuck, or holding you back. The more specific, the better."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-md border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] font-semibold text-sm hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors"
              >
                Send →
              </button>

              <p className="text-xs text-[var(--color-brand-muted)]">
                I read every message and respond within 24 hours to strong-fit inquiries.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
