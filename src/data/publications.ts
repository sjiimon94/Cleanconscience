/**
 * Publiceringar — datakälla för saker Cecilia har publicerat eller medverkat i.
 *
 * Lägg till en ny post genom att lägga till ett objekt i listan nedan.
 * Minsta krav: `url`. Resten fylls i automatiskt eller kan override:as manuellt.
 *
 * Fält:
 *  - url        (obligatorisk) — länk till originalkällan
 *  - title      (valfri)       — override av automatiskt hämtad titel
 *  - description(valfri)       — kort ingress / beskrivning
 *  - image      (valfri)       — override av OG-bild (sökväg eller URL)
 *  - type       (valfri)       — etikett, t.ex. "Artikel", "Poddgästspel", "Video"
 *  - date       (valfri)       — YYYY-MM-DD
 *  - outlet     (valfri)       — källans namn, t.ex. "SVT", "Expressen"
 */

export interface Publication {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
  outlet?: string;
}

/**
 * Lägg till nya publiceringar här — senaste överst.
 */
export const publications: Publication[] = [
  {
    url: "https://example.com/artikel-medvetna-val",
    title: "Gästtext: Medvetna val i vardagen",
    description:
      "En text om hur små vardagsbeslut kan skapa långsiktig förändring för familj och hälsa.",
    type: "Artikel",
    date: "2025-11-04",
    outlet: "Extern publikation",
  },
  {
    url: "https://example.org/barns-halsa",
    title: "Samtalstext om barns hälsa och trygghet",
    description:
      "Medverkan i en längre text där perspektiv på barns hälsa och föräldraskap sammanfattas.",
    type: "Artikel",
    date: "2025-07-18",
    outlet: "Extern plattform",
  },
];
