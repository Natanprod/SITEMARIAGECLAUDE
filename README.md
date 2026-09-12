# Maison d'image — site mariage

Site d'une maison d'image dédiée au mariage haut de gamme : photographie
éditoriale et films de célébration. Next.js 16 (App Router), React 19,
Tailwind CSS v4, Framer Motion. Toutes les pages sont prérendues en statique.

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produit le dossier out/ — le site en fichiers statiques
npm run lint
npm run plates   # (re)fabrique les planches de substitution
```

## Mettre en ligne

`next build` exporte le site entier dans `out/`. Aucun serveur Node n'est
nécessaire : **téléverser le contenu de `out/` dans `public_html`** suffit
(Hostinger, OVH, n'importe quel hébergement mutualisé).

Pour regarder le dossier en local, il faut un petit serveur — un double-clic
sur `index.html` ne suffit pas, le navigateur bloque les fichiers voisins :

```bash
cd out && python3 -m http.server 8000   # puis http://localhost:8000
```

Contrepartie de l'export statique : `next/image` ne redimensionne plus à la
volée (`images.unoptimized`), les fichiers déposés dans `public/plates/`
doivent donc déjà être aux bonnes dimensions. Sur un hébergement qui exécute
Node (Vercel, Netlify), retirer les trois options de `next.config.ts` rétablit
l'optimisation automatique.

---

## Direction artistique

L'esthétique visée : **minimaliste, éditoriale, cinématographique**. Le luxe
vient de la composition, de l'espace, de la typographie et du mouvement —
jamais d'un élément décoratif. Aucune fleur, aucun pastel, aucune écriture
manuscrite, aucun ornement romantique.

La direction retenue est **« Le Plein Cadre »**, choisie parmi trois pistes
présentées. Trois constantes la tiennent :

1. **La gouttière disparaît.** L'image touche les quatre bords ; le texte
   s'installe dans ses angles. La page n'est plus une grille, c'est une suite
   de plans qui tiennent chacun l'écran.
2. **La nuit est le fond par défaut.** Le papier ne revient que pour respirer,
   entre deux plans, là où le texte reprend la main.
3. **Aucun mouvement vertical.** Un volet horizontal découvre le plan,
   l'échelle de l'image se resserre, l'interlettrage du titre se referme.

Deux composants portent toute la direction : `Plan` (le plein cadre) et
`Respiration` (l'intervalle clair). Une page se compose en les alternant.

### Deux arbitrages, énoncés

La commande contenait deux tensions. Voici comment elles ont été tranchées —
les deux se défont en une ligne si le choix ne convient pas.

**La palette.** La demande appelait à la fois « une palette extrêmement
sobre » et le champêtre coloré (vert sauge, jaune tournesol, lilas,
terracotta). Les deux sont tenus ainsi : la base est strictement neutre
(encre, ardoise, greige, lin, papier, albâtre) et porte l'intégralité des
surfaces ; les quatre accents champêtres n'existent qu'en **trait** — un
filet de cinq millimètres devant chaque étiquette de section, le fil
quadrichrome du pied de page, la citation en terracotta, et les teintes qui
travaillent à l'intérieur des images. Chaque partie du site porte un accent
et un seul : La Maison → sauge, Histoires → terracotta, Films → lilas,
L'Expérience → tournesol. Jamais d'aplat coloré.

**Les polices.** Alfa Slab One est une romaine égyptienne très grasse,
disponible en un seul gras : illisible en texte courant. Elle est donc la
police **de la maison** — logotype, chiffres, citations, le nom en grand au
pied de page. Glacial Indifference porte les titres et le texte, comme
demandé.

### Jetons

Tout est déclaré dans `src/app/globals.css`, sous `@theme` :
couleurs, échelle typographique fluide (`clamp`), gouttières, courbes
d'accélération. Rien n'est codé en dur dans les composants.

| Rôle | Jeton | Valeur |
| --- | --- | --- |
| Fond par défaut | `noir` / `ink` | `#0a0a09` / `#16130f` |
| Respirations | `paper` / `albatre` | `#f2eee5` / `#faf8f3` |
| Texte courant sur clair | `ardoise` | `#2a2621` |
| Secondaire sur clair | `greige` | `#736a5c` |
| Secondaire sur sombre | `brume` | `#9a9183` |
| Accents champêtres | `sauge` `tournesol` `lilas` `terre` | `#8c9c7d` `#cfa02a` `#9a90b4` `#9f553c` |
| Terracotta de nuit | `terre-clair` | `#c0674a` |

---

## Typographie

| Police | Rôle | Chargement |
| --- | --- | --- |
| **Alfa Slab One** | Logotype, chiffres, citations, grand nom du pied de page | `next/font/google`, auto-hébergée |
| **Glacial Indifference** | Titres et texte courant | voir ci-dessous |

**Glacial Indifference n'est pas distribuée par Google Fonts.** Le site
charge **Jost** à sa place — une géométrique dessinée sur la même filiation
Futura, très proche de dessin. La pile CSS (`--font-sans` dans `globals.css`)
déclare cependant `"Glacial Indifference"` **en première position** : dès que
la vraie fonte est disponible côté client, elle prend le dessus sans aucune
modification de code.

Pour l'auto-héberger proprement (recommandé en production) :

1. déposer `GlacialIndifference-Regular.woff2` et `-Bold.woff2` dans
   `src/app/fonts/` ;
2. dans `src/app/layout.tsx`, remplacer l'appel `Jost({...})` par :

```ts
import localFont from "next/font/local";

const glacial = localFont({
  src: [
    { path: "./fonts/GlacialIndifference-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GlacialIndifference-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-glacial",
});
```

Rien d'autre ne bouge : la variable CSS est la même.

---

## Les images

Le site est livré avec **46 planches de substitution** dans `public/plates/`.
Ce ne sont pas des photos libres de droits : ce sont des champs colorés
fabriqués par `scripts/generate-plates.mjs` — duotone dans la palette de la
maison, lumière rasante, arête d'architecture, vignetage et grain gaussien,
aux ratios exacts de la mise en page. Elles permettent de montrer le site
avant que les photographies définitives n'existent.

**Installer les vraies photographies :** déposer le fichier dans
`public/plates/` sous le même nom, ou changer le chemin dans
`src/content/stories.ts`. Le générateur n'écrase jamais un fichier existant
(sauf avec `--force`), donc une photo posée à la main survit à un
`npm run plates`.

Les ratios déclarés (`portrait`, `paysage`, `carre`, `cinema`, `colonne`)
sont définis dans `src/content/stories.ts` et servent au calcul de mise en
page : ils évitent tout décalage au chargement.

---

## Le contenu

Aucun texte n'est écrit dans les composants. Tout vit dans `src/content/` :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Nom, coordonnées, navigation, repères chiffrés, témoignages, références |
| `stories.ts` | Les six histoires : récit, fiche technique, planches |
| `films.ts` | Les quatre films et le procédé en quatre mouvements |
| `collections.ts` | Les trois collections, le déroulé, les questions fréquentes |

Ajouter une histoire = ajouter un objet dans `stories.ts`. La page
`/histoires/[slug]`, le sitemap et la navigation entre histoires suivent
automatiquement.

### À renseigner avant mise en ligne

Ces valeurs sont des **espaces réservés** :

- `src/content/site.ts` — le nom de la maison (`Nathan Mathieu`, déduit de
  l'adresse du compte), le courriel, le téléphone, l'URL Instagram ;
- `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` — le domaine
  (`https://nathanmathieu.com`) ;
- `src/app/mentions-legales/page.tsx` — les mentions entre crochets
  (forme juridique, SIRET, adresse, hébergeur).

---

## Le formulaire de contact

`src/components/contact-form.tsx` compose une lettre structurée et l'ouvre
dans la messagerie du visiteur (`mailto:`). Conséquence : **aucune donnée ne
transite par un tiers**, aucun service externe, et le site reste entièrement
statique — ce qui rend aussi les mentions de confidentialité très courtes.

Pour passer à un envoi serveur, remplacer la fonction `envoyer()` par une
Server Action qui appelle le fournisseur de courriel retenu. Le reste du
composant (champs, validation, état) ne change pas.

---

## Mouvement

Les variantes sont centralisées dans `src/lib/motion.ts`. Règle unique :
rien ne rebondit, rien ne dépasse, tout est lent (0,9 à 1,6 s, courbes
`cubic-bezier(0.16, 1, 0.3, 1)` et `(0.76, 0, 0.24, 1)`).

Les gestes en place :

| Geste | Où | Fichier |
| --- | --- | --- |
| Volet horizontal qui découvre le plan | Chaque plan | `plan.tsx` |
| Échelle de l'image qui se resserre de 1,16 à 1 | Chaque plan | `plan.tsx` |
| Interlettrage du titre qui se referme de 0,14 em à −0,03 | Titres de plan | `plan.tsx` |
| **Parallaxe interne** — l'image dérive moins vite que son plan | Chaque plan | `plan.tsx` |
| Montée cadencée des blocs de texte | Respirations | `reveal.tsx` |
| **Titres de section mot à mot** ou interlettrage (`geste="dilate"`) | Respirations | `titre-anime.tsx` |
| **Lever de rideau** — le nom, un filet, puis le voile se lève | Première page de la session | `ouverture.tsx` |
| Menu plein écran en rideau d'encre, trait qui se dessine sous les liens | En-tête, liens | `site-header.tsx`, `globals.css` |

Trois points de vigilance, appris en les corrigeant :

- **Le lever de rideau est piloté par CSS, pas par JavaScript.** Le voile est
  rendu par le serveur, donc aucun clignotement avant hydratation ; il se lève
  même si le script ne s'exécute jamais, donc il ne peut pas rester coincé sur
  le site. Le script en ligne ne sert qu'à mémoriser la session.
- **Un titre découpé en mots doit garder ses espaces.** Sans un vrai nœud de
  texte entre deux masques, `textContent` se lit
  « Cequelamaisonnefaitpas » — pour un lecteur d'écran comme pour un moteur
  d'indexation. L'écart visuel vient du `gap` ; l'espace, d'un nœud de texte
  que le flex ne rend pas.
- **Un titre mot à mot ne se met pas dans un `<Reveal>`.** Le fondu du parent
  dissout le cache et le geste perd sa netteté : le titre porte son propre
  déclencheur et sort du bloc. Sur fond sombre, le cache suppose un fond
  franc : les plans emploient `geste="dilate"` à la place.
- **En plein cadre, l'image déborde son plan avant de se resserrer.** Le plan
  la découpe (`overflow: hidden`), et `html` est clippé horizontalement par
  précaution — `clip` ne crée pas de conteneur de défilement, donc ni le
  collant de l'en-tête ni le défilement doux n'en souffrent.
- **Un lien ne peut pas en contenir un autre.** Un plan cliquable est déjà un
  `<a>` : y glisser un `<Link>` dans un angle produit une erreur
  d'hydratation. L'accès secondaire sort du plan et prend sa propre bande.

`prefers-reduced-motion` est respecté partout : les composants ne dégradent
pas l'animation, **ils la retirent** et affichent le contenu directement.

Un piège à connaître : l'observateur d'intersection ne doit jamais être porté
par l'élément qui porte le `clip-path` de révélation. Un élément entièrement
découpé a un ratio d'intersection nul — il n'entre jamais « en vue » et
l'animation ne se déclenche pas. D'où les trois couches de `Plate` et
`FilmFrame` : observateur à l'extérieur, découpe à l'intérieur.

---

## Structure

```
src/
  app/
    page.tsx              accueil
    maison/               la maison — parcours, principes, refus
    histoires/            index + [slug] (6 pages générées)
    films/                les films et le procédé
    experience/           collections, déroulé, questions
    contact/              formulaire et coordonnées
    mentions-legales/
    globals.css           jetons et utilitaires
    sitemap.ts robots.ts not-found.tsx
  components/
    plan.tsx              le plein cadre — unité de la direction
    respiration.tsx       l'intervalle clair entre deux plans
    ouverture.tsx         le lever de rideau (CSS, une fois par session)
    site-header.tsx       en-tête + menu plein écran
    site-footer.tsx
    film-frame.tsx        plan de film (lecteur si source fournie)
    titre-anime.tsx  reveal.tsx  editorial.tsx  contact-form.tsx
  content/                tout le texte
  lib/motion.ts           variantes d'animation
scripts/generate-plates.mjs
```

---

## Accessibilité et référencement

- Contraste : texte `ardoise` sur `paper` et `paper` sur `ink`, au-delà du
  seuil AA ; les textes secondaires en `greige` restent réservés aux
  étiquettes.
- Navigation au clavier complète, `:focus-visible` visible partout, menu
  refermable par `Échap`, questions fréquentes en `<details>` natif
  (fonctionnel sans JavaScript).
- Toutes les images portent une alternative décrivant la scène.
- Métadonnées par page, Open Graph, `sitemap.xml`, `robots.txt`,
  `lang="fr"`.
