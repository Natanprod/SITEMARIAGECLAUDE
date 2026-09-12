import type { NextConfig } from "next";

/**
 * Le site est exporté en fichiers statiques.
 *
 * C'est ce que réclame l'hébergement retenu (Hostinger, mutualisé) : aucun
 * processus Node n'y tourne, on y dépose des fichiers. `next build` produit
 * donc un dossier `out/` à téléverser tel quel dans `public_html`.
 *
 * Contrepartie assumée : `next/image` ne peut plus redimensionner à la
 * volée, d'où `unoptimized`. Les images doivent donc être exportées aux
 * bonnes dimensions avant d'être déposées dans `public/plates/`.
 * Sur un hébergement qui exécute Node (Vercel, Netlify), retirer ces trois
 * options rend l'optimisation automatique des images.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
