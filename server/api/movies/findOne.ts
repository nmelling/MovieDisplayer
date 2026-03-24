import { TMDB } from "tmdb-ts";

export default defineEventHandler(async(event) => {
  const { id } = getQuery(event);
  if (!id) throw new Error("NO_ID_PROVIDED");
  if (Number.isNaN(+id)) throw new Error("ID_MISSFORMATTED");

  const tmdb = new TMDB(useRuntimeConfig().tmdbAccessToken);

  // On fetch les routes requises pour rassembler la donnée nécessaire
  const [details, credits] = await Promise.all([
    tmdb.movies.details(Number(id)),
    tmdb.movies.credits(Number(id)),
  ]);

  // On construit la signature de sortie souhaitée
  return {
    ...details,
    cast: credits.cast.sort((A, B) => A.order - B.order),
    director: credits.crew.find(item => item.job === "Director"),
  };
});
