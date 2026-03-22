import { defineStore } from "pinia";

export const useMovieCommentsStore = defineStore("movie-comments", () => {
  const storedComments = ref<MovieComment[]>([]);

  function storeComment(form: MovieCommentForm) {
    storedComments.value.push({
      ...form,
      createdTs: Date.now(),
      uuid: crypto.randomUUID(),
    });
  }

  const sortedComments = computed(() => storedComments.value.toSorted((A, B) => A.createdTs - B.createdTs));

  return {
    comments: sortedComments,
    storedComments,
    storeComment,
  };
},
{
  persist: true,
}
);
