import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plan } from "@/components/plan";
import { Respiration } from "@/components/respiration";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Etiquette, Filet } from "@/components/editorial";
import { getStory, stories, storyNeighbours } from "@/content/stories";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/histoires/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const story = getStory(slug);
  if (!story) return { title: "Histoire introuvable" };

  return {
    title: `${story.titre} — ${story.couple}`,
    description: story.exergue,
    openGraph: {
      title: `${story.titre} — ${story.couple}`,
      description: story.exergue,
      images: [{ url: story.couverture.src }],
    },
  };
}

/**
 * Une histoire, en trois temps : le plan d'ouverture, une respiration où
 * le récit reprend la main, puis la suite des planches — chacune en plein
 * cadre, sans gouttière, comme un montage.
 */
export default async function Histoire(props: PageProps<"/histoires/[slug]">) {
  const { slug } = await props.params;
  const story = getStory(slug);
  if (!story) notFound();

  const { precedente, suivante } = storyNeighbours(slug);

  return (
    <>
      <Plan
        hauteur="plein"
        priority
        image={story.couverture}
        titre={story.titre}
        hautGauche={
          <span className="label text-paper/60">
            {story.lieu} — {story.region}
          </span>
        }
        basGauche={
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <span className="label-micro text-paper/60">{story.couple}</span>
            <span className="label-micro text-paper/60">
              {story.saison} {story.annee}
            </span>
          </div>
        }
        basDroite={
          <span className="label-micro text-paper/60">
            {story.prestations.join(" · ")}
          </span>
        }
      />

      {/* ——— Respiration : le récit ————————————————————— */}
      <Respiration>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Etiquette accent="terre" className="text-greige">
                La commande
              </Etiquette>
              <dl className="mt-10 space-y-6">
                {[
                  ["Lieu", `${story.lieu}, ${story.region}`],
                  ["Saison", `${story.saison} ${story.annee}`],
                  ["Prestations", story.prestations.join(" · ")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label-micro text-greige">{k}</dt>
                    <dd className="mt-2 text-ardoise">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="text-[length:var(--text-h3)] leading-[1.3] font-light">
                {story.exergue}
              </p>
            </Reveal>
            <RevealGroup className="mt-12 max-w-2xl space-y-6 text-ardoise">
              {story.recit.map((paragraphe) => (
                <RevealItem as="p" key={paragraphe.slice(0, 24)}>
                  {paragraphe}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Respiration>

      {/* ——— Les planches, en plans ————————————————————— */}
      {story.planches.map((planche, i) => (
        <Plan
          key={planche.src}
          hauteur={
            planche.ratio === "portrait" || planche.ratio === "colonne"
              ? "grand"
              : planche.ratio === "carre"
                ? "moyen"
                : "bande"
          }
          voile={0.55}
          image={planche}
          hautGauche={
            <span className="label-micro text-paper/60">
              {String(i + 1).padStart(2, "0")} / {story.planches.length}
            </span>
          }
          basGauche={
            <span className="label-micro text-paper/60">{planche.alt}</span>
          }
        />
      ))}

      {/* ——— Navigation entre histoires ————————————————— */}
      <Respiration ton="encre">
        <Filet className="text-paper" />
        <div className="flex flex-col gap-10 pt-12 sm:flex-row sm:items-end sm:justify-between">
          {precedente ? (
            <Link href={`/histoires/${precedente.slug}`} className="group">
              <span className="label-micro text-brume">Précédente</span>
              <span className="mt-4 block text-[length:var(--text-h3)] leading-none transition-opacity duration-500 group-hover:opacity-60">
                {precedente.titre}
              </span>
            </Link>
          ) : null}

          <Link href="/histoires" className="label link-draw shrink-0 text-brume">
            Toutes les histoires
          </Link>

          {suivante ? (
            <Link
              href={`/histoires/${suivante.slug}`}
              className="group sm:text-right"
            >
              <span className="label-micro text-brume">Suivante</span>
              <span className="mt-4 block text-[length:var(--text-h3)] leading-none transition-opacity duration-500 group-hover:opacity-60">
                {suivante.titre}
              </span>
            </Link>
          ) : null}
        </div>
      </Respiration>
    </>
  );
}
