import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Plate } from "@/components/plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Chapeau, Etiquette, Filet, TitreSection } from "@/components/editorial";
import { collections, deroule, questions } from "@/content/collections";

export const metadata: Metadata = {
  title: "L'Expérience",
  description:
    "Trois collections — Le Reportage, La Maison, Sur Mesure — et le déroulé complet de l'accompagnement, de la première rencontre à l'album relié.",
};

export default function Experience() {
  return (
    <>
      <Masthead
        hauteur="court"
        etiquette="04 — L'Expérience"
        accent="tournesol"
        lignes={["Trois collections,", "un seul soin"]}
        chapeau={
          <p className="font-light">
            Les montants ci-dessous annoncent un niveau d&apos;exigence. Ils ne
            tiennent pas lieu de devis : chaque célébration est chiffrée après
            la rencontre.
          </p>
        }
        image={{
          src: "/plates/experience-large.jpg",
          alt: "Enfilade claire, lumière du matin",
        }}
      />

      {/* ——— Collections ——————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-x-10 gap-y-20 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.index} delay={i * 0.06} large>
              <article
                className={[
                  "flex h-full flex-col border-t pt-10",
                  c.mention ? "border-terre" : "border-ink/15",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="numeral text-[length:var(--text-h3)] text-greige">
                    {c.index}
                  </span>
                  {c.mention ? (
                    <span className="label-micro text-terre">{c.mention}</span>
                  ) : null}
                </div>

                <h2 className="mt-10 text-[length:var(--text-h3)] leading-none">
                  {c.intitule}
                </h2>
                <p className="label-micro mt-4 text-greige">{c.nom}</p>

                <p className="mt-8 text-ardoise">{c.description}</p>

                <ul className="mt-10 space-y-3 text-ardoise">
                  {c.inclus.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-[0.7em] h-px w-4 shrink-0 bg-greige"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-12">
                  <p className="label-micro text-greige">À partir de</p>
                  <p className="numeral mt-3 text-[length:var(--text-h3)]">
                    {c.apartir}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="label mt-20 max-w-2xl leading-[1.8] text-greige">
            Déplacements, repérages et hébergement chiffrés séparément, sans
            marge. Règlement en trois échéances, sans frais.
          </p>
        </Reveal>
      </section>

      {/* ——— Déroulé ——————————————————————————————————— */}
      <section className="grain relative bg-ink py-[var(--spacing-section)] text-paper">
        <div className="frame relative z-2">
          <Reveal>
            <Etiquette accent="tournesol" className="text-paper/60">Le déroulé</Etiquette>
            <TitreSection className="mt-10 max-w-2xl">
              De la première lettre à l&apos;objet posé sur votre table.
            </TitreSection>
          </Reveal>

          <Filet className="mt-16 text-paper" />

          <RevealGroup className="grid gap-x-10 gap-y-14 pt-16 md:grid-cols-2 lg:grid-cols-3" pas={0.08}>
            {deroule.map((e) => (
              <RevealItem key={e.index}>
                <p className="numeral text-[length:var(--text-h3)] text-paper/50">
                  {e.index}
                </p>
                <h3 className="mt-6 text-[length:var(--text-h3)] leading-none">
                  {e.titre}
                </h3>
                <p className="mt-6 text-paper/70">{e.texte}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ——— Une image, une respiration ————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Plate
              plate={{
                src: "/plates/experience-detail.jpg",
                alt: "Détail de tirage sur papier coton",
                ratio: "portrait",
              }}
              sizes="(max-width: 1024px) 100vw, 32vw"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:self-center">
            <Reveal>
              <Chapeau className="text-ardoise">
                Chaque collection comprend la conservation des fichiers sources
                pendant dix ans, la cession des droits d&apos;usage privé, et une
                galerie privée qui ne ferme jamais.
              </Chapeau>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Questions ————————————————————————————————— */}
      <section className="bg-albatre py-[var(--spacing-section)]">
        <div className="frame grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Etiquette accent="tournesol" className="text-greige">Questions</Etiquette>
              <TitreSection className="mt-10">
                Les six que l&apos;on nous pose toujours.
              </TitreSection>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {/* <details> natif : accessible au clavier, fonctionnel sans JS. */}
            {questions.map((item) => (
              <details key={item.q} className="group border-t border-ink/12">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-[length:var(--text-lead)] leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="relative h-3 w-3 shrink-0"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-500 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-xl pb-8 text-ardoise">{item.r}</p>
              </details>
            ))}
            <div className="border-t border-ink/12" />

            <Reveal delay={0.1}>
              <Link href="/contact" className="label link-draw mt-14 inline-block">
                Poser la vôtre
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
