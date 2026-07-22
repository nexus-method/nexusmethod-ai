import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Method from "@/components/sections/method";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Contact, { FooterCta } from "@/components/sections/contact";
import { footer } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Method />
      <Services />
      <About />
      <Contact />
      <FooterCta />

      {/* Footer bar */}
      <footer
        style={{
          backgroundColor: "var(--bg-inverse)",
          borderTop: "1px solid var(--border-dark)",
        }}
      >
        <div
          className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            padding: "24px var(--spacing-section-x)",
            fontSize: "13px",
            color: "var(--text-inverse-muted)",
          }}
        >
          <p>{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nm-footer-link"
                style={{
                  color: "var(--text-inverse-muted)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
