import Link from "next/link";
import { siteConfig } from "../config/site";

const allSocialLinks = [
  { label: "Instagram", key: "instagram" as const },
  { label: "TikTok", key: "tiktok" as const },
  { label: "YouTube", key: "youtube" as const },
  { label: "Facebook", key: "facebook" as const },
];

/** Filtrera bort sociala länkar som saknar URL */
const socialLinks = allSocialLinks
  .map(({ label, key }) => ({ label, href: siteConfig.social[key] }))
  .filter((link): link is { label: string; href: string } => !!link.href);

const policyLinks = [
  { label: "Integritetspolicy", href: "/integritetspolicy" },
  { label: "Villkor", href: "/villkor" },
  { label: "Retur", href: "/retur" },
  { label: "Frakt", href: "/frakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-sand">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-ink"
            >
              {siteConfig.siteName}
            </Link>
            <p className="mt-2 text-sm text-ink-muted">
              Medvetna val för en renare framtid.
            </p>
          </div>

          {/* Social – visas bara om minst en länk är konfigurerad */}
          {socialLinks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Sociala medier
              </h3>
              <ul className="mt-3 space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted transition-colors hover:text-sage-dark"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Information
            </h3>
            <ul className="mt-3 space-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-sage-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-soft pt-6 text-center text-sm text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.siteName}. Alla rättigheter
          förbehållna.
        </div>
      </div>
    </footer>
  );
}
