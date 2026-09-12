/**
 * Les films — le versant cinéma de la maison.
 *
 * `poster` pointe vers `public/plates/`. `source` reste vide tant qu'aucun
 * fichier vidéo n'est fourni : le lecteur affiche alors la plaque seule,
 * sans bouton de lecture trompeur. Renseigner une URL (MP4, Vimeo, Mux)
 * active la lecture.
 */

export type Film = {
  slug: string;
  titre: string;
  couple: string;
  lieu: string;
  duree: string;
  annee: string;
  format: string;
  note: string;
  poster: string;
  posterAlt: string;
  source?: string;
};

export const films: Film[] = [
  {
    slug: "la-lumiere-de-juin",
    titre: "La lumière de juin",
    couple: "Camille & Aurélien",
    lieu: "Luberon",
    duree: "7'12",
    annee: "2025",
    format: "2.39:1 — 4K",
    note: "Trois jours en Provence, montés comme un court-métrage. Son direct, aucune musique ajoutée avant la dernière minute.",
    poster: "/plates/film-juin.jpg",
    posterAlt: "Image de film : cour de domaine provençal en fin de journée",
  },
  {
    slug: "mezzogiorno",
    titre: "Mezzogiorno",
    couple: "Inès & Gabriel",
    lieu: "Pouilles",
    duree: "11'04",
    annee: "2024",
    format: "1.85:1 — 4K",
    note: "Un été italien traité au grain, à la chaleur et au silence. Le montage suit la course du soleil plutôt que le programme de la journée.",
    poster: "/plates/film-mezzogiorno.jpg",
    posterAlt: "Image de film : mur de chaux blanche et ombre tranchée",
  },
  {
    slug: "nocturne",
    titre: "Nocturne",
    couple: "Léa & Victor",
    lieu: "Paris",
    duree: "5'48",
    annee: "2024",
    format: "2.39:1 — 4K",
    note: "Un mariage d'hiver filmé presque entièrement à la lumière existante. Lustres, phares, vitrines.",
    poster: "/plates/film-nocturne.jpg",
    posterAlt: "Image de film : rue parisienne de nuit",
  },
  {
    slug: "atlantique",
    titre: "Atlantique",
    couple: "Alix & Nils",
    lieu: "Comporta",
    duree: "6'21",
    annee: "2024",
    format: "1.66:1 — 16 mm",
    note: "Tourné en partie en pellicule 16 mm. Vingt-deux invités, quatre jours, aucune consigne donnée.",
    poster: "/plates/film-atlantique.jpg",
    posterAlt: "Image de film : dune et océan dans la brume",
  },
];

/** Le procédé, énoncé en quatre mouvements. */
export const procedeFilm = [
  {
    index: "I",
    titre: "Le repérage",
    texte:
      "Je visite les lieux avant vous, à l'heure exacte de la célébration. La lumière d'un lieu n'est jamais une surprise — elle se calcule.",
  },
  {
    index: "II",
    titre: "La prise de vue",
    texte:
      "Deux opérateurs, des focales fixes, aucun éclairage ajouté tant que la lumière naturelle tient. Le son est enregistré en direct, sur trois sources.",
  },
  {
    index: "III",
    titre: "L'étalonnage",
    texte:
      "Chaque film reçoit une colorimétrie construite pour lui, inspirée d'une émulsion argentique que je choisis au repérage. Aucun réglage appliqué par défaut.",
  },
  {
    index: "IV",
    titre: "La livraison",
    texte:
      "Un film principal, un format court, les rushes conservés dix ans. Livrés sur une page privée, et sur support physique gravé.",
  },
];
