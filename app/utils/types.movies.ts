import type { TMDB } from "tmdb-ts";

export type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];
type MovieCredits = Awaited<ReturnType<TMDB["movies"]["credits"]>>;

// Obligé de typer manuellement car
// Awaited<ReturnType<TMDB["movies"]["details"]>>
// Expression produces a union type that is too complex to represent.
// et pas la priorité à fixer pour avancer sur els autres points
export type MovieDetails = {
  poster_path?: string
  backdrop_path: string
  title: string
  release_date: string
  runtime: number
  genres: { id: number, name: string }[]
  vote_average: number
  vote_count: number
  overview: string
  cast: MovieCredits["cast"]
  director: MovieCredits["crew"][number] | undefined
};
