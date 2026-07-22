"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import { nav, BOOK_URL } from "@/content";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "72px",
          backgroundColor: scrolled
            ? "rgba(26, 31, 46, 0.92)"
            : "rgba(26, 31, 46, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-dark)" : "none",
          transition: `background-color var(--motion-duration-base) var(--motion-ease-default),
                       border-color var(--motion-duration-base) var(--motion-ease-default)`,
        }}
      >
        <div
          className="max-w-[1200px] mx-auto h-full flex items-center justify-between"
          style={{ padding: "0 var(--spacing-section-x)" }}
        >
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <Logo size={28} variant="dark" />
            <span
              className="font-semibold tracking-tight"
              style={{
                fontSize: "15px",
                color: "var(--text-inverse)",
                fontFamily: "var(--font-family-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {nav.logo}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--text-inverse-muted)",
                  textDecoration: "none",
                  lineHeight: 1,
                  transition: `color var(--motion-duration-base) var(--motion-ease-default)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-inverse-muted)")
                }
              >
                {link.label}
              </Link>
            ))}

            {/* Copper pill CTA */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-semibold"
              style={{
                fontSize: "15px",
                padding: "10px 22px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent-bg)",
                color: "var(--accent-text)",
                textDecoration: "none",
                lineHeight: 1,
                transition: `background-color var(--motion-duration-base) var(--motion-ease-default)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-bg)")
              }
            >
              {nav.cta} →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-inverse)" }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 5L5 17M5 5l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 7h16M3 11h16M3 15h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--bg-inverse)" }}
        >
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="font-semibold"
              style={{
                fontSize: "28px",
                color: "var(--text-inverse)",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="inline-flex items-center font-semibold mt-4"
            style={{
              fontSize: "18px",
              padding: "16px 36px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--accent-bg)",
              color: "var(--accent-text)",
              textDecoration: "none",
            }}
          >
            {nav.cta} →
          </a>
        </div>
      )}
    </>
  );
}
