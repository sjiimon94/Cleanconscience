export interface ExternalWriting {
  title: string;
  outlet: string;
  url: string;
  date?: string;
  description?: string;
}

export const externalWritings: ExternalWriting[] = [
  {
    title: "Gästtext: Medvetna val i vardagen",
    outlet: "Extern publikation",
    date: "2025-11-04",
    url: "https://example.com",
    description:
      "En text om hur små vardagsbeslut kan skapa långsiktig förändring för familj och hälsa.",
  },
  {
    title: "Samtalstext om barns hälsa och trygghet",
    outlet: "Extern plattform",
    date: "2025-07-18",
    url: "https://example.org",
    description:
      "Medverkan i en längre text där perspektiv på barns hälsa och föräldraskap sammanfattas.",
  },
];
