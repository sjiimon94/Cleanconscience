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
    title: "Resurser",
    links: [
      { label: "Podcast", href: "/podcast" },
      { label: "Kurser", href: "/kurser" },
      { label: "Skrifter", href: "/blogg" },
      { label: "Butik", href: "/butik" },
    ],
  },
  {
    title: "Hjälp",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Frakt", href: "/frakt" },
      { label: "Retur", href: "/retur" },
      { label: "Villkor", href: "/villkor" },
    ],
  },
  {
    title: "Om",
    links: [
      { label: "Om Cecilia", href: "/om" },
      { label: "Socialt", href: "/socialt" },
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
                {patreonUrl && (
                  <a
                    href={patreonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
                  >
                    Stötta på Patreon
                  </a>
                )}
                {socialLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-ink-muted transition-colors hover:text-sage-dark"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-deep-forest text-warm-white/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-warm-white"
              >
                <Image
                  src="/images/Logotyp.jpg"
                  alt="Cleanconscience logotyp"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <span>{siteConfig.siteName}</span>
              </Link>
              <p className="mt-2 max-w-md text-sm text-warm-white/60">
                Medvetna val för en renare framtid.
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-white/60 transition-colors hover:text-clay-light"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-warm-white/10 pt-6 text-sm text-warm-white/40">
            © {new Date().getFullYear()} {siteConfig.siteName}. Alla rättigheter
            förbehållna.
          </div>
        </div>
      </div>

      <div className="border-t border-border-soft bg-warm-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-5 text-center sm:flex-row sm:gap-4 sm:px-6 lg:px-8">
          <Image
            src="/images/broderna-strandevall.svg"
            alt="Bröderna Strandevall logotyp"
            width={120}
            height={32}
            className="h-auto w-[120px]"
          />
          <p className="text-sm text-ink-muted">
            Hemsidan skapad och underhållen av Bröderna Strandevall
          </p>
        </div>
      </div>
    </footer>
  );
}
