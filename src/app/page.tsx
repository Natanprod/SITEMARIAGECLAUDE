import Link from "next/link";
import { Plan } from "@/components/plan";
import { Respiration } from "@/components/respiration";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { TitreAnime } from "@/components/titre-anime";
import { Etiquette, Filet } from "@/components/editorial";
import { maison, reperes, temoignages } from "@/content/site";
import { stories } from "@/content/stories";
import { films } from "@/content/films";

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
      {/* ——— Plan d'ouverture ————————————————————————— */}
      <Plan
        hauteur="plein"
        priority
        image={{
          src: "/plates/ouverture.jpg",
          alt: "Lumière de fin de journée sur une façade de pierre",
        }}
        titre="Photographier un mariage comme une œuvre"
        hautGauche={<span className="label text-paper/60">{maison.signature}</span>}
        basGauche={
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <span className="label-micro text-paper/60">{maison.discipline}</span>
            <span className="label-micro text-paper/60">{maison.rayon}</span>
            <span className="label-micro text-paper/60">Douze mariages par an</span>
          </div>
        }
        basDroite={
          <span className="label-micro text-terre-clair">Défiler</span>
        }
      />

      {/* ——— Première histoire ————————————————————————— */}
      <Plan
        href={`/histoires/${selection[0].slug}`}
        image={selection[0].couverture}
        titre={selection[0].titre}
        hautGauche={
          <span className="label-micro text-paper/60">
            Nº 01 — {selection[0].region}
          </span>
        }
        basGauche={
          <span className="label-micro text-paper/60">
            {selection[0].couple} · {selection[0].saison} {selection[0].annee}
          </span>
        }
        basDroite={
          <span className="label-micro text-paper/60">Voir l&apos;histoire</span>
        }
      />

      {/* ——— Respiration : le propos ————————————————————— */}
      <Respiration>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Etiquette index="01" accent="terre" className="text-greige">
                Le propos
              </Etiquette>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <TitreAnime className="max-w-2xl">
              La plupart des mariages sont photographiés. Très peu sont
              regardés.
            </TitreAnime>

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
              <p className="numeral mt-14 max-w-md text-[length:var(--text-lead)] leading-[1.35] text-terre">
                {maison.baseline}
              </p>
            </Reveal>
          </div>
        </div>
      </Respiration>

      {/* ——— Deuxième histoire ————————————————————————— */}
      <Plan
        href={`/histoires/${selection[1].slug}`}
        image={selection[1].couverture}
        titre={selection[1].titre}
        hautGauche={
          <span className="label-micro text-paper/60">
            Nº 02 — {selection[1].region}
          </span>
        }
        basGauche={
          <span className="label-micro text-paper/60">
            {selection[1].couple} · {selection[1].saison} {selection[1].annee}
          </span>
        }
        basDroite={
          <span className="label-micro text-paper/60">Voir l&apos;histoire</span>
        }
      />

      {/* ——— Le film ——————————————————————————————————— */}
      <Plan
        href="/films"
        hauteur="grand"
        image={{ src: films[0].poster, alt: films[0].posterAlt }}
        titre="Un film, pas une vidéo de mariage"
        hautGauche={
          <span className="label-micro text-paper/60">Le cinéma</span>
        }
        basGauche={
          <p className="max-w-md text-paper/75">
            Repérages, découpage, son direct, étalonnage sur mesure. Le montage
            suit la lumière du jour plutôt que le déroulé du programme.
          </p>
        }
        basDroite={
          <>
            <span className="numeral text-[length:var(--text-h3)]">
              {films[0].duree}
            </span>
            <span className="label-micro text-paper/60">{films[0].format}</span>
          </>
        }
      />

      {/* ——— Respiration : savoir-faire et repères ——————— */}
      <Respiration ton="albatre">
        <Reveal>
          <Etiquette index="02" accent="sauge" className="text-greige">
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

        <Filet className="mt-20 text-ink" />
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
              <dd className="label-micro mt-5 max-w-[22ch] tracking-[0.2em] text-greige">
                {r.legende}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Respiration>

      {/* ——— Troisième histoire ————————————————————————— */}
      <Plan
        href={`/histoires/${selection[2].slug}`}
        image={selection[2].couverture}
        titre={selection[2].titre}
        hautGauche={
          <span className="label-micro text-paper/60">
            Nº 03 — {selection[2].region}
          </span>
        }
        basGauche={
          <span className="label-micro text-paper/60">
            {selection[2].couple} · {selection[2].saison} {selection[2].annee}
          </span>
        }
        basDroite={
          <span className="label-micro text-paper/60">Voir l&apos;histoire</span>
        }
      />

      {/* Un lien ne peut pas en contenir un autre : l'accès à l'index sort
          du plan et prend sa propre bande. */}
      <section className="bg-ink text-paper">
        <div className="frame flex flex-wrap items-center justify-between gap-6 py-10">
          <span className="label-micro text-brume">
            Six célébrations, choisies pour ce qu&apos;elles ont exigé
          </span>
          <Link href="/histoires" className="label link-draw">
            Toutes les histoires
          </Link>
        </div>
      </section>

      {/* ——— Respiration : témoignage ————————————————————— */}
      <Respiration etroit className="text-center">
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
      </Respiration>

      {/* ——— Plan d'invitation ————————————————————————— */}
      <Plan
        href="/contact"
        hauteur="moyen"
        image={{
          src: "/plates/contact-colonne.jpg",
          alt: "Lumière de fin de jour sur un mur clair",
        }}
        titre="Dites-nous la date, le lieu, et ce que vous voulez garder"
        hautGauche={<span className="label-micro text-paper/60">Nous écrire</span>}
        basGauche={
          <span className="label link-draw text-[0.6875rem]">
            Prendre contact
          </span>
        }
        basDroite={
          <span className="label-micro text-paper/60">
            Réponse sous 48 heures
          </span>
        }
      />
    </>
  );
}
