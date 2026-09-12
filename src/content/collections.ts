/**
 * L'Expérience — collections, déroulé de l'accompagnement, questions.
 * Les montants sont des points de départ : ils annoncent un niveau,
 * ils ne tiennent pas lieu de devis.
 */

export type Collection = {
  index: string;
  nom: string;
  intitule: string;
  apartir: string;
  description: string;
  inclus: string[];
  mention?: string;
};

export const collections: Collection[] = [
  {
    index: "I",
    nom: "Collection I",
    intitule: "Le Reportage",
    apartir: "4 200 €",
    description:
      "La photographie seule, menée de la préparation à la fin de la soirée. Pour les célébrations d'une journée, en France.",
    inclus: [
      "Présence de 10 heures",
      "Repérage du lieu en amont",
      "400 à 600 images retenues et étalonnées",
      "Galerie privée haute définition",
      "Tirages fine art — dix planches",
      "Cession des droits d'usage privé",
    ],
  },
  {
    index: "II",
    nom: "Collection II",
    intitule: "La Maison",
    apartir: "8 900 €",
    description:
      "Photographie et film, deux jours, deux opérateurs. La formule de référence : celle qui produit un ensemble complet, cohérent, tenu par une seule direction artistique.",
    inclus: [
      "Deux jours — veille et célébration",
      "Second opérateur image",
      "Film de 7 à 10 minutes, son direct",
      "Format court pour les réseaux",
      "600 à 900 images retenues et étalonnées",
      "Album relié main, 60 pages, papier coton",
      "Conservation des fichiers sources dix ans",
    ],
    mention: "La collection la plus demandée",
  },
  {
    index: "III",
    nom: "Collection III",
    intitule: "Sur Mesure",
    apartir: "Sur devis",
    description:
      "Les célébrations de plusieurs jours, les mariages à l'étranger, les demandes qui n'entrent dans aucune case : direction artistique complète, équipe constituée pour le projet.",
    inclus: [
      "Immersion de trois à cinq jours",
      "Équipe dimensionnée sur mesure",
      "Argentique moyen format, 16 mm sur demande",
      "Séance éditoriale dédiée, avant ou après",
      "Direction artistique et repérages sur place",
      "Objet final conçu spécifiquement — livre, coffret, tirage grand format",
    ],
  },
];

/** Le déroulé de l'accompagnement, de la première lettre à l'objet final. */
export const deroule = [
  {
    index: "01",
    titre: "La rencontre",
    texte:
      "Un entretien d'une heure, chez vous ou en visioconférence. Nous cherchons à comprendre ce que vous voulez garder, pas à vendre une formule.",
  },
  {
    index: "02",
    titre: "La proposition",
    texte:
      "Une note d'intention écrite : ce que nous photographierons, comment, avec quelle lumière et quelle matière. Le devis en découle.",
  },
  {
    index: "03",
    titre: "Le repérage",
    texte:
      "Une visite des lieux à l'heure de la célébration, un déroulé construit avec vous et vos prestataires. Rien n'est laissé au hasard de la journée.",
  },
  {
    index: "04",
    titre: "Le jour",
    texte:
      "Nous sommes là avant tout le monde et nous partons après. Vous ne nous entendrez pas donner d'instructions, sauf pour les portraits — vingt minutes, pas davantage.",
  },
  {
    index: "05",
    titre: "L'édition",
    texte:
      "Six à huit semaines. La sélection est la part la plus longue du travail : nous écartons quatre-vingt-quinze pour cent de ce que nous produisons.",
  },
  {
    index: "06",
    titre: "L'objet",
    texte:
      "Galerie privée, tirages, album relié, film. Un ensemble physique qui survivra aux formats, aux disques durs et aux plateformes.",
  },
];

export const questions = [
  {
    q: "Combien de mariages acceptez-vous par an ?",
    r: "Douze au maximum. Cette limite n'est pas commerciale : au-delà, la part d'édition et de fabrication se dégrade, et c'est précisément là que se joue la différence.",
  },
  {
    q: "Travaillez-vous à l'étranger ?",
    r: "Régulièrement — Italie, Portugal, Grèce, Maroc, Royaume-Uni. Les frais de déplacement et de repérage sont chiffrés séparément, sans marge.",
  },
  {
    q: "Photographie argentique ou numérique ?",
    r: "Les deux, selon le projet. L'argentique apporte une matière et impose une lenteur ; le numérique garantit la basse lumière et le volume. La plupart de nos reportages mêlent les deux.",
  },
  {
    q: "Quel est le délai de livraison ?",
    r: "Six à huit semaines pour les photographies, dix à douze pour le film. Une sélection de dix images vous est envoyée dans les quatre jours.",
  },
  {
    q: "Publiez-vous tous les mariages ?",
    r: "Aucun sans accord écrit. Une part importante de notre travail n'est jamais montrée, et cela convient parfaitement à la maison.",
  },
  {
    q: "Comment réserve-t-on une date ?",
    r: "Un acompte de trente pour cent et une convention signée. Les dates de mai à septembre se retiennent généralement douze à dix-huit mois à l'avance.",
  },
];
