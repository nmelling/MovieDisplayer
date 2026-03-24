import { TMDB } from "tmdb-ts";

export default defineEventHandler(async(event) => {
  const { page = 1 } = getQuery(event);
  if (!page || Number.isNaN(+page)) {
    throw new Error("PAGE_MISFORMATTED");
  }

  const tmdb = new TMDB(useRuntimeConfig().tmdbAccessToken);
  return await tmdb.movies.popular({
    page: Number(page),
  });
});
