/**
 * Les histoires — le portfolio éditorial.
 *
 * Chaque plaque (`plate`) pointe vers un fichier de `public/plates/`.
 * Pour installer les vraies photographies : déposer les fichiers dans
 * `public/plates/` sous le même nom, ou changer le chemin ici. Les ratios
 * déclarés servent au calcul de mise en page et évitent tout décalage.
 */

export type Ratio = "portrait" | "paysage" | "carre" | "cinema" | "colonne";

export const ratios: Record<Ratio, { w: number; h: number }> = {
  portrait: { w: 1000, h: 1400 },
  paysage: { w: 1400, h: 1000 },
  carre: { w: 1200, h: 1200 },
  cinema: { w: 1600, h: 686 },
  colonne: { w: 900, h: 1600 },
};

export type Plate = {
  src: string;
  alt: string;
  ratio: Ratio;
};

export type Story = {
  slug: string;
  couple: string;
  titre: string;
  lieu: string;
  region: string;
  saison: string;
  annee: string;
  /** Une ligne, en exergue, sur la page d'index */
  exergue: string;
  /** Le récit — deux à trois paragraphes, ton éditorial */
  recit: string[];
  prestations: string[];
  couverture: Plate;
  planches: Plate[];
};

export const stories: Story[] = [
  {
    slug: "camille-aurelien",
    couple: "Camille & Aurélien",
    titre: "La lumière de juin",
    lieu: "Domaine de Fontenille",
    region: "Luberon",
    saison: "Juin",
    annee: "2025",
    exergue:
      "Trois jours en Provence, une maison ouverte, et la certitude que le vrai sujet n'était pas la cérémonie.",
    recit: [
      "Il y a des mariages qui se jouent dans les marges. Celui-ci tenait dans la pénombre d'une cuisine à sept heures du matin, dans le geste d'une mère qui reprend un ourlet, dans le silence d'un père avant de traverser la cour.",
      "Nous avons photographié trois jours comme on tourne un film : en repérant la lumière avant les visages, en laissant les scènes arriver plutôt qu'en les provoquant. Le domaine faisait le reste — une architecture sèche, des murs chauds, une ombre nette à midi.",
      "Le tirage final compte quatre-vingts images et un film de sept minutes. Rien n'y est mis en scène, et pourtant tout y est composé.",
    ],
    prestations: ["Reportage trois jours", "Film 7 minutes", "Tirages d'art"],
    couverture: {
      src: "/plates/camille-couverture.jpg",
      alt: "Façade de pierre du domaine, lumière rasante de fin d'après-midi",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/camille-01.jpg",
        alt: "Intérieur sombre, embrasure de porte ouverte sur la cour",
        ratio: "portrait",
      },
      {
        src: "/plates/camille-02.jpg",
        alt: "Table dressée sous les platanes, nappe froissée par le vent",
        ratio: "paysage",
      },
      {
        src: "/plates/camille-03.jpg",
        alt: "Détail d'étoffe, lumière de fin de journée",
        ratio: "carre",
      },
      {
        src: "/plates/camille-04.jpg",
        alt: "Silhouettes de la fête au crépuscule",
        ratio: "cinema",
      },
    ],
  },
  {
    slug: "josephine-tom",
    couple: "Joséphine & Tom",
    titre: "Une maison de famille",
    lieu: "Château de Villette",
    region: "Île-de-France",
    saison: "Septembre",
    annee: "2025",
    exergue:
      "Quatre générations sous le même toit, et la question de savoir ce qu'on garde d'une journée.",
    recit: [
      "La commande était simple : photographier la maison autant que le mariage. Les murs, les couloirs, les chambres où l'on se prépare, l'escalier qu'on descend une fois dans sa vie en robe.",
      "Nous avons travaillé en argentique pour une partie du reportage — la matière du grain, la lenteur qu'elle impose, la manière dont elle oblige à choisir. Vingt-quatre poses par heure, pas davantage.",
      "Ce qui reste : un ensemble tenu, sans bavardage, qui ressemble moins à un mariage qu'à un portrait de famille étendu sur une journée.",
    ],
    prestations: ["Reportage deux jours", "Argentique moyen format", "Album relié main"],
    couverture: {
      src: "/plates/josephine-couverture.jpg",
      alt: "Enfilade de pièces claires, parquet ancien",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/josephine-01.jpg",
        alt: "Escalier de pierre, main courante en fer forgé",
        ratio: "colonne",
      },
      {
        src: "/plates/josephine-02.jpg",
        alt: "Portrait de groupe dans le parc, fin de matinée",
        ratio: "paysage",
      },
      {
        src: "/plates/josephine-03.jpg",
        alt: "Fenêtre à petits carreaux, contre-jour",
        ratio: "portrait",
      },
      {
        src: "/plates/josephine-04.jpg",
        alt: "Salle de réception au moment du discours",
        ratio: "paysage",
      },
    ],
  },
  {
    slug: "ines-gabriel",
    couple: "Inès & Gabriel",
    titre: "Le sud absolu",
    lieu: "Masseria",
    region: "Pouilles, Italie",
    saison: "Juillet",
    annee: "2024",
    exergue: "Chaux blanche, oliviers, quarante degrés à l'ombre et rien à cacher.",
    recit: [
      "Une semaine dans les Pouilles, avec la contrainte la plus difficile qui soit : une lumière violente, sans nuance, du lever au coucher.",
      "Nous avons construit le reportage autour de cette dureté au lieu de la corriger. Les ombres portées deviennent une écriture, le blanc des murs un fond de studio, la sieste une scène à part entière.",
      "Le film tourné à cette occasion a la texture d'un long-métrage italien des années soixante-dix. C'était le projet dès le premier repérage.",
    ],
    prestations: ["Reportage destination", "Film 11 minutes", "Direction artistique"],
    couverture: {
      src: "/plates/ines-couverture.jpg",
      alt: "Mur de chaux blanche sous un soleil d'été, ombre tranchée",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/ines-01.jpg",
        alt: "Oliviers centenaires dans la chaleur de midi",
        ratio: "paysage",
      },
      {
        src: "/plates/ines-02.jpg",
        alt: "Silhouette dans un couloir voûté",
        ratio: "portrait",
      },
      {
        src: "/plates/ines-03.jpg",
        alt: "Table de banquet en extérieur, fin de journée",
        ratio: "carre",
      },
      {
        src: "/plates/ines-04.jpg",
        alt: "Bord de piscine à l'heure bleue",
        ratio: "cinema",
      },
    ],
  },
  {
    slug: "elsa-marc",
    couple: "Elsa & Marc",
    titre: "Sur la Méditerranée",
    lieu: "Cap-Ferrat",
    region: "Côte d'Azur",
    saison: "Mai",
    annee: "2025",
    exergue: "Une villa, une terrasse, et cent vingt invités qu'il fallait rendre invisibles.",
    recit: [
      "Le défi d'un grand mariage n'est pas le nombre : c'est de retrouver, dans la foule, les deux personnes qui en sont la raison.",
      "Nous travaillons alors en focales longues, à distance, sans jamais interrompre. L'intimité se gagne par l'éloignement, pas par la proximité.",
      "Le reportage alterne les plans larges — la mer, la terrasse, l'architecture — et des portraits pris à deux mètres, sans un mot échangé.",
    ],
    prestations: ["Reportage deux jours", "Second opérateur", "Film 9 minutes"],
    couverture: {
      src: "/plates/elsa-couverture.jpg",
      alt: "Terrasse ouverte sur la Méditerranée en fin d'après-midi",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/elsa-01.jpg",
        alt: "Pins parasols découpés sur le ciel",
        ratio: "portrait",
      },
      {
        src: "/plates/elsa-02.jpg",
        alt: "Escalier de villa descendant vers l'eau",
        ratio: "paysage",
      },
      {
        src: "/plates/elsa-03.jpg",
        alt: "Détail de verrerie sur nappe de lin",
        ratio: "carre",
      },
      {
        src: "/plates/elsa-04.jpg",
        alt: "Dîner au crépuscule, lumière de bougies",
        ratio: "cinema",
      },
    ],
  },
  {
    slug: "lea-victor",
    couple: "Léa & Victor",
    titre: "Un hôtel particulier",
    lieu: "Paris VIIᵉ",
    region: "Paris",
    saison: "Décembre",
    annee: "2024",
    exergue: "Un mariage d'hiver, en ville, à la lumière des lustres et des vitrines.",
    recit: [
      "Paris en décembre offre quatre heures de lumière exploitable. Le reste se photographie à la nuit tombée, en assumant les hautes sensibilités et le grain qu'elles produisent.",
      "Nous avons transformé cette contrainte en parti pris : un reportage nocturne, contrasté, plus proche du cinéma que du mariage, où les intérieurs dorés répondent au noir des rues.",
      "Trente-deux images retenues sur mille huit cents. C'est notre proportion habituelle.",
    ],
    prestations: ["Reportage une journée", "Traitement basse lumière", "Tirages d'art"],
    couverture: {
      src: "/plates/lea-couverture.jpg",
      alt: "Salon parisien à la lumière des lustres, soir d'hiver",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/lea-01.jpg",
        alt: "Reflet dans un miroir ancien",
        ratio: "portrait",
      },
      {
        src: "/plates/lea-02.jpg",
        alt: "Rue parisienne de nuit sous la pluie",
        ratio: "paysage",
      },
      {
        src: "/plates/lea-03.jpg",
        alt: "Détail d'un bouquet sombre",
        ratio: "carre",
      },
      {
        src: "/plates/lea-04.jpg",
        alt: "Piste de danse en fin de soirée",
        ratio: "cinema",
      },
    ],
  },
  {
    slug: "alix-nils",
    couple: "Alix & Nils",
    titre: "Hors saison",
    lieu: "Comporta",
    region: "Portugal",
    saison: "Octobre",
    annee: "2024",
    exergue: "Vingt-deux personnes, une maison de bois face à l'océan, aucun protocole.",
    recit: [
      "Les mariages les plus petits sont souvent les plus exigeants : il n'y a nulle part où se cacher, aucun effet de masse pour sauver une image.",
      "Nous avons vécu quatre jours avec eux. Les photographies datent surtout des moments où rien ne se passait — le café du matin, la marche vers la plage, la fin de la nuit.",
      "Le résultat est le plus proche de ce que nous cherchons : un document, tenu, sans complaisance, qu'on peut regarder dans trente ans.",
    ],
    prestations: ["Immersion quatre jours", "Argentique", "Film 6 minutes"],
    couverture: {
      src: "/plates/alix-couverture.jpg",
      alt: "Dune et océan atlantique dans la brume du matin",
      ratio: "cinema",
    },
    planches: [
      {
        src: "/plates/alix-01.jpg",
        alt: "Maison de bois, volets ouverts sur la lumière",
        ratio: "paysage",
      },
      {
        src: "/plates/alix-02.jpg",
        alt: "Portrait de dos face à l'océan",
        ratio: "portrait",
      },
      {
        src: "/plates/alix-03.jpg",
        alt: "Table du petit-déjeuner, désordre du matin",
        ratio: "carre",
      },
      {
        src: "/plates/alix-04.jpg",
        alt: "Feu sur la plage à la nuit tombante",
        ratio: "cinema",
      },
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function storyNeighbours(slug: string) {
  const i = stories.findIndex((s) => s.slug === slug);
  if (i === -1) return { precedente: undefined, suivante: undefined };
  return {
    precedente: stories[(i - 1 + stories.length) % stories.length],
    suivante: stories[(i + 1) % stories.length],
  };
}
