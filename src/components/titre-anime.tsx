"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { EASE_MAISON, EASE_RIDEAU, seuil } from "@/lib/motion";

/**
 * Le titre de section, mot à mot.
 *
 * Le bandeau d'ouverture fait déjà monter son titre ligne par ligne ; ici le
 * même geste descend dans la page, mot par mot, derrière un cache.
 *
 * Réservé aux vrais titres de section — jamais au texte courant, sous peine
 * de transformer la lecture en défilé. Il ne doit pas non plus être posé
 * dans un <Reveal> : le fondu du parent dissoudrait le cache et le geste
 * perdrait sa netteté. Il porte donc son propre déclencheur.
 *
 * `geste="dilate"` substitue au découpage la fermeture de l'interlettrage,
 * de 0,14 em à −0,03 : c'est le geste des plans, et il tient sur un fond
 * sombre là où le cache mot à mot suppose un fond franc.
 */
export function TitreAnime({
  children,
  className = "",
  geste = "mots",
}: {
  children: ReactNode;
  className?: string;
  geste?: "mots" | "dilate";
}) {
  const reduit = useReducedMotion();
  const base = `text-[length:var(--text-h2)] leading-[1.04] ${className}`;

  // Le découpage exige du texte brut ; tout le reste est rendu tel quel.
  const texte = typeof children === "string" ? children.trim() : null;

  if (reduit || !texte) {
    return <h2 className={base}>{children}</h2>;
  }

  if (geste === "dilate") {
    return (
      <motion.h2
        className={base}
        initial={{ letterSpacing: "0.14em" }}
        whileInView={{ letterSpacing: "-0.02em" }}
        viewport={seuil}
        transition={{ duration: 1.6, ease: EASE_MAISON }}
      >
        {texte}
      </motion.h2>
    );
  }

  const mots = texte.split(/\s+/);

  return (
    <motion.h2
      className={`flex flex-wrap gap-x-[0.26em] ${base}`}
      initial="repos"
      whileInView="entre"
      viewport={seuil}
    >
      {mots.map((mot, i) => (
        <Fragment key={`${mot}-${i}`}>
          {/* Une vraie espace entre deux mots : l'écart visuel vient du
              `gap`, mais un nœud de texte vide n'est pas rendu en flex et
              conserve donc l'espace pour la lecture d'écran, la copie et
              l'indexation. Sans lui, le titre se lit « Cequelamaisonnefaitpas ». */}
          {i > 0 ? " " : null}
          <span className="block overflow-hidden py-[0.12em] -my-[0.12em]">
            <motion.span
              className="block"
              variants={{
                repos: { y: "110%" },
                entre: { y: "0%" },
              }}
              transition={{
                duration: 0.9,
                ease: EASE_RIDEAU,
                delay: i * 0.055,
              }}
            >
              {mot}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.h2>
  );
}
