"use client";

import { useState } from "react";
import Link from "next/link";

// Primary CTA link — swap to Calendly URL when confirmed (OQ-7)
const BOOK_URL = "https://calendly.com/molly-nexusmethod/discovery-call";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-brand-surface)]/95 backdrop-blur-sm border-b border-[var(--color-brand-border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg text-[var(--color-brand-primary)] tracking-tight">
          Nexus Method
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-brand-secondary)]">
          <Link href="#about" className="hover:text-[var(--color-brand-primary)] transition-colors">
            About
          </Link>
          <Link href="#method" className="hover:text-[var(--color-brand-primary)] transition-colors">
            The Method
          </Link>
          <Link href="#services" className="hover:text-[var(--color-brand-primary)] transition-colors">
            Services
          </Link>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-[var(--color-brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book a Call →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[var(--color-brand-secondary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-brand-surface)] border-t border-[var(--color-brand-border)] px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="#about" onClick={() => setMobileOpen(false)} className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]">
            About
          </Link>
          <Link href="#method" onClick={() => setMobileOpen(false)} className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]">
            The Method
          </Link>
          <Link href="#services" onClick={() => setMobileOpen(false)} className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]">
            Services
          </Link>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-md bg-[var(--color-brand-accent)] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Book a Call →
          </a>
        </div>
      )}
    </header>
  );
}
