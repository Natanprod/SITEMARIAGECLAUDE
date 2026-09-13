"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cadence, fondu, monte, seuil, seuilLarge } from "@/lib/motion";

/**
 * Jeu de balises autorisées. On les résout dans une table statique plutôt
 * qu'avec `motion.create()` à la volée : un composant créé pendant le rendu
 * serait remonté à chaque passe, et l'animation rejouerait sans raison.
 */
const BALISES = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  blockquote: motion.blockquote,
  dl: motion.dl,
} as const;

export type Balise = keyof typeof BALISES;

type BaseProps = {
  children: ReactNode;
  as?: Balise;
  className?: string;
  large?: boolean;
};

/**
 * L'entrée en scène par défaut : une montée courte, longue en durée.
 * Si l'utilisateur a demandé moins de mouvement, le contenu est simplement
 * là — aucune version dégradée, aucune animation résiduelle.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  geste = "monte",
  large = false,
}: BaseProps & { delay?: number; geste?: "monte" | "fondu" }) {
  const reduit = useReducedMotion();
  const Balise = BALISES[as];
  const Statique = as;

  if (reduit) return <Statique className={className}>{children}</Statique>;

  return (
    <Balise
      className={className}
      variants={geste === "monte" ? monte : fondu}
      initial="repos"
      whileInView="entre"
      viewport={large ? seuilLarge : seuil}
      transition={{ delay }}
    >
      {children}
    </Balise>
  );
}

/** Groupe cadencé : les enfants entrent l'un après l'autre. */
export function RevealGroup({
  children,
  as = "div",
  className,
  pas = 0.09,
  delay = 0,
  large = false,
}: BaseProps & { pas?: number; delay?: number }) {
  const reduit = useReducedMotion();
  const Balise = BALISES[as];
  const Statique = as;

  if (reduit) return <Statique className={className}>{children}</Statique>;

  return (
    <Balise
      className={className}
      variants={cadence(pas, delay)}
      initial="repos"
      whileInView="entre"
      viewport={large ? seuilLarge : seuil}
    >
      {children}
    </Balise>
  );
}

/** Enfant d'un <RevealGroup> : hérite de la cadence du parent. */
export function RevealItem({ children, as = "div", className }: BaseProps) {
  const reduit = useReducedMotion();
  const Balise = BALISES[as];
  const Statique = as;

  if (reduit) return <Statique className={className}>{children}</Statique>;

  return (
    <Balise className={className} variants={monte}>
      {children}
    </Balise>
  );
}
