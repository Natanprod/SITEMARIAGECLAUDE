import { maison } from "@/content/site";

/**
 * Le lever de rideau.
 *
 * À la première page ouverte dans la session : le nom, un filet qui se
 * trace, puis le voile se lève. Deux secondes et demie, jamais rejouées.
 *
 * Volontairement piloté par CSS et non par JavaScript. Trois raisons :
 * le voile est déjà là au premier rendu du serveur, donc aucun clignotement
 * avant hydratation ; il se lève même si le JavaScript ne s'exécute jamais,
 * donc il ne peut pas rester coincé sur le site ; et `prefers-reduced-motion`
 * le supprime sans qu'aucune ligne de script n'ait à s'exécuter.
 *
 * Le script en ligne ne sert qu'à mémoriser que la session l'a vu — il est
 * posé avant le voile pour marquer la racine avant la première peinture.
 */
const MEMOIRE = `
try {
  var c = sessionStorage.getItem("nm-ouverture");
  if (c === "1") document.documentElement.dataset.ouverture = "vue";
  else sessionStorage.setItem("nm-ouverture", "1");
} catch (e) {
  /* Navigation privée : on n'ouvre pas le rideau plutôt que de le rejouer. */
  document.documentElement.dataset.ouverture = "vue";
}
`;

export function Ouverture() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: MEMOIRE }} />
      <div className="ouverture" aria-hidden="true">
        <span className="ouverture-nom">{maison.nom}</span>
        <span className="ouverture-fil">
          <i />
        </span>
      </div>
    </>
  );
}
