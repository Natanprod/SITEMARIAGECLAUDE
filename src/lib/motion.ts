import type { Transition, Variants } from "framer-motion";

/**
 * Le mouvement de la maison.
 * Règle unique : rien ne rebondit, rien ne dépasse, tout est lent.
 * Une animation doit se remarquer après coup, jamais pendant.
 */

export const EASE_MAISON = [0.16, 1, 0.3, 1] as const;
export const EASE_RIDEAU = [0.76, 0, 0.24, 1] as const;

export const transitionLente: Transition = {
  duration: 1.1,
  ease: EASE_MAISON,
};

export const transitionRideau: Transition = {
  duration: 0.9,
  ease: EASE_RIDEAU,
};

/** Montée discrète — le geste par défaut du site. */
export const monte: Variants = {
  repos: { opacity: 0, y: 28 },
  entre: {
    opacity: 1,
    y: 0,
    transition: transitionLente,
  },
};

/** Fondu seul, pour les éléments qui ne doivent pas bouger. */
export const fondu: Variants = {
  repos: { opacity: 0 },
  entre: { opacity: 1, transition: { duration: 1.4, ease: EASE_MAISON } },
};

/** Cadence d'un groupe : les enfants entrent l'un après l'autre. */
export const cadence = (pas = 0.09, retard = 0): Variants => ({
  repos: {},
  entre: {
    transition: { staggerChildren: pas, delayChildren: retard },
  },
});

/** Révélation d'image : le cadre s'ouvre, l'image se remet à l'échelle. */
export const rideauImage: Variants = {
  repos: { clipPath: "inset(0% 0% 100% 0%)" },
  entre: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.25, ease: EASE_RIDEAU },
  },
};

export const zoomImage: Variants = {
  repos: { scale: 1.12 },
  entre: { scale: 1, transition: { duration: 1.6, ease: EASE_MAISON } },
};

/** Mot à mot, pour les titres d'ouverture uniquement. */
export const motMonte: Variants = {
  repos: { y: "110%" },
  entre: {
    y: "0%",
    transition: { duration: 1.05, ease: EASE_RIDEAU },
  },
};

/** Seuil commun : l'élément se déclenche quand il est franchement visible. */
export const seuil = { once: true, amount: 0.25 } as const;
export const seuilLarge = { once: true, amount: 0.12 } as const;

/**
 * Le geste, ou son absence.
 *
 * `useReducedMotion()` vaut `false` le temps du rendu serveur et du premier
 * rendu client : l'état de repos part donc dans le HTML — un plan fermé,
 * un titre masqué. Retirer les variantes ensuite ne nettoie pas ce qui est
 * déjà posé : le plan reste fermé pour toujours, et le site s'affiche noir
 * chez qui a coché « réduire les animations ».
 *
 * On garde donc toujours les variantes, et c'est la durée qu'on annule.
 * Le contenu arrive à sa place, sans mouvement — ce qui est exactement ce
 * que demande le réglage.
 */
export function gestes(reduit: boolean | null, variantes: Variants): Variants {
  if (!reduit) return variantes;
  return Object.fromEntries(
    Object.entries(variantes).map(([nom, etat]) => [
      nom,
      etat && typeof etat === "object" && "transition" in etat
        ? { ...etat, transition: { duration: 0 } }
        : etat,
    ]),
  ) as Variants;
}
