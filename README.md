# Technos

- [Nuxt](https://nuxt.com/docs/getting-started/introduction) en mode SSR
- [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite)
- SCSS
- [VueUse](https://vueuse.org/guide/)
- [Vuetify](https://vuetifyjs.com/en/getting-started/installation/#installation)
- [Vuelidate](https://vuelidate-next.netlify.app/)
- [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)
- [Bun](https://bun.com/docs)
- [Vitest](https://vitest.dev/guide/)
- ESLint pour linter et formatter basique (Pas de prettier)

# Commandes utiles

- `bun install`
- `bun run dev`: lance le serveur sur `http://localhost:3000`
- `bun run test`: lance les tests `vitest`. S'assurer que la version de `node` est récente.
- `bun run lint`

**Il est possible d'utiliser d'autres gestionnaires de paquets** tel que `pnpm`. Aucun item à l'intérieur du code ne se sert de l'écosystème Bun à proprement parlé afin de pouvoir facilement changer de gestionnaire de paquets.

# Remarques

1) Découverte complète de l'écosystème `Nuxt`/`Vuetify`
  - Système de plugin et imports magiques un peu déstabilisant au début, agréable par la suite.
  - Système de router automatique très sympa qui permet une bonne couche d'abstraction. Pas d'utilisation de routes nommées pour le moment car peu de routes.
  - Système de chargement de la data au cas par cas pour chaque route qui semble prometteur bien que non utilisé ici (`Hybrid Rendering`)
  - J'ai passé pas mal de temps à potasser les différentes documentations, certains concepts sont intéressants (`Lazy Hydration`, images chargeables en priorité haute, etc..). Il semblerait qu'il soit possible de bien optimiser le rendu de l'app.
2) Choix du SSR pour un chargement des pages très rapide avec des images pré-chargées.
3) Utilisation du paquet `tmdb-ts` afin de requêter facilement l'API et avoir un typage propre.
4) J'ai priorisé l'implémentation de feature et la découverte des concepts plutôt que la jolification de l'app. L'application reste à minima responsive.
5) Découverte de l'outil `a11y` pour respect des bonnes pratiques concernant l'accessibilité.

## Vuetify & Tailwindcss & SCSS

1) Certaines classes de `Tailwindcss` (comme `gap-[nb]`) ne fonctionnent pas au sein des composants. Par manque de temps et afin de prioriser les autres développements du projet, le problème a été mis de côté. Une solution temporaire via déclaration de classe CSS au sein du fichier `utilities.scss` a été mise en place pour appliquer tout de même les classes `Tailwindcss`. J'ai conscience que cette solution est bancale et non viable sur la durée.
  - Nécessite de résoudre ce point.
2) Je ne suis pas familier avec l'utilisation du SCSS car j'utilise essentiellement `Tailwindcss`. Ma connaissance dans ce domaine est restreinte. A approfondir donc car la capacité de manipuler et structurer le CSS est intéressante.
3) La librairie de composants `Vuetify` est riche et l'implémentation d'un `infinite-scroller` assez simple. La couche d'abstraction fournie pour les composants et comportements complexes semble intéressante. 

## Vitest

1) Installation de `Vitest`: Point de blocage au lancement avec l'erreur ci-dessous :
```sh
Error: require() of ES Module /home/nicolas/Desktop/SideProjects/MovieDisplayer/node_modules/vue/index.mjs not supported.
Instead change the require of /home/nicolas/Desktop/SideProjects/MovieDisplayer/node_modules/vue/index.mjs to a dynamic import() which is available in all CommonJS modules.
```
Il s'agit d'une version trop vieille de node (v: 20.18.0). **Erreur corrigée en passant en version 24.** Ca m'a pris plus de temps que prévu de trouver d'où venait le problème.

2) Configuration minimale de la config `Vitest`. Aucun projet spécifique, tout est rassemblé dans un seul projet de test.
3) Pour l'instant, présence uniquement de tests unitaires sur les `composables`.
  - Dans l'idéal, il faudrait également implémenter des tests de composants à minima et également des tests e2e.
  - Je ne suis pas familier avec les tests de composants (je n'en ai jamais réaliser): Il me faut donc creuser ce point pour apprendre.
  - Pour les tests e2e, mise en place potentielle de `Playwright` comme sur d'autres projets ? Solution à creuser pour voir si compatible avec `Vitest`.

## Pipeline Git

1) Mise en place d'un `hook de pre-commit` avec `husky` et `lint-staged`. Le hook lint automatiquement le code au commit et vérifie les erreurs Typescript à la compilation. Le commit est bloqué si des erreurs sont relevées.
  - **Amélioration à prévoir** : Un lint à la sauvegarde de fichier + un log de la compilation Typescript en hot-reload afin d'être prévenu en temps réel des erreurs potentielles et des endroits du code qui pourraient être cassés suite à modification
2) A faire: Mise en place de protection des branches
3) A faire: Pipeline CI/CD avec vérification des tests

## Utilisation de l'IA

- IA générative non utilisée au sein du projet pour le moment.
- Utilisation uniquement à visée de compréhension/explication des docs/exemples ou de recherche partielle.
- Le but ici est de découvrir l'écosystème et permettre une bonne compréhension de celui-ci.
