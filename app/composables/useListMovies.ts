export async function useListMovies() {
  const page = useState("page", () => 1);
  const pending = useState("pending", () => false);
  const error = useState("error", () => "");
  const movies = useState<Movies>("movies", () => []);
  const totalPages = useState("totalPages", () => 1);
  const noMoreResults = useState("noMoreResults", () => false);
  const search = useState("search", () => "");
  const controller = useState<AbortController | null>("controller", () => null);

  function reset() {
    page.value = 1;
    pending.value = false;
    error.value = "";
    movies.value = [];
    totalPages.value = 1;
    noMoreResults.value = false;
    search.value = "";

    // Si une requete est en cours, on l'annule
    if (controller.value) {
      controller.value.abort();
      controller.value = null;
    }
  }

  async function searchMovies() {
    // Si la requête n'est pas la plus récente, alors on annule les précédentes
    if (controller.value) controller.value.abort();
    controller.value = new AbortController();

    try {
      const res = await $fetch("/api/movies/search", {
        query: {
          page: page.value,
          search: search.value,
        },
        signal: controller.value.signal,
      });

      totalPages.value = res.total_pages;
      if (page.value === 1) {
        movies.value = res.results;
      }
      else {
        const existingIds = new Set(movies.value.map(movie => movie.id));
        movies.value.push(...res.results.filter(movie => !existingIds.has(movie.id)));
      }
      noMoreResults.value = res.total_results <= movies.value.length;
    }
    catch(err) {
      error.value = ensureError(err).message;
    }

    controller.value = null;
  }

  async function fetchPopular() {
    if (pending.value) return;
    try {
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
      noMoreResults.value = res.total_results <= movies.value.length;
    }
    catch(err) {
      error.value = ensureError(err).message;
    }
    pending.value = false;
  }

  async function fetchMovies() {
    error.value = "";
    if (search.value) await searchMovies();
    else await fetchPopular();
  }

  await callOnce(fetchMovies);

  async function setNextPage() {
    const newPage = page.value + 1;
    if (newPage >= totalPages.value) return;
    page.value = newPage;
    await fetchMovies();
  }

  // On défini clairement l'intention donné
  async function retry() {
    await fetchMovies();
  }

  async function setSearchQuery(q: string) {
    search.value = q;
    page.value = 1;
    // On reset pour fetcher la liste de manière propre
    if (!q) reset();
    await fetchMovies();
  }

  const loading = computed(() => {
    if (search.value) return Boolean(controller.value);
    return pending.value;
  });

  return {
    setNextPage,
    setSearchQuery,
    retry,
    movies,
    loading,
    error,
    noMoreResults,
  };
}
