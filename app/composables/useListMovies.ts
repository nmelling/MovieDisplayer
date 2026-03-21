export async function useListMovies() {
  const page = useState("page", () => 1);
  const pending = useState("pending", () => false);
  const error = useState("error", () => "");
  const movies = useState<Movies>("movies", () => []);
  const totalPages = useState("totalPages", () => 1);
  const noMoreResults = useState("noMoreResults", () => false);

  async function fetchMovies() {
    if (pending.value) return;
    try {
      error.value = "";
      pending.value = true;
      const res = await $fetch("/api/movies/popular", {
        query: {
          page: page.value,
        }
      });

      totalPages.value = res.total_pages;

      if (!res?.results || res.results.length === 0) return;
      const existingIds = new Set(movies.value.map(movie => movie.id));
      movies.value.push(...res.results.filter(movie => !existingIds.has(movie.id)));
      noMoreResults.value = res.total_results > movies.value.length;
    }
    catch(err) {
      error.value = ensureError(err).message;
    }
    finally {
      pending.value = false;
    }
  }

  await callOnce(fetchMovies);

  async function setNextPage() {
    page.value = Math.min(totalPages.value, page.value + 1);
    if (page.value === totalPages.value) return;
    await fetchMovies();
  }

  // To explicitely define intention
  async function retry() {
    await fetchMovies();
  }

  async function reset() {
    movies.value = [];
    page.value = 1;
    pending.value = false;
    error.value = "";
  }

  return {
    setNextPage,
    retry,
    reset,
    movies,
    pending,
    error,
    noMoreResults,
  };
}
