import Link from "next/link";
import { Plate } from "@/components/plate";
import type { Ratio, Story } from "@/content/stories";

/**
 * La vignette d'histoire. Une seule règle : l'image d'abord, le texte
 * ensuite, et jamais de bouton — c'est la planche entière qui est le lien.
 */
export function StoryCard({
  story,
  ratio,
  sizes,
  numero,
  className = "",
}: {
  story: Story;
  ratio?: Ratio;
  sizes?: string;
  numero?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/histoires/${story.slug}`}
      className={`group block ${className}`}
    >
      <Plate
        plate={story.couverture}
        ratio={ratio}
        sizes={sizes}
        interactive
      />
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div>
          <h3 className="text-[length:var(--text-h3)] leading-none">
            {story.titre}
          </h3>
          <p className="label-micro mt-4 text-greige">
            {story.couple} — {story.lieu}, {story.region}
          </p>
        </div>
        {numero ? (
          <span className="label-micro shrink-0 text-greige">{numero}</span>
        ) : null}
      </div>
    </Link>
  );
}
