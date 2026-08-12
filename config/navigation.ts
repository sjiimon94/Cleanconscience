export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  { label: "Start", href: "/" },
  {
    label: "Utforska",
    href: "/utforska",
    children: [
      { label: "Produkter", href: "/utforska/produkter" },
      { label: "Vattenfilter", href: "/utforska/vattenfilter" },
      { label: "Kurser", href: "/kurser" },
      { label: "Podcast", href: "/podcast" },
      { label: "Publiceringar", href: "/utforska/publiceringar" },
    ],
  },
  { label: "Socialt", href: "/socialt" },
  { label: "Om", href: "/om" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Stöd", href: "/stod" },
];
