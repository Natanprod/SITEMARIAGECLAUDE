import type { ReactNode } from "react";

/**
 * La respiration.
 *
 * Dans « Le Plein Cadre », la nuit est le fond par défaut et le papier ne
 * revient que pour respirer : un intervalle clair entre deux plans, où le
 * texte reprend la main et retrouve une gouttière.
 *
 * `ton` choisit la matière du répit — papier chaud, albâtre plus froid,
 * ou encre lorsqu'il faut du texte sans quitter la nuit.
 */
export function Respiration({
  children,
  ton = "papier",
  etroit = false,
  className = "",
}: {
  children: ReactNode;
  ton?: "papier" | "albatre" | "encre";
  /** Colonne resserrée, pour un texte qui se lit d'un trait */
  etroit?: boolean;
  className?: string;
}) {
  const matiere = {
    papier: "bg-paper text-ink",
    albatre: "bg-albatre text-ink",
    encre: "grain relative bg-ink text-paper",
  }[ton];

  return (
    <section
      className={`${matiere} py-[var(--spacing-section)] ${className}`}
    >
      <div className={`${etroit ? "frame-narrow" : "frame"} relative z-2`}>
        {children}
      </div>
    </section>
  );
}
