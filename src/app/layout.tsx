import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cleanconscience",
    template: "%s | Cleanconscience",
  },
  description: "Cleanconscience – medvetna val för en renare framtid.",
  openGraph: {
    title: "Cleanconscience",
    description: "Cleanconscience – medvetna val för en renare framtid.",
    locale: "sv_SE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
