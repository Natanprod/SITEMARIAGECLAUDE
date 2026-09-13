"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Film } from "@/content/films";
import { EASE_MAISON, EASE_RIDEAU, gestes, seuilLarge } from "@/lib/motion";

/**
 * Le plan de film.
 *
 * Même construction que <Plan> — volet horizontal, échelle qui se resserre,
 * texte dans les angles — mais il peut devenir un lecteur. Tant qu'aucune
 * source vidéo n'est renseignée, aucune commande de lecture n'est affichée :
 * on ne promet pas une lecture qui n'existe pas.
 */
export function FilmFrame({
  film,
  numero,
  priority = false,
}: {
  film: Film;
  numero: string;
  priority?: boolean;
}) {
  const [lecture, setLecture] = useState(false);
  const reduit = useReducedMotion();
  const jouable = Boolean(film.source);

  if (lecture && film.source) {
    return (
      <section className="plan h-[80svh] min-h-[26rem] bg-noir">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          src={film.source}
          poster={film.poster}
          controls
          autoPlay
          playsInline
        />
      </section>
    );
  }

  return (
    <motion.section
      className="plan group h-[80svh] min-h-[26rem] text-paper"
      initial="repos"
      whileInView="entre"
      viewport={seuilLarge}
    >
      <motion.div
        className="absolute inset-0 z-1"
        variants={
          gestes(reduit, {
                repos: { clipPath: "inset(0 100% 0 0)" },
                entre: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 1.15, ease: EASE_RIDEAU },
                },
              })
        }
      >
        <motion.div
          className="absolute inset-0"
          variants={
            gestes(reduit, {
                  repos: { scale: 1.16 },
                  entre: {
                    scale: 1,
                    transition: { duration: 2.1, ease: EASE_MAISON },
                  },
                })
          }
        >
          <Image
            src={film.poster}
            alt={film.posterAlt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <span aria-hidden className="voile" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-3 opacity-[0.24] mix-blend-overlay"
        style={{
          backgroundImage: "var(--grain-texture)",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Amorces de cadre : les deux traits d'un viseur, rien de plus. */}
      <span
        aria-hidden
        className="absolute top-[calc(var(--spacing-gutter)+3.25rem)] left-[var(--spacing-gutter)] z-3 h-7 w-7 border-t border-l border-paper/35"
      />
      <span
        aria-hidden
        className="absolute top-[calc(var(--spacing-gutter)+3.25rem)] right-[var(--spacing-gutter)] z-3 h-7 w-7 border-t border-r border-paper/35"
      />

      <div className="angle top-[calc(var(--spacing-gutter)+3.25rem)] left-[calc(var(--spacing-gutter)+2.5rem)]">
        <span className="label-micro text-paper/60">
          {numero} — {film.lieu}
        </span>
      </div>

      <div className="angle right-[var(--spacing-gutter)] bottom-[var(--spacing-gutter)] left-[var(--spacing-gutter)] gap-5">
        <h2 className="text-[length:var(--text-h1)] leading-[0.98] tracking-[-0.03em]">
          {film.titre}
        </h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          <span className="label-micro text-paper/60">
            {film.couple} · {film.annee}
          </span>
          {jouable ? (
            <button
              type="button"
              onClick={() => setLecture(true)}
              className="label border border-paper/40 px-6 py-3 text-[0.6875rem] transition-colors duration-500 hover:bg-paper hover:text-ink"
            >
              Lire — {film.duree}
            </button>
          ) : null}
        </div>
      </div>

      <div className="angle right-[var(--spacing-gutter)] bottom-[var(--spacing-gutter)] items-end text-right">
        <span className="numeral text-[length:var(--text-h3)]">{film.duree}</span>
        <span className="label-micro text-paper/60">{film.format}</span>
      </div>
    </motion.section>
  );
}
