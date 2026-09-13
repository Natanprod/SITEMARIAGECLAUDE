"use client";

import { usePathname } from "next/navigation";
import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_MAISON, EASE_RIDEAU } from "@/lib/motion";

/**
 * La transition entre deux pages.
 *
 * Un seul voile, posé dans la mise en page — qui, elle, persiste d'une
 * navigation à l'autre. Il écoute le chemin : quand il change, le geste se
 * rejoue. Aucun clic n'est intercepté, donc le clic milieu, le cmd+clic et
 * le bouton Précédent restent intacts.
 *
 * Deux écueils rencontrés en chemin, et évités ici.
 *
 * `template.tsx` semblait l'endroit prévu, puisqu'il est remonté à chaque
 * navigation. Mais sous export statique, l'arbre qu'il enveloppait ne se
 * réhydratait pas : React jetait le HTML du serveur sur les sept pages et
 * rendait tout côté client. Le voile logé dans la mise en page n'a pas ce
 * défaut — il n'enveloppe rien, c'est un frère du contenu.
 *
 * Et rien ne se décide pendant le rendu : une première version lisait un
 * drapeau de module, qui passait à faux dès la première page construite.
 * Le rendu est immuable — un div transparent et inerte — et tout se joue
 * dans un effet.
 */

/**
 * Le geste retenu.
 *
 * Un balayage horizontal traverse le regard : on le remarque plus que la
 * page. Les quatre écritures ci-dessous s'en gardent — elles sont brèves,
 * centrées ou verticales, et trois d'entre elles laissent la page faire
 * l'essentiel du travail.
 */
const VARIANTE: "souffle" | "papier" | "levee" | "diaphragme" = "souffle";

/** Chaque écriture : la couleur du voile, et son geste. */
const ECRITURES = {
  /** Le plus discret : un voile d'encre qui s'efface en un souffle,
   *  pendant que la page se pose depuis un cheveu d'échelle. */
  souffle: { couleur: "bg-noir", duree: 0.42 },
  /** Le même, mais à travers le papier : plus clair, plus aérien. */
  papier: { couleur: "bg-paper", duree: 0.46 },
  /** Le voile se lève, comme le rideau d'ouverture du site. */
  levee: { couleur: "bg-noir", duree: 0.72 },
  /** L'iris du cinéma muet : le noir se referme sur lui-même et disparaît. */
  diaphragme: { couleur: "bg-noir", duree: 0.78 },
} as const;

export function TransitionPage() {
  const chemin = usePathname();
  const reduit = useReducedMotion();
  const [scope, animer] = useAnimate();
  const premiere = useRef(true);

  useEffect(() => {
    // Au premier affichage, le lever de rideau tient déjà ce rôle.
    if (premiere.current) {
      premiere.current = false;
      return;
    }
    if (reduit || !scope.current) return;

    const voile = scope.current;
    const page = document.querySelector("main");
    const { duree } = ECRITURES[VARIANTE];

    if (VARIANTE === "levee") {
      animer(
        voile,
        { opacity: [1, 1], y: ["0%", "-100%"] },
        { duration: duree, ease: EASE_RIDEAU },
      );
    } else if (VARIANTE === "diaphragme") {
      animer(
        voile,
        {
          opacity: [1, 1],
          clipPath: ["circle(140% at 50% 50%)", "circle(0% at 50% 50%)"],
        },
        { duration: duree, ease: EASE_RIDEAU },
      );
    } else {
      animer(voile, { opacity: [1, 0] }, { duration: duree, ease: EASE_MAISON });
    }

    // La page se pose depuis un cheveu d'échelle : c'est ce presque-rien
    // qui fait la différence entre « ça a changé » et « ça s'est posé ».
    if (page && VARIANTE !== "levee") {
      animer(
        page,
        { opacity: [0.55, 1], scale: [1.012, 1] },
        { duration: duree + 0.34, ease: EASE_MAISON },
      );
    }
  }, [chemin, animer, reduit, scope]);

  return (
    <div
      ref={scope}
      data-transition
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-100 opacity-0 ${ECRITURES[VARIANTE].couleur}`}
    />
  );
}
