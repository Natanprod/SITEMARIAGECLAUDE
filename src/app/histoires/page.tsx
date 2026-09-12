import type { Metadata } from "next";
import { Plan } from "@/components/plan";
import { Respiration } from "@/components/respiration";
import { Reveal } from "@/components/reveal";
import { TitreAnime } from "@/components/titre-anime";
import { Etiquette } from "@/components/editorial";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Histoires",
  description:
    "Six célébrations photographiées et filmées comme des œuvres : Luberon, Île-de-France, Pouilles, Côte d'Azur, Paris, Portugal.",
};

/**
 * L'index des histoires en plein cadre.
 *
 * Plus de grille : une célébration par plan, dans l'ordre, comme on
 * déroulerait une bobine. C'est la page où la direction se justifie le
 * mieux — chaque mariage tient l'écran seul, sans voisinage.
 */
export default function Histoires() {
  return (
    <>
      <Plan
        hauteur="grand"
        priority
        image={{
          src: "/plates/histoires-ouverture.jpg",
          alt: "Intérieur sombre traversé par un pan de lumière",
        }}
        titre="Six célébrations, six exigences"
        hautGauche={<span className="label text-paper/60">02 — Histoires</span>}
        basGauche={
          <p className="max-w-lg text-paper/75">
            Chaque mariage impose sa contrainte : une lumière, un lieu, un
            nombre. Ces six-là ont été retenus pour ce qu&apos;ils ont demandé.
          </p>
        }
        basDroite={
          <span className="label-micro text-terre-clair">Six plans</span>
        }
      />

      {stories.map((story, i) => (
        <Plan
          key={story.slug}
          href={`/histoires/${story.slug}`}
          hauteur={i % 3 === 1 ? "moyen" : "grand"}
          image={story.couverture}
          titre={story.titre}
          hautGauche={
            <span className="label-micro text-paper/60">
              Nº {String(i + 1).padStart(2, "0")} — {story.region}
            </span>
          }
          basGauche={
            <span className="label-micro text-paper/60">
              {story.couple} · {story.lieu} · {story.saison} {story.annee}
            </span>
          }
          basDroite={
            <span className="label-micro text-paper/60">
              Voir l&apos;histoire
            </span>
          }
        />
      ))}

      <Respiration ton="encre" etroit className="text-center">
        <Reveal>
          <Etiquette accent="terre" className="justify-center text-brume">
            Ce qui n&apos;est pas montré
          </Etiquette>
        </Reveal>
        <TitreAnime geste="dilate" className="mt-10">
          Une part importante de notre travail n&apos;est jamais publiée.
        </TitreAnime>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-paper/70">
            Aucun mariage n&apos;est publié sans accord écrit. Cela convient
            parfaitement à la maison.
          </p>
        </Reveal>
      </Respiration>
    </>
  );
}
