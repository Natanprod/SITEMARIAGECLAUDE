import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Plate } from "@/components/plate";
import { StoryCard } from "@/components/story-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Chapeau, Etiquette, Filet, TitreSection } from "@/components/editorial";
import { maison, reperes, temoignages } from "@/content/site";
import { stories } from "@/content/stories";

const selection = stories.slice(0, 3);

const savoirFaire = [
  {
    index: "01",
    titre: "Photographie",
    texte:
      "Reportage éditorial, argentique et numérique mêlés. Aucune pose dirigée hors des vingt minutes de portraits. Une sélection sévère : quatre-vingt-quinze pour cent des images sont écartées.",
  },
  {
    index: "02",
    titre: "Film",
    texte:
      "Deux opérateurs, son direct, étalonnage construit pour chaque projet à partir d'une émulsion choisie au repérage. Un film qu'on regarde comme on regarde un court-métrage.",
  },
  {
    index: "03",
    titre: "Objets",
    texte:
      "Tirages fine art sur papier coton, albums reliés main, coffrets. Ce qui reste d'un mariage doit pouvoir se tenir, se transmettre, survivre aux disques durs.",
  },
];

export default function Accueil() {
  return (
    <>
      <Masthead
        etiquette={maison.signature}
        accent="terre"
        lignes={["Photographier", "un mariage", "comme une œuvre"]}
        chapeau={
          <p className="text-[length:var(--text-lead)] leading-[1.45] font-light">
            Maison d&apos;image fondée sur une conviction simple : une
            célébration mérite la même exigence qu&apos;une campagne, un
            éditorial, un film.
          </p>
        }
        meta={[maison.discipline, maison.rayon, "Douze mariages par an"]}
        image={{
          src: "/plates/ouverture.jpg",
          alt: "Lumière de fin de journée sur une façade de pierre",
        }}
      />

      {/* ——— Manifeste ————————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Etiquette index="01" accent="sauge" className="text-greige">
                Le propos
              </Etiquette>
            </Reveal>

            <Reveal delay={0.08}>
              <TitreSection className="mt-10 max-w-2xl">
                La plupart des mariages sont photographiés. Très peu sont
                regardés.
              </TitreSection>
            </Reveal>

            <RevealGroup className="mt-12 max-w-xl space-y-6 text-ardoise">
              <RevealItem as="p">
                Depuis dix ans, je travaille l&apos;image — le film publicitaire,
                la mode, le portrait. J&apos;ai porté dans le mariage ce que ces
                terrains exigent : une direction artistique, une lumière
                pensée, un montage, une sélection impitoyable.
              </RevealItem>
              <RevealItem as="p">
                Ce qui en résulte ne ressemble pas à un reportage de mariage.
                C&apos;est un document, tenu, silencieux, construit pour être
                regardé dans trente ans sans que la mode d&apos;une époque n&apos;y
                soit visible.
              </RevealItem>
              <RevealItem as="p">
                Je retiens douze célébrations par an. C&apos;est la seule manière
                d&apos;être présent avant, pendant, et surtout après — là où se
                joue l&apos;essentiel du travail.
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="numeral mt-16 max-w-md text-[length:var(--text-lead)] leading-[1.35] text-terre">
                {maison.baseline}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <Plate
              plate={{
                src: "/plates/accueil-manifeste.jpg",
                alt: "Intérieur clair, lumière de fin de matinée sur un mur de pierre",
                ratio: "portrait",
              }}
              legende="Domaine de Fontenille — Luberon, juin"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* ——— Repères ——————————————————————————————————— */}
      <section className="frame pb-[var(--spacing-section)]">
        <Filet className="text-ink" />
        <RevealGroup
          as="dl"
          className="grid grid-cols-2 gap-y-12 pt-14 md:grid-cols-4"
          pas={0.07}
        >
          {reperes.map((r) => (
            <RevealItem key={r.legende}>
              <dt className="numeral text-[length:var(--text-h2)] leading-none">
                {r.valeur}
                <span className="text-[0.38em] align-super ml-1 text-greige">
                  {r.suffixe}
                </span>
              </dt>
              <dd className="label-micro mt-5 max-w-[14ch] text-greige">
                {r.legende}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ——— Sélection d'histoires ————————————————————— */}
      <section className="bg-albatre py-[var(--spacing-section)]">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Etiquette index="02" accent="terre" className="text-greige">
                Histoires
              </Etiquette>
              <TitreSection className="mt-10 max-w-xl">
                Six célébrations, choisies pour ce qu&apos;elles ont exigé.
              </TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/histoires" className="label link-draw">
                Toutes les histoires
              </Link>
            </Reveal>
          </div>

          {/* Grille éditoriale : jamais trois colonnes égales. */}
          <div className="mt-20 grid gap-x-8 gap-y-20 md:grid-cols-12">
            <Reveal className="md:col-span-7" large>
              <StoryCard
                story={selection[0]}
                ratio="paysage"
                numero="01"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </Reveal>
            <Reveal className="md:col-span-5 md:pt-28" large>
              <StoryCard
                story={selection[1]}
                ratio="portrait"
                numero="02"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </Reveal>
            <Reveal className="md:col-span-8 md:col-start-4" large>
              <StoryCard
                story={selection[2]}
                ratio="cinema"
                numero="03"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Le film ——————————————————————————————————— */}
      <section className="grain relative bg-ink py-[var(--spacing-section)] text-paper">
        <div className="frame relative z-2">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Etiquette index="03" accent="lilas" className="text-paper/60">
                  Le cinéma
                </Etiquette>
                <TitreSection className="mt-10">
                  Un film, pas une vidéo de mariage.
                </TitreSection>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-10 text-paper/70">
                  Nous tournons comme on tourne une fiction courte : repérages,
                  découpage, son direct, étalonnage sur mesure. Le montage suit
                  la lumière du jour plutôt que le déroulé du programme.
                </p>
                <Link href="/films" className="label link-draw mt-12 inline-block">
                  Voir les films
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Plate
                plate={{
                  src: "/plates/accueil-film.jpg",
                  alt: "Image extraite d'un film de mariage, crépuscule sur une terrasse",
                  ratio: "cinema",
                }}
                legende="Extrait — « La lumière de juin », 7'12, 2.39:1"
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Savoir-faire ————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <Reveal>
          <Etiquette index="04" accent="tournesol" className="text-greige">
            Savoir-faire
          </Etiquette>
        </Reveal>
        <Filet className="mt-10 text-ink" />
        <RevealGroup className="grid gap-x-10 gap-y-16 pt-16 md:grid-cols-3" pas={0.1}>
          {savoirFaire.map((s) => (
            <RevealItem key={s.index}>
              <p className="label-micro text-greige">{s.index}</p>
              <h3 className="mt-6 text-[length:var(--text-h3)] leading-none">
                {s.titre}
              </h3>
              <p className="mt-6 text-ardoise">{s.texte}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ——— Témoignage ——————————————————————————————— */}
      <section className="bg-albatre py-[var(--spacing-section)]">
        <div className="frame-narrow text-center">
          <Reveal geste="fondu">
            <blockquote>
              <p className="text-[length:var(--text-h3)] leading-[1.35] font-light">
                « {temoignages[0].texte} »
              </p>
              <footer className="label-micro mt-12 text-greige">
                {temoignages[0].auteur} — {temoignages[0].lieu}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ——— Invitation ——————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Plate
              plate={{
                src: "/plates/accueil-savoir-faire.jpg",
                alt: "Atelier de tirage, lumière basse sur une table de travail",
                ratio: "paysage",
              }}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Etiquette index="05" accent="sauge" className="text-greige">
                Nous écrire
              </Etiquette>
              <TitreSection className="mt-10">
                Dites-nous la date, le lieu, et ce que vous voulez garder.
              </TitreSection>
            </Reveal>
            <Reveal delay={0.08}>
              <Chapeau className="mt-10 max-w-lg text-ardoise">
                Nous répondons à chaque lettre sous quarante-huit heures, par
                une note d&apos;intention écrite — pas par une plaquette
                tarifaire.
              </Chapeau>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Link href="/contact" className="label link-draw">
                  Prendre contact
                </Link>
                <Link href="/experience" className="label link-erase text-greige">
                  Voir les collections
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
