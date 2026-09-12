"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_MAISON, EASE_RIDEAU, motMonte } from "@/lib/motion";
import { ACCENTS, type Accent } from "@/components/editorial";

type MastheadProps = {
  /** Petite capitale au-dessus du titre */
  etiquette: string;
  /** Accent champêtre de la section — un trait, rien de plus */
  accent?: Accent;
  /** Le titre, ligne par ligne : chaque ligne monte derrière son propre cache */
  lignes: string[];
  /** Ligne de pied : discipline, lieu, année… */
  meta?: string[];
  chapeau?: ReactNode;
  image: { src: string; alt: string };
  /** `plein` pour l'accueil, `court` pour les pages intérieures */
  hauteur?: "plein" | "court";
  /** Densité du voile posé sur l'image */
  voile?: number;
};

/**
 * Le bandeau d'ouverture.
 *
 * Toutes les pages commencent par lui : fond encre, image en retrait,
 * titre qui monte derrière un cache. C'est la constante qui tient le site —
 * on reconnaît la maison avant d'avoir lu un mot.
 */
export function Masthead({
  etiquette,
  accent,
  lignes,
  meta,
  chapeau,
  image,
  hauteur = "plein",
  voile = 0.55,
}: MastheadProps) {
  const reduit = useReducedMotion();
  const cadre = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cadre,
    offset: ["start start", "end start"],
  });

  // Parallaxe : l'image reste un peu en arrière, le texte s'efface.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacite = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={cadre}
      className={[
        "grain relative flex w-full flex-col justify-end overflow-hidden bg-ink text-paper",
        hauteur === "plein"
          ? "min-h-[100svh] pb-14 md:pb-20"
          : "min-h-[72svh] pt-40 pb-16 md:min-h-[78svh] md:pb-20",
      ].join(" ")}
    >
      <motion.div
        className="absolute inset-0 -z-0"
        style={reduit ? undefined : { y }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(10,10,9,${Math.min(voile + 0.35, 0.95)}) 0%, rgba(10,10,9,${voile}) 45%, rgba(10,10,9,${voile + 0.12}) 100%)`,
          }}
        />
      </motion.div>

      <motion.div
        className="frame relative z-2"
        style={reduit ? undefined : { opacity: opacite }}
      >
        <motion.p
          className="label flex items-center gap-4 text-paper/60"
          initial={reduit ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_MAISON }}
        >
          {accent ? (
            <span aria-hidden className={`h-px w-5 shrink-0 ${ACCENTS[accent]}`} />
          ) : null}
          {etiquette}
        </motion.p>

        <h1 className="mt-8 text-[length:var(--text-h1)] leading-[0.98] tracking-[-0.025em]">
          {lignes.map((ligne, i) => (
            <span key={ligne} className="block overflow-hidden py-[0.06em]">
              <motion.span
                className="block"
                variants={reduit ? undefined : motMonte}
                initial={reduit ? false : "repos"}
                animate="entre"
                transition={{
                  duration: 1.05,
                  ease: EASE_RIDEAU,
                  delay: 0.35 + i * 0.11,
                }}
              >
                {ligne}
              </motion.span>
            </span>
          ))}
        </h1>

        {chapeau ? (
          <motion.div
            className="mt-9 max-w-xl text-paper/75"
            initial={reduit ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease: EASE_MAISON }}
          >
            {chapeau}
          </motion.div>
        ) : null}

        {meta?.length ? (
          <motion.div
            className="mt-14"
            initial={reduit ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.95, ease: EASE_MAISON }}
          >
            <div className="rule text-paper" />
            <dl className="label-micro flex flex-wrap gap-x-10 gap-y-3 pt-5 tracking-[0.24em] text-paper/60 sm:tracking-[0.42em]">
              {meta.map((m) => (
                <dd key={m}>{m}</dd>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </motion.div>

      {hauteur === "plein" ? (
        <motion.div
          aria-hidden
          className="frame relative z-2 mt-12"
          initial={reduit ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.3 }}
        >
          <div className="flex items-center gap-4 text-paper/55">
            <span className="label-micro">Défiler</span>
            <span className="h-px w-16 origin-left bg-current" />
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
