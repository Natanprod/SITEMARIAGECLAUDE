import Link from "next/link";
import { maison, navigation, references } from "@/content/site";
import { FilChampetre, Filet } from "@/components/editorial";

/**
 * Le pied de page — la dernière page d'un magazine : un grand titre,
 * des colonnes serrées, un ourlet de mentions. Aucune animation.
 */
export function SiteFooter() {
  const annee = new Date().getFullYear();

  return (
    <footer className="grain relative bg-ink text-paper">
      <div className="frame relative z-2 pt-[var(--spacing-section)] pb-12">
        <div className="max-w-4xl">
          <p className="label text-paper/55">Écrire à la maison</p>
          <a
            href={`mailto:${maison.email}`}
            className="link-draw mt-7 block text-[length:var(--text-h2)] leading-[1.05]"
          >
            {maison.email}
          </a>
          <p className="mt-8 max-w-xl text-paper/65">
            Douze mariages par an, pas davantage. Les dates d&apos;été se
            retiennent le plus souvent douze à dix-huit mois à l&apos;avance.
          </p>
        </div>

        <FilChampetre className="mt-20" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 pt-14 md:grid-cols-4">
          <div>
            <p className="label-micro text-paper/55">Le site</p>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-paper/80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-micro text-paper/55">Joindre</p>
            <ul className="mt-6 space-y-3 text-paper/80">
              <li>
                <a href={`mailto:${maison.email}`} className="link-draw">
                  Courriel
                </a>
              </li>
              <li>
                <a
                  href={`tel:${maison.telephone.replace(/\s/g, "")}`}
                  className="link-draw"
                >
                  {maison.telephone}
                </a>
              </li>
              <li>
                <a
                  href={maison.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-micro text-paper/55">Atelier</p>
            <p className="mt-6 text-paper/80">
              {maison.ville}
              <br />
              France
            </p>
            <p className="mt-4 text-paper/60">{maison.rayon}</p>
          </div>

          <div>
            <p className="label-micro text-paper/55">Cité par</p>
            <ul className="mt-6 space-y-2 text-paper/60">
              {references.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Le nom, en grand, une dernière fois. */}
        <p
          aria-hidden
          className="numeral mt-24 w-full text-[length:var(--text-colossal)] leading-[0.78] tracking-[-0.02em] text-paper/8"
        >
          {maison.nom}
        </p>

        <Filet className="mt-16 text-paper" />

        <div className="label-micro flex flex-col gap-4 pt-8 text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {annee} {maison.nom} — {maison.discipline}
          </p>
          <p className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/mentions-legales" className="link-draw">
              Mentions légales
            </Link>
            <span>{maison.signature}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
