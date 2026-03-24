// Ici on wrap les routes afin d'éviter les typos dans les noms de route
// Utilisé ici pour avoir un code simple
// On pourrait aussi utiliser router.push avec les routes automatiquement nommées par Nuxt
export function goToMovies() {
  return "/";
}

export function goToMovie(id: number) {
  return `/movie/${id}`;
}
