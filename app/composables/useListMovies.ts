// import type { TMDB } from "tmdb-ts";

// type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];

export async function useListMovies() {
  const page = useState("page", () => 1);
  const pending = useState("pending", () => false);
  const error = useState<Error | null>("error", () => null);
  const movies = useState<Movies>("movies", () => []);

  async function fetchMovies() {
    if (pending.value) return;
    try {
      error.value = null;
      pending.value = true;
      const res = await $fetch("/api/movies/popular", {
        query: {
          page: page.value,
        }
      });

      if (!res?.results || res.results.length === 0) return;
      const existingIds = new Set(movies.value.map(movie => movie.id));
      movies.value.push(...res.results.filter(movie => !existingIds.has(movie.id)));
    }
    catch(err) {
      error.value = ensureError(err);
    }
    finally {
      pending.value = false;
    }
  }

  await callOnce(fetchMovies);

  if (import.meta.client) {
    watch(page, fetchMovies);
  }

  function setNextPage() {
    page.value++;
  }

  async function reset() {
    movies.value = [];
    page.value = 1;
    pending.value = false;
    error.value = null;
  }

  return {
    setNextPage,
    reset,
    movies,
    pending,
    error,
  };
}
