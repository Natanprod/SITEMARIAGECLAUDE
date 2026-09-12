import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Jost } from "next/font/google";
import "./globals.css";
import { Ouverture } from "@/components/ouverture";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { maison } from "@/content/site";

/**
 * Alfa Slab One — la police de la maison : logotype, chiffres, mots
 * isolés mis en exergue. Elle n'existe qu'en un seul gras et ne doit
 * jamais servir de texte courant.
 */
const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alfa",
});

/**
 * Glacial Indifference n'est pas distribuée par Google Fonts. Jost, dessinée
 * sur les mêmes bases géométriques (la filiation Futura), la remplace ici
 * et s'efface automatiquement si la vraie fonte est installée : la pile CSS
 * déclare « Glacial Indifference » en premier (voir --font-sans).
 * Pour l'installer : déposer les .woff2 et basculer sur next/font/local.
 */
const glacial = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-glacial",
  weight: ["300", "400", "500"],
});

const url = "https://nathanmathieu.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${maison.nom} — ${maison.discipline}`,
    template: `%s — ${maison.nom}`,
  },
  description:
    "Maison d'image dédiée au mariage : photographie éditoriale et films de célébration, conçus comme des œuvres. Paris, France et à l'étranger. Douze mariages par an.",
  keywords: [
    "photographe de mariage haut de gamme",
    "vidéaste de mariage",
    "film de mariage",
    "photographie éditoriale",
    "mariage de luxe",
    "Paris",
  ],
  authors: [{ name: maison.nom }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url,
    siteName: maison.nom,
    title: `${maison.nom} — ${maison.discipline}`,
    description: maison.baseline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16130f",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${alfa.variable} ${glacial.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <Ouverture />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
