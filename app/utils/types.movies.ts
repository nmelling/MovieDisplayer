import type { TMDB } from "tmdb-ts";

export type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];
type MovieCredits = Awaited<ReturnType<TMDB["movies"]["credits"]>>;

export type MovieDetails = Pick<
  // @ts-expect-error TS type too complex from tmdb-ts
  Awaited<ReturnType<TMDB["movies"]["details"]>>,
  "poster_path"
  | "backdrop_path"
  | "title"
  | "release_date"
  | "runtime"
  | "genres"
  | "vote_average"
  | "vote_count"
  | "overview"
> & {
  cast: MovieCredits["cast"]
  director: MovieCredits["crew"][number] | undefined
};
