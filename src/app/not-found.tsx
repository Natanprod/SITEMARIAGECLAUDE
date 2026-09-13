import Link from "next/link";

export default function Introuvable() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center bg-ink text-paper">
      <div className="frame relative z-2">
        <p className="label text-paper/60">Erreur 404</p>
        <h1 className="numeral mt-10 text-[length:var(--text-h1)] leading-none">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-10 max-w-md text-paper/70">
          Une part importante de mon travail n&apos;est jamais publiée. Celle-ci,
          en revanche, n&apos;a simplement jamais existé.
        </p>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          <Link href="/" className="label link-draw">
            Retour à l&apos;accueil
          </Link>
          <Link href="/histoires" className="label link-erase text-paper/70">
            Voir les histoires
          </Link>
        </div>
      </div>
    </section>
  );
}
