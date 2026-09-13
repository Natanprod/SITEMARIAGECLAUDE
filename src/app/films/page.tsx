import type { Metadata } from "next";
import Link from "next/link";
import { Plan } from "@/components/plan";
import { Respiration } from "@/components/respiration";
import { FilmFrame } from "@/components/film-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { TitreAnime } from "@/components/titre-anime";
import { Chapeau, Etiquette, Filet } from "@/components/editorial";
import { films, procedeFilm } from "@/content/films";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Films de mariage tournés comme des courts-métrages : repérages, son direct, étalonnage sur mesure, 4K et 16 mm.",
};

export default function Films() {
  return (
    <>
      <Plan
        hauteur="grand"
        priority
        image={{ src: films[2].poster, alt: films[2].posterAlt }}
        titre="Des films, pas des souvenirs"
        hautGauche={<span className="label text-paper/60">03 — Le cinéma</span>}
        basGauche={
          <p className="max-w-lg text-paper/75">
            Le montage suit la course de la lumière, jamais le programme de la
            journée. Son direct, aucune musique posée avant la dernière minute.
          </p>
        }
        basDroite={
          <span className="label-micro text-terre-clair">
            Quatre films
          </span>
        }
      />

      {films.map((film, i) => (
        <FilmFrame
          key={film.slug}
          film={film}
          numero={String(i + 1).padStart(2, "0")}
        />
      ))}

      {/* ——— Le procédé ——————————————————————————————— */}
      <Respiration ton="albatre">
        <Reveal>
          <Etiquette accent="lilas" className="text-greige">
            Le procédé
          </Etiquette>
        </Reveal>
        <TitreAnime className="mt-10 max-w-2xl">
          Quatre mouvements, du repérage à l&apos;objet livré.
        </TitreAnime>

        <Filet className="mt-16 text-ink" />

        <RevealGroup
          className="grid gap-x-10 gap-y-16 pt-16 md:grid-cols-2 lg:grid-cols-4"
          pas={0.09}
        >
          {procedeFilm.map((etape) => (
            <RevealItem key={etape.index}>
              <p className="numeral text-[length:var(--text-h3)] text-greige">
                {etape.index}
              </p>
              <h3 className="mt-6 text-[length:var(--text-h3)] leading-none">
                {etape.titre}
              </h3>
              <p className="mt-6 text-ardoise">{etape.texte}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Respiration>

      <Respiration ton="encre" etroit className="text-center">
        <Reveal>
          <Chapeau className="text-paper/75">
            Les films sont livrés sur une page privée, protégés par mot de
            passe, et gravés sur support physique. Les rushes sont conservés
            dix ans.
          </Chapeau>
          <Link href="/contact" className="label link-draw mt-12 inline-block">
            Parler de votre film
          </Link>
        </Reveal>
      </Respiration>
    </>
  );
}
