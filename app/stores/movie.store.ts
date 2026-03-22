import { defineStore } from "pinia";

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
