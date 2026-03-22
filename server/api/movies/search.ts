import { TMDB } from "tmdb-ts";

export default defineEventHandler(async(event) => {
  const { search = "", page = 1 } = getQuery(event);
  if (!search || typeof search !== "string") {
    throw new Error("MISSING_SEARCH");
  }
  if (!page || Number.isNaN(+page)) {
    throw new Error("PAGE_MISFORMATTED");
  }

  const tmdb = new TMDB(useRuntimeConfig().tmdbAccessToken);
  return await tmdb.search.movies({
    query: search,
    page: Number(page),
  });
});
