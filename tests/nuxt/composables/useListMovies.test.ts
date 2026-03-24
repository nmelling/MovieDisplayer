import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useState } from "#app";
import { useListMovies } from "@/composables/useListMovies";
import type { Movies } from "@/utils/types.movies";

type FetchResponse = {
  total_pages: number
  total_results: number
  results: Movies
};

function makeMovie(id: number): Movies[number] {
  return {
    id,
    poster_path: "",
    adult: false,
    overview: "",
    release_date: "2020-01-01",
    genre_ids: [],
    original_title: `Movie ${id}`,
    original_language: "en",
    title: `Movie ${id}`,
    backdrop_path: "",
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
  };
}

function makeResponse(results: Movies, totalPages = 1, totalResults = results.length): FetchResponse {
  return {
    total_pages: totalPages,
    total_results: totalResults,
    results,
  };
}

function resetListMoviesState() {
  useState("page", () => 1).value = 1;
  useState("pending", () => false).value = false;
  useState("error", () => "").value = "";
  useState<Movies>("movies", () => []).value = [];
  useState("totalPages", () => 1).value = 1;
  useState("noMoreResults", () => false).value = false;
  useState("search", () => "").value = "";
  useState<AbortController | null>("controller", () => null).value = null;
}

// On génère un helper permettant de contrôler précisément le moment
// où l'appel asynchrone est rendu (succcès ou erreur)
// (Utilisation en partie de l'IA pour optimiser la création de ce helper)
function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
}

describe("useListMovies", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resetListMoviesState();
    fetchMock = vi.fn();
    vi.stubGlobal("$fetch", fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Set next page should not call any endpoint if no more pages", async() => {
    fetchMock.mockResolvedValueOnce(makeResponse([makeMovie(1)], 1, 1));

    const { init, setNextPage } = useListMovies();
    await init();
    await setNextPage();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("No more results available should update state", async() => {
    fetchMock.mockResolvedValueOnce(makeResponse([makeMovie(1)], 1, 1));

    const { init, noMoreResults } = useListMovies();
    await init();

    expect(noMoreResults.value).toBe(true);
  });

  describe("List all popular movies", () => {
    it("Init should calls popular endpoint with page set to 1", async() => {
      fetchMock.mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10));

      const { init } = useListMovies();
      await init();

      expect(fetchMock).toHaveBeenCalledWith("/api/movies/popular", {
        query: {
          page: 1,
        },
      });
    });

    it("Set next page should calls popular endpoint with page set to 2", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(2)], 3, 10));

      const { init, setNextPage } = useListMovies();
      await init();
      await setNextPage();

      expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/movies/popular", {
        query: {
          page: 2,
        },
      });
    });

    it("Retry should calls popular endpoint with same page", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(2)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(3)], 3, 10));

      const { init, setNextPage, retry } = useListMovies();
      await init();
      await setNextPage();
      await retry();

      expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/movies/popular", {
        query: {
          page: 2,
        },
      });
    });
  });

  describe("Search query", () => {
    it("Non empty should call specific search endpoint with page set to 1", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10));

      const { setSearchQuery } = useListMovies();
      await setSearchQuery("batman");

      expect(fetchMock).toHaveBeenLastCalledWith("/api/movies/search", expect.objectContaining({
        query: {
          page: 1,
          search: "batman",
        },
        signal: expect.any(AbortSignal),
      }));
    });

    it("Non empty & set next page should use search endpoint with next page", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(2)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(3)], 3, 10));

      const { setSearchQuery, setNextPage } = useListMovies();
      await setSearchQuery("batman");
      await setNextPage();

      expect(fetchMock).toHaveBeenLastCalledWith("/api/movies/search", expect.objectContaining({
        query: {
          page: 2,
          search: "batman",
        },
        signal: expect.any(AbortSignal),
      }));
    });

    it("Non empty & retry should use search endpoint on same page", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(2)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(3)], 3, 10))
        .mockResolvedValueOnce(makeResponse([makeMovie(4)], 3, 10));

      const { setSearchQuery, setNextPage, retry } = useListMovies();
      await setSearchQuery("batman");
      await setNextPage();
      await retry();

      expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/movies/search", expect.objectContaining({
        query: {
          page: 2,
          search: "batman",
        },
        signal: expect.any(AbortSignal),
      }));
    });

    it("Empty query should reset state & list all movies with page set to 1", async() => {
      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10));

      const { setSearchQuery, movies, error, noMoreResults } = useListMovies();
      await setSearchQuery("batman");

      // On génère une requête popular qui est mise 'en attente'
      const deferredPopular = createDeferred<FetchResponse>();
      // Le prochain appel API sera celui de la requête de recherche vide, donc sur popular
      fetchMock.mockImplementationOnce(() => deferredPopular.promise);

      // On reset la recherche
      const resetPromise = setSearchQuery("");

      // On vérifie que le reset des datas est immédiat
      // et exécuté avant l'appel API sur popular
      expect(movies.value).toEqual([]);
      expect(error.value).toBe("");
      expect(noMoreResults.value).toBe(false);

      // On simule la réponse serveur qui résout l'appel
      deferredPopular.resolve(makeResponse([makeMovie(3)], 1, 1));
      // On garanti que le traitement post appel au sein de la fonction est terminé
      await resetPromise;

      expect(fetchMock).toHaveBeenLastCalledWith("/api/movies/popular", {
        query: {
          page: 1,
        },
      });
    });

    it("If query is not the most recent, should be canceled", async() => {
      const abortSpy = vi.spyOn(AbortController.prototype, "abort");
      const deferred = createDeferred<FetchResponse>();

      fetchMock
        .mockResolvedValueOnce(makeResponse([makeMovie(1)], 3, 10))
        .mockImplementationOnce((_url, options) => {
          const signal = (options as { signal?: AbortSignal } | undefined)?.signal;
          signal?.addEventListener("abort", () => deferred.reject(new DOMException("Aborted", "AbortError")));
          return deferred.promise;
        })
        .mockResolvedValueOnce(makeResponse([makeMovie(2)], 3, 10));

      const { init, setSearchQuery, movies } = useListMovies();
      await init();
      const firstSearch = setSearchQuery("bat"); // On simule une requete lente (qui sera abort): correspond à mockImplementationOnce
      const secondSearch = setSearchQuery("batman"); // Résultat normaux via le mock

      // Ordre important:
      // La seconde requête est attendue la première
      // afin de tester que le résultat obtenu correspond bien à celui de la seconde requête
      await secondSearch;
      await firstSearch;

      expect(abortSpy).toHaveBeenCalledTimes(1);
      expect(movies.value).toEqual([makeMovie(2)]);
    });
  });

  describe("Error behaviour", () => {
    it("Error should be stored in state as string message", async() => {
      fetchMock.mockRejectedValueOnce(new Error("Boom"));

      const { init, error } = useListMovies();
      await init();

      expect(error.value).toBe("Boom");
    });

    it("If results already available, error should not reset stored results", async() => {
      const initialMovies = [makeMovie(1), makeMovie(2)];

      fetchMock
        .mockResolvedValueOnce(makeResponse(initialMovies, 3, 10))
        .mockRejectedValueOnce(new Error("Boom"));

      const { init, setNextPage, movies, error } = useListMovies();
      await init();
      await setNextPage();

      expect(movies.value.map(m => m.id)).toEqual(initialMovies.map(m => m.id));
      expect(error.value).toBe("Boom");
    });
  });
});
