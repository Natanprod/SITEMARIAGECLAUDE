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
 * `template.tsx` semblait l'endroit naturel, puisqu'il est remonté à chaque
 * navigation. Mais sous export statique, l'arbre qu'il enveloppait ne se
 * réhydratait pas : React jetait l'hydratation de chaque page et la rendait
 * entièrement côté client. Le voile logé dans la mise en page n'a pas ce
 * défaut — il n'enveloppe rien, c'est un frère du contenu.
 *
 * Et rien ne se décide pendant le rendu. Une première version lisait un
 * drapeau de module, qui passait à faux dès la première page construite :
 * les suivantes étaient écrites avec le voile dans leur HTML, que le
 * navigateur ne reproduisait pas. Ici le rendu est immuable — un div
 * transparent et inerte — et tout se joue dans un effet.
 */

/** Le geste retenu. Trois écritures possibles, une seule active. */
const VARIANTE: "volet" | "fondu" | "glissement" = "volet";

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

    if (VARIANTE === "volet") {
      // L'opacité est tenue à 1 pendant tout le geste : au repos le voile
      // est transparent, sans quoi le volet se jouerait sur de l'invisible.
      animer(
        scope.current,
        { opacity: [1, 1], clipPath: ["inset(0 0 0 0%)", "inset(0 0 0 100%)"] },
        { duration: 0.78, ease: EASE_RIDEAU },
      );
    } else {
      animer(
        scope.current,
        { opacity: [1, 0] },
        { duration: 0.62, ease: EASE_MAISON },
      );
    }

    if (VARIANTE === "glissement") {
      const page = document.querySelector("main");
      if (page) {
        animer(
          page,
          { opacity: [0, 1], x: ["2.5%", "0%"] },
          { duration: 0.85, ease: EASE_MAISON, delay: 0.08 },
        );
      }
    }
  }, [chemin, animer, reduit, scope]);

  return (
    <div
      ref={scope}
      data-transition
      aria-hidden
      className="pointer-events-none fixed inset-0 z-100 bg-noir opacity-0"
    />
  );
}
