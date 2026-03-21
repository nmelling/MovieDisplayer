import type { TMDB } from "tmdb-ts";

export type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];
