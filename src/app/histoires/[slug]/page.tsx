import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Plate } from "@/components/plate";
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
 * Une histoire.
 *
 * Construction en trois temps : le bandeau, le récit adossé à la fiche
 * technique, puis la planche-contact — cinq images au rythme décalé.
 */
export default async function Histoire(props: PageProps<"/histoires/[slug]">) {
  const { slug } = await props.params;
  const story = getStory(slug);
  if (!story) notFound();

  const { precedente, suivante } = storyNeighbours(slug);
  const [p1, p2, p3, p4] = story.planches;

  return (
    <>
      <Masthead
        hauteur="court"
        etiquette={`${story.lieu} — ${story.region}`}
        accent="terre"
        lignes={[story.titre]}
        meta={[story.couple, `${story.saison} ${story.annee}`, ...story.prestations]}
        image={{ src: story.couverture.src, alt: story.couverture.alt }}
        voile={0.5}
      />

      {/* ——— Récit ————————————————————————————————————— */}
      <section className="frame py-[var(--spacing-section)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Etiquette accent="terre" className="text-greige">La commande</Etiquette>
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
      </section>

      {/* ——— Planches ————————————————————————————————— */}
      <section className="frame pb-[var(--spacing-section)]">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-12">
          <Reveal className="md:col-span-7" large>
            <Plate plate={p1} sizes="(max-width: 768px) 100vw, 58vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" large>
            <Plate plate={p2} sizes="(max-width: 768px) 100vw, 33vw" />
          </Reveal>
          <Reveal className="md:col-span-5 md:pt-10" large>
            <Plate plate={p3} sizes="(max-width: 768px) 100vw, 42vw" />
          </Reveal>
          <Reveal className="md:col-span-12" large>
            <Plate plate={p4} sizes="100vw" />
          </Reveal>
        </div>
      </section>

      {/* ——— Navigation entre histoires ————————————————— */}
      <section className="frame pb-[var(--spacing-section)]">
        <Filet className="text-ink" />
        <div className="flex flex-col gap-10 pt-12 sm:flex-row sm:items-end sm:justify-between">
          {precedente ? (
            <Link href={`/histoires/${precedente.slug}`} className="group">
              <span className="label-micro text-greige">Précédente</span>
              <span className="mt-4 block text-[length:var(--text-h3)] leading-none transition-opacity duration-500 group-hover:opacity-55">
                {precedente.titre}
              </span>
            </Link>
          ) : null}

          <Link href="/histoires" className="label link-draw shrink-0 text-greige">
            Toutes les histoires
          </Link>

          {suivante ? (
            <Link href={`/histoires/${suivante.slug}`} className="group sm:text-right">
              <span className="label-micro text-greige">Suivante</span>
              <span className="mt-4 block text-[length:var(--text-h3)] leading-none transition-opacity duration-500 group-hover:opacity-55">
                {suivante.titre}
              </span>
            </Link>
          ) : null}
        </div>
      </section>
    </>
  );
}
