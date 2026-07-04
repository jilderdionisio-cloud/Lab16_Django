import axios from "axios";

import type { Movie } from "@/types/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_TOKEN) {
  throw new Error("VITE_TMDB_API_KEY is not configured");
}

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

interface TmdbMoviesResponse {
  results: TmdbMovie[];
}

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: "application/json",
  },
  params: {
    language: "es-PE",
  },
});

const mapTmdbMovie = (movie: TmdbMovie): Movie => ({
  id: String(movie.id),
  title: movie.title,
  genre: "TMDB",
  posterUrl: movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+poster",
  synopsis: movie.overview || "Sin sinopsis disponible.",
});

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response =
    await tmdbClient.get<TmdbMoviesResponse>("/movie/popular");

  return response.data.results.map(mapTmdbMovie);
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const response =
    await tmdbClient.get<TmdbMoviesResponse>("/movie/now_playing");

  return response.data.results.map(mapTmdbMovie);
};

export const getMovieById = async (
  id: number | string,
): Promise<Movie> => {
  const response = await tmdbClient.get<TmdbMovie>(`/movie/${id}`);

  return mapTmdbMovie(response.data);
};
