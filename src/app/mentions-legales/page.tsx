import type { Metadata } from "next";
import { Filet } from "@/components/editorial";
import { legal, maison } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité.",
  robots: { index: false, follow: true },
};

/**
 * Page légale.
 *
 * Les informations viennent de `legal` et `maison` dans src/content/site.ts.
 * Ce qui reste entre crochets est encore à renseigner — aujourd'hui, la
 * seule chose manquante est l'adresse postale de l'hébergeur, à recopier
 * depuis ses propres mentions légales.
 */
const sections = [
  {
    titre: "Éditeur",
    contenu: [
      `${maison.nom} — ${maison.discipline}`,
      legal.formeJuridique,
      legal.adresse,
      `SIRET ${legal.siret}`,
      legal.tva,
      `Courriel : ${maison.email}`,
      `Téléphone : ${maison.telephone}`,
      `Directeur de la publication : ${legal.directeurPublication}`,
    ],
  },
  {
    titre: "Hébergement",
    contenu: [legal.hebergeur, legal.hebergeurAdresse],
  },
  {
    titre: "Propriété intellectuelle",
    contenu: [
      "L'ensemble des photographies, films, textes et éléments graphiques présents sur ce site est protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
      "Les images publiées le sont avec l'accord écrit des personnes représentées.",
    ],
  },
  {
    titre: "Données personnelles",
    contenu: [
      "Le formulaire de contact de ce site n'enregistre aucune donnée : il compose un courriel dans votre propre messagerie. Aucune information n'est transmise à un tiers, aucun traceur publicitaire n'est déposé.",
      `Les échanges par courriel sont conservés le temps nécessaire au traitement de la demande, puis à des fins d'archivage contractuel. Vous disposez d'un droit d'accès, de rectification et d'effacement en écrivant à ${maison.email}.`,
    ],
  },
  {
    titre: "Cookies",
    contenu: [
      "Ce site ne dépose aucun cookie de mesure d'audience ni de publicité.",
    ],
  },
];

export default function MentionsLegales() {
  return (
    <section className="frame pt-40 pb-[var(--spacing-section)] md:pt-48">
      <p className="label text-greige">Informations</p>
      <h1 className="mt-8 text-[length:var(--text-h2)] leading-none">
        Mentions légales
      </h1>

      <Filet className="mt-16 text-ink" />

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {sections.map((s) => (
          <section key={s.titre}>
            <h2 className="text-[length:var(--text-h3)] leading-none">
              {s.titre}
            </h2>
            <div className="mt-6 space-y-3 text-ardoise">
              {s.contenu.map((ligne) => (
                <p key={ligne.slice(0, 30)}>{ligne}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
