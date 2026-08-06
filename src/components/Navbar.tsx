import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { navItems } from "../../config/navigation";
import { siteConfig } from "../config/site";

export default function Navbar() {
  const rawPatreonUrl = siteConfig.support.patreonUrl?.trim() ?? "";
  let patreonUrl = "";
  try {
    const parsed = new URL(rawPatreonUrl);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      patreonUrl = rawPatreonUrl;
    }
  } catch {
    // invalid or empty URL – leave patreonUrl as ""
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft/60 bg-warm-white/90 backdrop-blur-md shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-ink transition-colors hover:text-clay"
        >
          <Image
            src="/images/Logotyp.jpg"
            alt="Cleanconscience logotyp"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span>{siteConfig.siteName}</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-light transition-colors hover:bg-sage-light hover:text-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/40"
                >
                  {item.label}
                  <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-[12rem] rounded-xl border border-border-soft bg-warm-white p-1.5 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-light transition-colors hover:bg-sage-light hover:text-sage-dark"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-light transition-colors hover:bg-sage-light hover:text-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/40"
              >
                {item.label}
              </Link>
            )
          )}
          {patreonUrl && (
            <a
              href={patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Stötta
            </a>
          )}
        </nav>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
