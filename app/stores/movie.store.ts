import { defineStore } from "pinia";

type Comment = {
  username: string
  message: string
  rating: number
};

export const useMovieCommentsStore = defineStore("movie-comments", () => {
  const comments = ref<Comment[]>([]);

  return {
    comments,
  };
}, { persist: true });
