import type { TMDB } from "tmdb-ts";

type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];

function ensureError(err: unknown) {
  if (err instanceof Error) return err;
  if (err && typeof err === "object" && "message" in err && typeof err.message === "string") return new Error(err.message);
  return new Error(String(err));
}

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    page: 1,
    movies: [] as Movies,
    pending: false,
    error: undefined as Error | undefined,
    hydrated: false,
  }),

  actions: {
    async fetch(reset = false) {
      if (reset) {
        this.page = 1;
        this.movies = [];
      }

      this.pending = true;

      try {
        const res = await $fetch("/api/movies/popular", {
          query: {
            page: this.page,
          }
        });

        this.movies.push(...res.results);
        this.hydrated = true;
      }
      catch(err) {
        this.error = ensureError(err);
      }
      finally {
        this.pending = false;
      }
    },
  },

  persist: {
    key: "movies-store",
    storage: import.meta.client ? localStorage : undefined,
    pick: ["movies", "page"], // A étudier, est ce pertinent de persister les 'movies' ?
  },
});
