import type { ReactNode } from "react";

/**
 * Les éléments de ponctuation éditoriale, partagés par toutes les pages.
 * Aucun de ces composants n'est animé : ils structurent, ils ne jouent pas.
 */

/**
 * Les quatre accents champêtres.
 *
 * Ils ne servent jamais d'aplat ni d'ornement : un trait de cinq millimètres
 * devant une étiquette, et une section du fil en pied de page. Chaque partie
 * du site en porte un seul — c'est ce qui en fait un système plutôt qu'une
 * décoration.
 */
export const ACCENTS = {
  sauge: "bg-sauge",
  tournesol: "bg-tournesol",
  lilas: "bg-lilas",
  terre: "bg-terre",
} as const;

export type Accent = keyof typeof ACCENTS;

/** Filet horizontal — la respiration entre deux mouvements. */
export function Filet({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`rule ${className}`} />;
}

/**
 * Le fil champêtre : les quatre accents posés bout à bout, une seule fois
 * par page, en pied. C'est la seule occurrence de la palette complète.
 */
export function FilChampetre({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-px w-full ${className}`}>
      <span className="h-full flex-[3] bg-sauge/70" />
      <span className="h-full flex-[2] bg-tournesol/70" />
      <span className="h-full flex-[4] bg-lilas/70" />
      <span className="h-full flex-[3] bg-terre/70" />
    </div>
  );
}

/** Étiquette de section : trait d'accent, numéro, puis intitulé en capitales. */
export function Etiquette({
  index,
  accent,
  children,
  className = "",
}: {
  index?: string;
  accent?: Accent;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label flex items-center gap-4 ${className}`}>
      {accent ? (
        <span aria-hidden className={`h-px w-5 shrink-0 ${ACCENTS[accent]}`} />
      ) : null}
      {index ? <span className="opacity-40 tabular-nums">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}

/** Paragraphe d'introduction — plus large, plus clair, jamais justifié. */
export function Chapeau({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[length:var(--text-lead)] leading-[1.5] font-light ${className}`}
    >
      {children}
    </p>
  );
}
