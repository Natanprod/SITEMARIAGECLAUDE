/**
 * Identité de la maison.
 * Point d'entrée unique : nom, coordonnées, navigation, textes de signature.
 * Tout changement d'identité se fait ici, jamais dans les composants.
 */

export const maison = {
  nom: "Natan",
  nomCourt: "N.",
  discipline: "Photographie & cinéma de mariage",
  signature: "Maison d'image — depuis 2015",
  baseline: "Nous ne photographions pas un mariage. Nous en écrivons la mémoire.",
  ville: "Marseille",
  rayon: "France",
  email: "contactnathanmathieu@gmail.com",
  telephone: "+33 6 04 48 08 37",
  instagram: "@natan.mariage",
  instagramUrl: "https://www.instagram.com/natan.mariage/",
  /**
   * Le domaine en ligne. Il vit ici et nulle part ailleurs : métadonnées,
   * canonique, sitemap et robots.txt le lisent tous à cette source.
   */
  url: "https://natanmariage.com",
} as const;

/** Identité légale — mentions obligatoires, employée par /mentions-legales. */
export const legal = {
  formeJuridique: "Micro-entreprise",
  directeurPublication: "Mathieu Nathan",
  adresse: "59 chemin du Vallon de Toulouse, 13010 Marseille",
  siret: "910 599 695 00020",
  /** Micro-entreprise sous les seuils : pas de numéro de TVA intracommunautaire. */
  tva: "TVA non applicable, article 293 B du Code général des impôts",
  hebergeur: "Hostinger International Ltd",
  /** À compléter depuis les mentions légales de l'hébergeur. */
  hebergeurAdresse: "[adresse et téléphone à reprendre sur hostinger.fr]",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Numéro éditorial affiché dans le menu plein écran */
  index: string;
};

export const navigation: NavItem[] = [
  { href: "/maison", label: "La Maison", index: "01" },
  { href: "/histoires", label: "Histoires", index: "02" },
  { href: "/films", label: "Films", index: "03" },
  { href: "/experience", label: "L'Expérience", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

/** Repères chiffrés, énoncés sans emphase. */
export const reperes = [
  { valeur: "10", suffixe: "ans", legende: "de pratique de l'image" },
  { valeur: "180", suffixe: "+", legende: "mariages accompagnés" },
  { valeur: "14", suffixe: "pays", legende: "traversés pour une célébration" },
  { valeur: "12", suffixe: "max", legende: "mariages retenus par saison" },
];

/** Maisons, lieux et titres cités en bas de page — la caution discrète. */
export const references = [
  "Vogue Mariage",
  "Château de Villette",
  "Hôtel de Crillon",
  "Domaine de Fontenille",
  "Villa Ephrussi",
  "La Réserve",
  "Masseria San Domenico",
];

export const temoignages = [
  {
    texte:
      "Nous attendions des photographies. Nous avons reçu un objet, une matière, une façon de nous regarder que nous ne connaissions pas. Deux ans plus tard, le film passe encore le dimanche soir.",
    auteur: "Camille & Aurélien",
    lieu: "Luberon",
  },
  {
    texte:
      "Sa présence est la chose la plus rare : on ne le voit jamais travailler, et tout est là. Nos familles ont oublié qu'il y avait un appareil dans la pièce.",
    auteur: "Joséphine & Tom",
    lieu: "Île-de-France",
  },
  {
    texte:
      "Le tirage de la première danse est accroché dans l'entrée. Personne ne le prend pour une photo de mariage. C'est exactement ce que nous voulions.",
    auteur: "Inès & Gabriel",
    lieu: "Pouilles",
  },
];
