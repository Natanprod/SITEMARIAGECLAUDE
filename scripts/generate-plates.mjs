/**
 * Génération des planches de substitution.
 *
 * Le site doit pouvoir être montré avant que les photographies définitives
 * n'existent. Ce script fabrique des champs colorés cinématographiques —
 * duotone, lumière rasante, horizon, vignetage, grain argentique — dans la
 * palette de la maison, aux ratios exacts utilisés par la mise en page.
 *
 * Remplacer une planche par une vraie photographie :
 *   déposer le fichier dans `public/plates/` sous le même nom.
 * Le script n'écrase jamais un fichier existant sans l'option --force.
 *
 *   node scripts/generate-plates.mjs [--force]
 */

import { mkdir, access, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SORTIE = join(process.cwd(), "public", "plates");
const FORCE = process.argv.includes("--force");

/* --- Palette de la maison ------------------------------------------------ */
const C = {
  noir: "#0a0a09",
  ink: "#16130f",
  ardoise: "#2a2621",
  greige: "#736a5c",
  lin: "#ded7c9",
  paper: "#f2eee5",
  albatre: "#faf8f3",
  sauge: "#8c9c7d",
  tournesol: "#cfa02a",
  lilas: "#9a90b4",
  terre: "#9f553c",
};

/* --- Formats ------------------------------------------------------------- */
const FORMATS = {
  cinema: [1600, 686],
  paysage: [1400, 1000],
  portrait: [1000, 1400],
  carre: [1200, 1200],
  colonne: [900, 1600],
  seize: [1600, 900],
  hero: [2000, 1125],
};

/* --- Atmosphères --------------------------------------------------------- */
/**
 * Chaque atmosphère décrit une situation de lumière, pas un décor :
 * deux à trois teintes, une source, un plan au sol, une densité de grain.
 */
const ATMOSPHERES = {
  provence: {
    fond: [C.ink, C.terre, C.ardoise],
    angle: 28,
    lumiere: { x: 0.74, y: 0.22, r: 0.62, teinte: "#f0d9ad", force: 0.5 },
    sol: { y: 0.72, teinte: C.noir, force: 0.5 },
    masse: { x: 0.12, y: 0.86, rx: 0.5, ry: 0.34, teinte: C.noir, force: 0.5 },
    vignette: 0.5,
    structure: { shaft: 0.2, largeur: 0.16, force: 0.3, teinte: "#f6e4c4", bord: 0.72 },
    flou: 14,
    grain: 20,
  },
  pierre: {
    fond: [C.lin, C.paper, C.greige],
    angle: 104,
    lumiere: { x: 0.28, y: 0.18, r: 0.62, teinte: "#ffffff", force: 0.44 },
    sol: { y: 0.8, teinte: C.ardoise, force: 0.42 },
    masse: { x: 0.9, y: 0.2, rx: 0.42, ry: 0.5, teinte: C.ardoise, force: 0.42 },
    vignette: 0.4,
    structure: { shaft: 0.7, largeur: 0.2, force: 0.26, teinte: "#ffffff", bord: 0.8 },
    flou: 18,
    grain: 16,
  },
  midi: {
    fond: [C.albatre, C.lin, C.tournesol],
    angle: 62,
    lumiere: { x: 0.62, y: 0.1, r: 0.52, teinte: "#fff6e0", force: 0.6 },
    sol: { y: 0.66, teinte: C.ardoise, force: 0.5 },
    masse: { x: 0.08, y: 0.62, rx: 0.34, ry: 0.62, teinte: C.ardoise, force: 0.5 },
    vignette: 0.3,
    structure: { shaft: 0.34, largeur: 0.13, force: 0.34, teinte: "#2a2621", bord: 0.66 },
    flou: 12,
    grain: 22,
  },
  mediterranee: {
    fond: [C.sauge, C.lin, C.ardoise],
    angle: 88,
    lumiere: { x: 0.5, y: 0.3, r: 0.7, teinte: "#fdf3de", force: 0.44 },
    sol: { y: 0.58, teinte: C.ink, force: 0.44 },
    masse: { x: 0.85, y: 0.9, rx: 0.48, ry: 0.3, teinte: C.ink, force: 0.42 },
    vignette: 0.38,
    structure: { shaft: 0.82, largeur: 0.22, force: 0.2, teinte: "#faf8f3", bord: 0.58 },
    flou: 16,
    grain: 17,
  },
  nocturne: {
    fond: [C.noir, C.ardoise, C.ink],
    angle: 46,
    lumiere: { x: 0.68, y: 0.56, r: 0.42, teinte: C.tournesol, force: 0.6 },
    sol: { y: 0.84, teinte: C.noir, force: 0.6 },
    masse: { x: 0.16, y: 0.24, rx: 0.42, ry: 0.44, teinte: C.noir, force: 0.55 },
    vignette: 0.62,
    structure: { shaft: 0.66, largeur: 0.1, force: 0.34, teinte: "#cfa02a", bord: 0.84 },
    flou: 15,
    grain: 30,
  },
  crepuscule: {
    fond: [C.lilas, C.terre, C.ink],
    angle: 118,
    lumiere: { x: 0.36, y: 0.72, r: 0.6, teinte: "#f2ddbe", force: 0.45 },
    sol: { y: 0.76, teinte: C.ink, force: 0.44 },
    masse: { x: 0.8, y: 0.14, rx: 0.5, ry: 0.42, teinte: C.ink, force: 0.38 },
    vignette: 0.42,
    structure: { shaft: 0.26, largeur: 0.18, force: 0.24, teinte: "#f2ddbe", bord: 0.76 },
    flou: 17,
    grain: 21,
  },
  brume: {
    fond: [C.lilas, C.lin, C.greige],
    angle: 96,
    lumiere: { x: 0.5, y: 0.42, r: 0.72, teinte: "#ffffff", force: 0.4 },
    sol: { y: 0.62, teinte: C.ardoise, force: 0.34 },
    masse: { x: 0.22, y: 0.9, rx: 0.6, ry: 0.28, teinte: C.ardoise, force: 0.36 },
    vignette: 0.34,
    structure: { shaft: 0.5, largeur: 0.3, force: 0.18, teinte: "#ffffff", bord: 0.62 },
    flou: 22,
    grain: 15,
  },
  atelier: {
    fond: [C.ardoise, C.ink, C.greige],
    angle: 72,
    lumiere: { x: 0.22, y: 0.26, r: 0.56, teinte: "#efe3cb", force: 0.55 },
    sol: { y: 0.78, teinte: C.noir, force: 0.45 },
    masse: { x: 0.86, y: 0.74, rx: 0.44, ry: 0.44, teinte: C.noir, force: 0.45 },
    vignette: 0.48,
    structure: { shaft: 0.18, largeur: 0.12, force: 0.36, teinte: "#efe3cb", bord: 0.7 },
    flou: 16,
    grain: 24,
  },
};

/* --- Catalogue ----------------------------------------------------------- */
/** [nom de fichier, format, atmosphère, décalage de composition 0→1] */
const PLANCHES = [
  ["ouverture", "hero", "provence", 0],
  ["accueil-manifeste", "portrait", "pierre", 0.3],
  ["accueil-savoir-faire", "paysage", "atelier", 0.6],
  ["accueil-film", "seize", "crepuscule", 0.2],

  ["camille-couverture", "cinema", "provence", 0.15],
  ["camille-01", "portrait", "atelier", 0.4],
  ["camille-02", "paysage", "pierre", 0.55],
  ["camille-03", "carre", "midi", 0.7],
  ["camille-04", "cinema", "crepuscule", 0.85],

  ["josephine-couverture", "cinema", "pierre", 0.1],
  ["josephine-01", "colonne", "atelier", 0.35],
  ["josephine-02", "paysage", "brume", 0.5],
  ["josephine-03", "portrait", "pierre", 0.65],
  ["josephine-04", "paysage", "nocturne", 0.9],

  ["ines-couverture", "cinema", "midi", 0.2],
  ["ines-01", "paysage", "midi", 0.45],
  ["ines-02", "portrait", "atelier", 0.6],
  ["ines-03", "carre", "pierre", 0.75],
  ["ines-04", "cinema", "crepuscule", 0.95],

  ["elsa-couverture", "cinema", "mediterranee", 0.25],
  ["elsa-01", "portrait", "mediterranee", 0.4],
  ["elsa-02", "paysage", "pierre", 0.6],
  ["elsa-03", "carre", "midi", 0.8],
  ["elsa-04", "cinema", "crepuscule", 0.5],

  ["lea-couverture", "cinema", "nocturne", 0.3],
  ["lea-01", "portrait", "nocturne", 0.5],
  ["lea-02", "paysage", "nocturne", 0.7],
  ["lea-03", "carre", "atelier", 0.15],
  ["lea-04", "cinema", "nocturne", 0.85],

  ["alix-couverture", "cinema", "brume", 0.35],
  ["alix-01", "paysage", "brume", 0.55],
  ["alix-02", "portrait", "mediterranee", 0.7],
  ["alix-03", "carre", "pierre", 0.2],
  ["alix-04", "cinema", "nocturne", 0.6],

  ["film-juin", "seize", "provence", 0.45],
  ["film-mezzogiorno", "seize", "midi", 0.65],
  ["film-nocturne", "seize", "nocturne", 0.25],
  ["film-atlantique", "seize", "brume", 0.8],

  ["maison-portrait", "portrait", "atelier", 0.5],
  ["maison-atelier", "paysage", "atelier", 0.25],
  ["maison-matiere", "carre", "pierre", 0.85],
  ["maison-large", "cinema", "crepuscule", 0.65],

  ["experience-large", "cinema", "pierre", 0.4],
  ["experience-detail", "portrait", "midi", 0.75],
  ["contact-colonne", "colonne", "crepuscule", 0.55],
  ["histoires-ouverture", "cinema", "atelier", 0.7],
];

/* --- Fabrication --------------------------------------------------------- */

/** Décale une valeur normalisée en restant dans les bornes utiles. */
const glisse = (base, decalage, amplitude = 0.16) =>
  Math.min(0.95, Math.max(0.05, base + (decalage - 0.5) * amplitude * 2));

function composerSvg(largeur, hauteur, atm, decalage) {
  const { fond, angle, lumiere, sol, masse, vignette } = atm;
  const rad = (angle * Math.PI) / 180;
  const x2 = (0.5 + Math.cos(rad) / 2).toFixed(4);
  const y2 = (0.5 + Math.sin(rad) / 2).toFixed(4);
  const x1 = (0.5 - Math.cos(rad) / 2).toFixed(4);
  const y1 = (0.5 - Math.sin(rad) / 2).toFixed(4);

  const lx = glisse(lumiere.x, decalage, 0.22);
  const ly = glisse(lumiere.y, decalage, 0.12);
  const solY = glisse(sol.y, decalage, 0.1);
  const mx = glisse(masse.x, 1 - decalage, 0.18);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}" viewBox="0 0 ${largeur} ${hauteur}">
  <defs>
    <linearGradient id="fond" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      <stop offset="0" stop-color="${fond[0]}"/>
      <stop offset="0.52" stop-color="${fond[1]}"/>
      <stop offset="1" stop-color="${fond[2]}"/>
    </linearGradient>
    <radialGradient id="lumiere" cx="${lx}" cy="${ly}" r="${lumiere.r}">
      <stop offset="0" stop-color="${lumiere.teinte}" stop-opacity="${lumiere.force}"/>
      <stop offset="0.45" stop-color="${lumiere.teinte}" stop-opacity="${(lumiere.force * 0.4).toFixed(3)}"/>
      <stop offset="1" stop-color="${lumiere.teinte}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sol" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sol.teinte}" stop-opacity="0"/>
      <stop offset="0.35" stop-color="${sol.teinte}" stop-opacity="${(sol.force * 0.55).toFixed(3)}"/>
      <stop offset="1" stop-color="${sol.teinte}" stop-opacity="${sol.force}"/>
    </linearGradient>
    <radialGradient id="masse" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${masse.teinte}" stop-opacity="${masse.force}"/>
      <stop offset="0.6" stop-color="${masse.teinte}" stop-opacity="${(masse.force * 0.45).toFixed(3)}"/>
      <stop offset="1" stop-color="${masse.teinte}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.48" r="0.78">
      <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="${vignette}"/>
    </radialGradient>
  </defs>

  <rect width="${largeur}" height="${hauteur}" fill="url(#fond)"/>
  <ellipse cx="${(mx * largeur).toFixed(0)}" cy="${(masse.y * hauteur).toFixed(0)}" rx="${(masse.rx * largeur).toFixed(0)}" ry="${(masse.ry * hauteur).toFixed(0)}" fill="url(#masse)"/>
  <rect width="${largeur}" height="${hauteur}" fill="url(#lumiere)"/>
  <rect y="${(solY * hauteur).toFixed(0)}" width="${largeur}" height="${((1 - solY) * hauteur).toFixed(0)}" fill="url(#sol)"/>
  <rect y="${(solY * hauteur).toFixed(0)}" width="${largeur}" height="1" fill="${fond[2]}" opacity="0.22"/>
  <rect width="${largeur}" height="${hauteur}" fill="url(#vignette)"/>
</svg>`;
}

/**
 * Deuxième couche, à peine floutée : un pan de lumière vertical et une arête
 * horizontale. C'est ce qui empêche la planche d'être un simple dégradé —
 * l'œil y lit une embrasure, un mur, une ligne d'horizon.
 */
function composerStructure(largeur, hauteur, atm, decalage) {
  const st = atm.structure;
  const x = glisse(st.shaft, decalage, 0.26);
  const l = st.largeur;
  const bord = glisse(st.bord, 1 - decalage, 0.08);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}" viewBox="0 0 ${largeur} ${hauteur}">
  <defs>
    <linearGradient id="pan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${st.teinte}" stop-opacity="0"/>
      <stop offset="0.16" stop-color="${st.teinte}" stop-opacity="${st.force}"/>
      <stop offset="0.84" stop-color="${st.teinte}" stop-opacity="${(st.force * 0.82).toFixed(3)}"/>
      <stop offset="1" stop-color="${st.teinte}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="chute" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="0.7" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="m"><rect width="${largeur}" height="${hauteur}" fill="url(#chute)"/></mask>
    <linearGradient id="arete" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${st.teinte}" stop-opacity="0"/>
      <stop offset="0.3" stop-color="${st.teinte}" stop-opacity="${(st.force * 0.6).toFixed(3)}"/>
      <stop offset="1" stop-color="${st.teinte}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="${((x - l / 2) * largeur).toFixed(0)}" y="0" width="${(l * largeur).toFixed(0)}" height="${hauteur}" fill="url(#pan)" mask="url(#m)"/>
  <rect x="0" y="${(bord * hauteur).toFixed(0)}" width="${largeur}" height="${Math.max(2, Math.round(hauteur * 0.004))}" fill="url(#arete)"/>
</svg>`;
}

async function existe(chemin) {
  try {
    await access(chemin);
    return true;
  } catch {
    return false;
  }
}

async function fabriquer([nom, format, cle, decalage]) {
  const [largeur, hauteur] = FORMATS[format];
  const atm = ATMOSPHERES[cle];
  const chemin = join(SORTIE, `${nom}.jpg`);

  if (!FORCE && (await existe(chemin))) return { nom, etat: "conservé" };

  const svg = composerSvg(largeur, hauteur, atm, decalage);

  // Le grain est fabriqué en bruit gaussien puis fondu en lumière douce :
  // c'est ce qui donne aux aplats leur matière argentique.
  const grain = await sharp({
    create: {
      width: largeur,
      height: hauteur,
      channels: 3,
      noise: { type: "gaussian", mean: 128, sigma: atm.grain },
    },
  })
    .png()
    .toBuffer();

  const structure = await sharp(Buffer.from(composerStructure(largeur, hauteur, atm, decalage)))
    .blur(5)
    .png()
    .toBuffer();

  const image = await sharp(Buffer.from(svg))
    .blur(atm.flou)
    .composite([
      { input: structure, blend: "over" },
      { input: grain, blend: "soft-light" },
    ])
    .linear(1.12, -14)
    .modulate({ saturation: 0.9 })
    .jpeg({ quality: 74, progressive: true, mozjpeg: true })
    .toBuffer();

  await writeFile(chemin, image);
  return { nom, etat: "écrit", taille: image.length };
}

async function principal() {
  await mkdir(SORTIE, { recursive: true });
  const resultats = [];
  for (const planche of PLANCHES) resultats.push(await fabriquer(planche));

  const ecrits = resultats.filter((r) => r.etat === "écrit");
  const poids = ecrits.reduce((t, r) => t + r.taille, 0);
  console.log(
    `${ecrits.length} planche(s) écrite(s), ${resultats.length - ecrits.length} conservée(s) — ${(poids / 1024 / 1024).toFixed(2)} Mo`,
  );
}

principal().catch((e) => {
  console.error(e);
  process.exit(1);
});
