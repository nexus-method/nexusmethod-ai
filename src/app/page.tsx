import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Method from "@/components/sections/method";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Method />
      <Services />
      <About />
      <Contact />
      <footer className="py-8 bg-[var(--color-brand-primary)] text-[var(--color-brand-muted)] text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Nexus Method. All rights reserved.</p>
          <p>
            <a href="mailto:molly@nexusmethod.ai" className="hover:text-white transition-colors">
              molly@nexusmethod.ai
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
