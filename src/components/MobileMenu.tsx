"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "../../config/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Stäng meny" : "Öppna meny"}
        aria-expanded={open}
        className="inline-flex items-center justify-center rounded-lg p-2 text-ink-light hover:bg-sage-light hover:text-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sage"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-border-soft bg-warm-white shadow-lg">
          <nav className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    onClick={() =>
                      setExpandedMenu(expandedMenu === item.href ? null : item.href)
                    }
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-ink-light hover:bg-sage-light hover:text-sage-dark"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${expandedMenu === item.href ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {expandedMenu === item.href && (
                    <div className="ml-3 space-y-1 border-l-2 border-sage-light pl-3">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-1.5 text-sm font-medium text-ink-light hover:bg-sage-light hover:text-sage-dark"
                      >
                        Översikt
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-sm text-ink-light hover:bg-sage-light hover:text-sage-dark"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-ink-light hover:bg-sage-light hover:text-sage-dark"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
