"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ratios, type Plate as PlateType, type Ratio } from "@/content/stories";
import { rideauImage, seuilLarge, zoomImage } from "@/lib/motion";

type PlateProps = {
  plate: PlateType;
  /** Force un ratio différent de celui déclaré dans le contenu */
  ratio?: Ratio;
  /** Légende éditoriale placée sous la planche */
  legende?: string;
  /** Chargement prioritaire — réservé à la première image de la page */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Le survol rapproche l'image : uniquement sur les planches cliquables */
  interactive?: boolean;
};

/**
 * La planche — l'unité d'image du site.
 *
 * Le cadre s'ouvre, l'image se remet à l'échelle : jamais l'inverse.
 * Un grain argentique est posé par-dessus pour lier toutes les images
 * entre elles, quelle que soit leur provenance.
 *
 * Structure en quatre couches, et ce n'est pas cosmétique : l'observateur
 * d'intersection est porté par la couche extérieure, jamais par celle qui
 * porte le `clip-path`. Un élément entièrement découpé a un ratio
 * d'intersection nul — il n'entre jamais « en vue », et l'animation ne
 * se déclencherait pas.
 *
 * La couche de parallaxe est volontairement plus haute que son cadre
 * (13 %, débordant de part et d'autre) : c'est cette marge qui permet à
 * l'image de dériver sans jamais découvrir le fond.
 */
export function Plate({
  plate,
  ratio,
  legende,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw",
  className = "",
  interactive = false,
}: PlateProps) {
  const reduit = useReducedMotion();
  const dims = ratios[ratio ?? plate.ratio];
  const cadre = useRef<HTMLElement>(null);

  // L'image dérive un peu moins vite que son cadre : pris isolément le
  // mouvement est invisible, sur une page entière il donne la profondeur.
  const { scrollYProgress } = useScroll({
    target: cadre,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <figure ref={cadre} className={className}>
      <motion.div
        className="relative w-full overflow-hidden bg-ardoise"
        style={{ aspectRatio: `${dims.w} / ${dims.h}` }}
        initial={reduit ? undefined : "repos"}
        whileInView={reduit ? undefined : "entre"}
        viewport={seuilLarge}
      >
        <motion.div
          className="absolute inset-0"
          variants={reduit ? undefined : rideauImage}
        >
          <motion.div
            className="absolute"
            style={
              reduit
                ? { inset: 0 }
                : { top: "-6.5%", bottom: "-6.5%", left: 0, right: 0, y }
            }
          >
            <motion.div
              className="absolute inset-0"
              variants={reduit ? undefined : zoomImage}
            >
              <Image
                src={plate.src}
                alt={plate.alt}
                fill
                priority={priority}
                sizes={sizes}
                className={[
                  "object-cover",
                  interactive
                    ? "transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    : "",
                ].join(" ")}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Grain : la signature argentique, posée sur chaque image */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
          style={{
            backgroundImage: "var(--grain-texture)",
            backgroundSize: "180px 180px",
          }}
        />
      </motion.div>

      {legende ? (
        <figcaption className="label-micro mt-4 opacity-65">{legende}</figcaption>
      ) : null}
    </figure>
  );
}
