import type { Metadata } from "next";
import { Masthead } from "@/components/masthead";
import { StoryCard } from "@/components/story-card";
import { Reveal } from "@/components/reveal";
import { Filet } from "@/components/editorial";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Histoires",
  description:
    "Six célébrations photographiées et filmées comme des œuvres : Luberon, Île-de-France, Pouilles, Côte d'Azur, Paris, Portugal.",
};

/**
 * L'index des histoires.
 * Rythme volontairement irrégulier : une planche pleine largeur, puis deux
 * colonnes décalées. Le regard ne doit jamais s'installer dans une grille.
 */
const RYTHME = [
  { col: "md:col-span-12", ratio: "cinema", sizes: "100vw", pt: "" },
  { col: "md:col-span-6", ratio: "portrait", sizes: "50vw", pt: "" },
  { col: "md:col-span-5 md:col-start-8", ratio: "paysage", sizes: "45vw", pt: "md:pt-32" },
  { col: "md:col-span-7", ratio: "paysage", sizes: "58vw", pt: "" },
  { col: "md:col-span-4 md:col-start-9", ratio: "portrait", sizes: "35vw", pt: "md:pt-20" },
  { col: "md:col-span-9 md:col-start-3", ratio: "cinema", sizes: "75vw", pt: "" },
] as const;

export default function Histoires() {
  return (
    <>
      <Masthead
        hauteur="court"
        etiquette="02 — Histoires"
        accent="terre"
        lignes={["Six célébrations,", "six exigences"]}
        chapeau={
          <p className="font-light">
            Chaque mariage impose sa contrainte : une lumière, un lieu, un
            nombre. Ces six-là ont été retenus pour ce qu&apos;ils ont demandé.
          </p>
        }
        image={{
          src: "/plates/histoires-ouverture.jpg",
          alt: "Intérieur sombre traversé par un pan de lumière",
        }}
      />

      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-x-8 gap-y-24 md:grid-cols-12">
          {stories.map((story, i) => {
            const r = RYTHME[i % RYTHME.length];
            return (
              <Reveal
                key={story.slug}
                className={`${r.col} ${r.pt}`}
                large
              >
                <StoryCard
                  story={story}
                  ratio={r.ratio}
                  numero={String(i + 1).padStart(2, "0")}
                  sizes={`(max-width: 768px) 100vw, ${r.sizes}`}
                />
              </Reveal>
            );
          })}
        </div>

        <Filet className="mt-28 text-ink" />
        <Reveal>
          <p className="label mt-10 text-greige">
            Une part importante de notre travail n&apos;est jamais publiée.
          </p>
        </Reveal>
      </section>
    </>
  );
}
