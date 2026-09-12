import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Plate } from "@/components/plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Chapeau, Etiquette, Filet, TitreSection } from "@/components/editorial";
import { maison, reperes, temoignages } from "@/content/site";

export const metadata: Metadata = {
  title: "La Maison",
  description:
    "Dix ans d'image — publicité, mode, portrait — portés dans le mariage. Direction artistique, argentique, film. Douze célébrations par an.",
};

const principes = [
  {
    index: "I",
    titre: "La lumière avant le sujet",
    texte:
      "Nous repérons chaque lieu à l'heure exacte de la célébration. Un cadre se décide avant que quiconque n'y entre.",
  },
  {
    index: "II",
    titre: "L'effacement",
    texte:
      "Aucune consigne donnée, aucune scène rejouée, hors des vingt minutes de portraits. L'intimité se gagne par la distance, pas par la familiarité.",
  },
  {
    index: "III",
    titre: "La sélection",
    texte:
      "Quatre-vingt-quinze pour cent de ce que nous produisons est écarté. C'est la part la plus longue du travail, et la seule qui fasse une différence visible.",
  },
  {
    index: "IV",
    titre: "L'objet",
    texte:
      "Un fichier n'est pas un souvenir. Tirages coton, albums reliés main, coffrets : ce qui reste doit pouvoir se tenir dans une main et se transmettre.",
  },
];

const refus = [
  "Les poses dirigées et les mises en scène",
  "Les retouches qui modifient un visage",
  "Les filtres et les rendus à la mode",
  "Les formules à trois niveaux vendues sans rencontre",
  "Les publications sans votre accord écrit",
  "Plus de douze mariages par an",
];

export default function Maison() {
  return (
    <>
      <Masthead
        hauteur="court"
        etiquette="01 — La Maison"
        accent="sauge"
        lignes={["Dix ans d'image,", "portés dans", "le mariage"]}
        image={{
          src: "/plates/maison-large.jpg",
          alt: "Atelier au crépuscule, lumière basse",
        }}
      />

      {/* ——— Portrait & propos ————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Plate
              plate={{
                src: "/plates/maison-portrait.jpg",
                alt: "Portrait de l'auteur dans l'atelier, lumière latérale",
                ratio: "portrait",
              }}
              legende={`${maison.nom} — atelier, ${maison.ville}`}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Etiquette accent="sauge" className="text-greige">Le parcours</Etiquette>
              <TitreSection className="mt-10">
                Je suis venu au mariage par le film, pas l&apos;inverse.
              </TitreSection>
            </Reveal>

            <RevealGroup className="mt-12 space-y-6 text-ardoise">
              <RevealItem as="p">
                J&apos;ai passé dix ans à faire des images pour d&apos;autres —
                campagnes, éditoriaux de mode, portraits, films courts. J&apos;y ai
                appris une chose qui ne se négocie pas : une image se prépare
                avant d&apos;être prise, et se choisit longtemps après.
              </RevealItem>
              <RevealItem as="p">
                Le mariage est arrivé comme un terrain plus exigeant que tous les
                autres. Une seule prise, aucun retour en arrière, et des visages
                qui comptent réellement pour quelqu&apos;un. Il n&apos;existe pas de
                commande plus sérieuse.
              </RevealItem>
              <RevealItem as="p">
                J&apos;ai donc appliqué au mariage ce que la publicité exige et ce
                que le cinéma enseigne : un repérage, une direction artistique,
                une lumière pensée, un montage — et le refus absolu de la
                production en volume.
              </RevealItem>
              <RevealItem as="p">
                Aujourd&apos;hui, la maison retient douze célébrations par an, en
                France et à l&apos;étranger, photographie et film menés par une
                seule et même direction.
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="numeral mt-14 max-w-md text-[length:var(--text-lead)] leading-[1.35] text-terre">
                « {maison.baseline} »
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Repères —————————————————————————————————— */}
      <section className="bg-albatre py-[var(--spacing-section)]">
        <div className="frame">
          <Reveal>
            <Etiquette accent="sauge" className="text-greige">Repères</Etiquette>
          </Reveal>
          <Filet className="mt-10 text-ink" />
          <RevealGroup as="dl" className="grid grid-cols-2 gap-y-12 pt-14 md:grid-cols-4" pas={0.07}>
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
        </div>
      </section>

      {/* ——— Principes ———————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Etiquette accent="sauge" className="text-greige">Quatre principes</Etiquette>
              <TitreSection className="mt-10">
                Une méthode, tenue depuis le premier jour.
              </TitreSection>
            </Reveal>
          </div>

          <RevealGroup className="lg:col-span-7 lg:col-start-6" pas={0.09}>
            {principes.map((p) => (
              <RevealItem key={p.index}>
                <div className="flex gap-8 border-t border-ink/12 py-10">
                  <span className="numeral w-10 shrink-0 text-[length:var(--text-h3)] text-greige">
                    {p.index}
                  </span>
                  <div>
                    <h3 className="text-[length:var(--text-h3)] leading-none">
                      {p.titre}
                    </h3>
                    <p className="mt-5 text-ardoise">{p.texte}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ——— Ce que nous ne faisons pas ————————————————— */}
      <section className="grain relative bg-ink py-[var(--spacing-section)] text-paper">
        <div className="frame relative z-2 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Etiquette accent="terre" className="text-paper/60">Par principe</Etiquette>
              <TitreSection className="mt-10">
                Ce que la maison ne fait pas.
              </TitreSection>
              <Chapeau className="mt-10 text-paper/70">
                Une maison se définit autant par ses refus que par son
                catalogue.
              </Chapeau>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="lg:col-span-6 lg:col-start-7" pas={0.07}>
            {refus.map((r) => (
              <RevealItem as="li" key={r}>
                <span className="flex items-baseline gap-6 border-b border-paper/12 py-5 text-paper/85">
                  <span aria-hidden className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-terre" />
                  {r}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ——— Deux images ——————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          <Reveal className="md:col-span-7" large>
            <Plate
              plate={{
                src: "/plates/maison-atelier.jpg",
                alt: "Table de travail, tirages en cours de sélection",
                ratio: "paysage",
              }}
              legende="L'édition — six à huit semaines par mariage"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:pt-24" large>
            <Plate
              plate={{
                src: "/plates/maison-matiere.jpg",
                alt: "Détail de papier coton et de reliure",
                ratio: "carre",
              }}
              legende="Papier coton, reliure main"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ——— Témoignages ——————————————————————————————— */}
      <section className="bg-albatre py-[var(--spacing-section)]">
        <div className="frame">
          <Reveal>
            <Etiquette className="text-greige">Ce qu&apos;ils en disent</Etiquette>
          </Reveal>
          <RevealGroup className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3" pas={0.1}>
            {temoignages.map((t) => (
              <RevealItem key={t.auteur}>
                <blockquote>
                  <p className="text-ardoise">« {t.texte} »</p>
                  <footer className="label-micro mt-8 text-greige">
                    {t.auteur} — {t.lieu}
                  </footer>
                </blockquote>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Link href="/experience" className="label link-draw mt-20 inline-block">
              Découvrir l&apos;expérience
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
