export const useMovieCommentsStore = defineStore("movie-comments", () => {
  const storedComments = ref<MovieComment[]>([]);

  function storeComment(form: MovieCommentForm, movieId: number) {
    storedComments.value.push({
      ...form,
      createdTs: Date.now(),
      uuid: crypto.randomUUID(),
      movieId,
    });
  }

  // Dans l'idéal (même si ici c'est pour simuler un système de persistence de données)
  // Il faudrait parser les commentaires avec un validateur type Zod pour s'assurer
  // de la cohérence des données en sortie
  //
  const commentsByMovie = (movieId: number) =>
    computed(() =>
      storedComments.value
        .filter(c => c.movieId === movieId)
        .toSorted((a, b) => a.createdTs - b.createdTs)
    );
  return {
    commentsByMovie,
    storedComments,
    storeComment,
  };
},
{
  persist: {
    pick: ["storedComments"]
  }
}
);
