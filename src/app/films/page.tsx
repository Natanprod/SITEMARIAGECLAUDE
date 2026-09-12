import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { FilmFrame } from "@/components/film-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Chapeau, Etiquette, Filet, TitreSection } from "@/components/editorial";
import { films, procedeFilm } from "@/content/films";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Films de mariage tournés comme des courts-métrages : repérages, son direct, étalonnage sur mesure, 4K et 16 mm.",
};

export default function Films() {
  return (
    <>
      <Masthead
        hauteur="court"
        etiquette="03 — Le cinéma"
        accent="lilas"
        lignes={["Des films,", "pas des souvenirs"]}
        chapeau={
          <p className="font-light">
            Le montage suit la course de la lumière, jamais le programme de la
            journée. Son direct, aucune musique posée avant la dernière minute.
          </p>
        }
        image={{
          src: "/plates/film-nocturne.jpg",
          alt: "Image extraite d'un film, rue nocturne",
        }}
      />

      <section className="frame py-[var(--spacing-section)]">
        <div className="space-y-[var(--spacing-section)]">
          {films.map((film, i) => (
            <article key={film.slug} className="grid gap-10 lg:grid-cols-12">
              <div className={i % 2 === 0 ? "lg:col-span-8" : "lg:col-span-8 lg:order-2 lg:col-start-5"}>
                <FilmFrame film={film} priority={i === 0} />
              </div>
              <div
                className={
                  i % 2 === 0
                    ? "lg:col-span-3 lg:col-start-10"
                    : "lg:col-span-3 lg:order-1 lg:col-start-1"
                }
              >
                <Reveal>
                  <p className="label-micro text-greige">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-8 text-ardoise">{film.note}</p>
                  <dl className="mt-10 space-y-4">
                    {[
                      ["Durée", film.duree],
                      ["Format", film.format],
                      ["Année", film.annee],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6 border-b border-ink/10 pb-2">
                        <dt className="label-micro text-greige">{k}</dt>
                        <dd className="label-micro">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Le procédé ——————————————————————————————— */}
      <section className="grain relative bg-ink py-[var(--spacing-section)] text-paper">
        <div className="frame relative z-2">
          <Reveal>
            <Etiquette accent="lilas" className="text-paper/60">Le procédé</Etiquette>
            <TitreSection className="mt-10 max-w-2xl">
              Quatre mouvements, du repérage à l&apos;objet livré.
            </TitreSection>
          </Reveal>

          <Filet className="mt-16 text-paper" />

          <RevealGroup className="grid gap-x-10 gap-y-16 pt-16 md:grid-cols-2 lg:grid-cols-4" pas={0.09}>
            {procedeFilm.map((etape) => (
              <RevealItem key={etape.index}>
                <p className="numeral text-[length:var(--text-h3)] text-paper/50">
                  {etape.index}
                </p>
                <h3 className="mt-6 text-[length:var(--text-h3)] leading-none">
                  {etape.titre}
                </h3>
                <p className="mt-6 text-paper/70">{etape.texte}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="frame py-[var(--spacing-section)]">
        <div className="frame-narrow px-0 text-center">
          <Reveal>
            <Chapeau className="text-ardoise">
              Les films sont livrés sur une page privée, protégés par mot de
              passe, et gravés sur support physique. Les rushes sont conservés
              dix ans.
            </Chapeau>
            <Link href="/contact" className="label link-draw mt-12 inline-block">
              Parler de votre film
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
