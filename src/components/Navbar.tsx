import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { navItems } from "../../config/navigation";
import { siteConfig } from "../config/site";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-warm-white/95 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-ink hover:text-sage"
        >
          {siteConfig.siteName}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-light transition-colors hover:bg-sage-light hover:text-sage-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </header>
  );
}
