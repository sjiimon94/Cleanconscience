import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../config/site";

const socialLinks = [
  { label: "Instagram", key: "instagram" as const },
  { label: "TikTok", key: "tiktok" as const },
  { label: "YouTube", key: "youtube" as const },
  { label: "Facebook", key: "facebook" as const },
]
  .map(({ label, key }) => ({ label, href: siteConfig.social[key] }))
  .filter((link): link is { label: string; href: string } => !!link.href);

const footerColumns = [
  {
    title: "Utforska",
    links: [
      { label: "Produkter", href: "/utforska/produkter" },
      { label: "Vattenfilter", href: "/utforska/vattenfilter" },
      { label: "Kurser", href: "/kurser" },
      { label: "Podcast", href: "/podcast" },
      { label: "Publiceringar", href: "/utforska/publiceringar" },
    ],
  },
  {
    title: "Hjälp",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Villkor", href: "/villkor" },
    ],
  },
  {
    title: "Om",
    links: [
      { label: "Om Cecilia", href: "/om" },
      { label: "Socialt", href: "/socialt" },
      { label: "Stöd projektet", href: "/stod" },
      { label: "Integritetspolicy", href: "/integritetspolicy" },
    ],
  },
];

export default function Footer() {
  const patreonUrl = siteConfig.support.patreonUrl?.trim();

  return (
    <footer className="border-t border-border-soft">
      <div className="bg-sand/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Brand row */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-ink transition-colors hover:text-clay"
              >
                <Image
                  src="/images/Logotyp.jpg"
                  alt="Cleanconscience logotyp"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span>{siteConfig.siteName}</span>
              </Link>
              <p className="mt-2 max-w-xs text-sm text-ink-muted">
                Medvetna val för en renare framtid.
              </p>
            </div>
            {/* Social links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-sage-dark"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 border-y border-border-soft/80 py-10 md:grid-cols-2 xl:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink/90">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
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
            ))}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink/90">
                Stötta
              </h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/stod"
                  className="inline-flex items-center rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
                >
                  Stötta projektet
                </Link>
                {patreonUrl && (
                  <a
                    href={patreonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-ink-muted transition-colors hover:text-sage-dark"
                  >
                    Patreon ↗
                  </a>
                )}
                <a
                  href="https://www.ecofilterofsweden.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-ink-muted transition-colors hover:text-sage-dark"
                >
                  Ecofilters of Sweden ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 text-sm text-ink-muted">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p>© {new Date().getFullYear()} cleanconscience AB · Org.nr 559163-8712</p>
                <p>
                  Lendahlsgatan 13, 441 31 Alingsås ·{" "}
                  <a
                    href="mailto:cecilia@strandevall.se"
                    className="transition-colors hover:text-sage-dark"
                  >
                    cecilia@strandevall.se
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/broderna-strandevall.svg"
                  alt="Bröderna Strandevall logotyp"
                  width={100}
                  height={28}
                  className="h-auto w-[100px]"
                />
                <span>Skapad av Bröderna Strandevall</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
