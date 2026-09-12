"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_MAISON, EASE_RIDEAU, seuilLarge } from "@/lib/motion";

type Hauteur = "plein" | "grand" | "moyen" | "bande";

const HAUTEURS: Record<Hauteur, string> = {
  plein: "h-[100svh] min-h-[34rem]",
  grand: "h-[86svh] min-h-[30rem]",
  moyen: "h-[70svh] min-h-[26rem]",
  bande: "h-[54svh] min-h-[20rem]",
};

export type PlanProps = {
  image: { src: string; alt: string };
  hauteur?: Hauteur;
  priority?: boolean;
  sizes?: string;
  /** Le titre du plan — l'interlettrage se referme à l'entrée */
  titre?: string;
  /** Coin haut gauche : numéro, lieu, étiquette de section */
  hautGauche?: ReactNode;
  /** Sous le titre, en bas à gauche */
  basGauche?: ReactNode;
  /** Coin bas droit : durée, format, mention */
  basDroite?: ReactNode;
  /** Le plan entier devient un lien */
  href?: string;
  /** Densité du voile — 1 par défaut */
  voile?: number;
  className?: string;
};

/**
 * Le plan — l'unité de la direction « Plein Cadre ».
 *
 * L'image touche les quatre bords, le texte s'installe dans les angles.
 * Trois gestes à l'entrée, tous horizontaux ou d'échelle, jamais verticaux :
 * un volet découvre le plan, l'image se resserre de 1,16 à 1, et un second
 * volet découvre le titre de la gauche vers la droite.
 *
 * Le titre était d'abord animé par l'interlettrage, qui se refermait de
 * 0,14 em à −0,03. C'était un défaut : l'interlettrage change la largeur
 * mesurée du texte, donc l'endroit où il se coupe. « La lumière de juin »
 * commençait sur deux lignes (159 px) et finissait sur une (80 px) — le
 * titre sautait en pleine animation. Un volet ne touche pas à la mise en
 * page : le texte est composé une fois, à sa graisse définitive, et on ne
 * fait que le découvrir.
 *
 * Comme pour les planches, l'observateur d'intersection est porté par
 * l'enveloppe et non par la couche découpée : un élément entièrement
 * masqué a un ratio d'intersection nul et n'entrerait jamais « en vue ».
 */
export function Plan({
  image,
  hauteur = "grand",
  priority = false,
  sizes = "100vw",
  titre,
  hautGauche,
  basGauche,
  basDroite,
  href,
  voile = 1,
  className = "",
}: PlanProps) {
  const reduit = useReducedMotion();
  const cadre = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cadre,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const contenu = (
    <motion.div
      ref={cadre}
      className={`plan group ${HAUTEURS[hauteur]} ${className}`}
      initial={reduit ? undefined : "repos"}
      whileInView={reduit ? undefined : "entre"}
      viewport={seuilLarge}
    >
      {/* Volet : le plan se découvre par la gauche */}
      <motion.div
        className="absolute inset-0 z-1"
        variants={
          reduit
            ? undefined
            : {
                repos: { clipPath: "inset(0 100% 0 0)" },
                entre: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 1.15, ease: EASE_RIDEAU },
                },
              }
        }
      >
        <motion.div
          className="absolute"
          style={
            reduit
              ? { inset: 0 }
              : { top: "-5.5%", bottom: "-5.5%", left: 0, right: 0, y }
          }
        >
          <motion.div
            className="absolute inset-0"
            variants={
              reduit
                ? undefined
                : {
                    repos: { scale: 1.16 },
                    entre: {
                      scale: 1,
                      transition: { duration: 2.1, ease: EASE_MAISON },
                    },
                  }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              sizes={sizes}
              className={
                href
                  ? "object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  : "object-cover"
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <span aria-hidden className="voile" style={{ opacity: voile }} />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-3 opacity-[0.24] mix-blend-overlay"
        style={{
          backgroundImage: "var(--grain-texture)",
          backgroundSize: "180px 180px",
        }}
      />

      {hautGauche ? (
        <motion.div
          className="angle top-[calc(var(--spacing-gutter)+3.25rem)] left-[var(--spacing-gutter)]"
          variants={
            reduit
              ? undefined
              : {
                  repos: { opacity: 0 },
                  entre: {
                    opacity: 1,
                    transition: { duration: 1, ease: EASE_MAISON, delay: 0.45 },
                  },
                }
          }
        >
          {hautGauche}
        </motion.div>
      ) : null}

      <motion.div
        className="angle right-[var(--spacing-gutter)] bottom-[var(--spacing-gutter)] left-[var(--spacing-gutter)] gap-5"
        variants={
          reduit
            ? undefined
            : {
                repos: { opacity: 0 },
                entre: {
                  opacity: 1,
                  transition: { duration: 1.1, ease: EASE_MAISON, delay: 0.5 },
                },
              }
        }
      >
        {titre ? (
          <motion.h2
            className="max-w-[16ch] text-[length:var(--text-h1)] leading-[0.98] tracking-[-0.03em]"
            variants={
              reduit
                ? undefined
                : {
                    repos: { clipPath: "inset(0 100% 0 0)" },
                    entre: {
                      clipPath: "inset(0 0% 0 0)",
                      transition: {
                        duration: 1.25,
                        ease: EASE_RIDEAU,
                        delay: 0.45,
                      },
                    },
                  }
            }
          >
            {titre}
          </motion.h2>
        ) : null}
        {basGauche}
      </motion.div>

      {basDroite ? (
        <motion.div
          className="angle right-[var(--spacing-gutter)] bottom-[var(--spacing-gutter)] items-end text-right"
          variants={
            reduit
              ? undefined
              : {
                  repos: { opacity: 0 },
                  entre: {
                    opacity: 1,
                    transition: { duration: 1, ease: EASE_MAISON, delay: 0.65 },
                  },
                }
          }
        >
          {basDroite}
        </motion.div>
      ) : null}
    </motion.div>
  );

  if (!href) return <section className="text-paper">{contenu}</section>;

  return (
    <Link href={href} className="block text-paper">
      {contenu}
    </Link>
  );
}
