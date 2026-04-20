import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { navItems } from "../../config/navigation";
import { siteConfig } from "../config/site";

export default function Navbar() {
  const patreonUrl = siteConfig.support.patreonUrl?.trim();

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-light transition-colors hover:bg-sage-light hover:text-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/40"
            >
              {item.label}
            </Link>
          ))}
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

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </header>
  );
}
