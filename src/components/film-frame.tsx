"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Film } from "@/content/films";
import { rideauImage, seuilLarge, zoomImage } from "@/lib/motion";

/**
 * Le cadre de film.
 *
 * Tant qu'aucune source vidéo n'est renseignée, aucune commande de lecture
 * n'est affichée : on ne promet pas une lecture qui n'existe pas. Dès qu'une
 * URL est fournie, la planche devient un lecteur.
 */
export function FilmFrame({
  film,
  sizes = "(max-width: 1024px) 100vw, 70vw",
  priority = false,
}: {
  film: Film;
  sizes?: string;
  priority?: boolean;
}) {
  const [lecture, setLecture] = useState(false);
  const reduit = useReducedMotion();
  const jouable = Boolean(film.source);

  return (
    <motion.div
      className="group relative w-full overflow-hidden bg-ink"
      style={{ aspectRatio: "16 / 9" }}
      initial={reduit ? undefined : "repos"}
      whileInView={reduit ? undefined : "entre"}
      viewport={seuilLarge}
    >
      {lecture && film.source ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={film.source}
          poster={film.poster}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            variants={reduit ? undefined : rideauImage}
          >
          <motion.div
            className="absolute inset-0"
            variants={reduit ? undefined : zoomImage}
          >
            <Image
              src={film.poster}
              alt={film.posterAlt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </motion.div>
          </motion.div>

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/10 to-noir/25"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.26] mix-blend-overlay"
            style={{
              backgroundImage: "var(--grain-texture)",
              backgroundSize: "180px 180px",
            }}
          />

          {/* Amorces de cadre : les deux traits d'un viseur, rien de plus. */}
          <span
            aria-hidden
            className="absolute top-6 left-6 h-6 w-6 border-t border-l border-paper/35 md:top-8 md:left-8"
          />
          <span
            aria-hidden
            className="absolute top-6 right-6 h-6 w-6 border-t border-r border-paper/35 md:top-8 md:right-8"
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 text-paper md:p-10">
            <div>
              <h3 className="text-[length:var(--text-h3)] leading-none">
                {film.titre}
              </h3>
              <p className="label-micro mt-4 text-paper/70">
                {film.couple} — {film.lieu}
              </p>
            </div>

            {jouable ? (
              <button
                type="button"
                onClick={() => setLecture(true)}
                className="label border border-paper/40 px-6 py-3 text-[0.6875rem] transition-colors duration-500 hover:bg-paper hover:text-ink"
              >
                Lire — {film.duree}
              </button>
            ) : (
              <p className="label-micro text-paper/70">
                {film.duree} · {film.format}
              </p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
