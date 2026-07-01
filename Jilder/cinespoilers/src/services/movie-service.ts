import { movieApi } from "@/api/movie-api";
import type { Genre, MovieDetails, MovieResponse } from "@/types/movie";

type ListKind = "popular" | "now_playing" | "top_rated" | "upcoming";

async function getList(kind: ListKind, page = 1) {
  const { data } = await movieApi.get<MovieResponse>(`/movie/${kind}`, { params: { page } });
  return data;
}

export const movieService = {
  popular: (page = 1) => getList("popular", page),
  nowPlaying: (page = 1) => getList("now_playing", page),
  topRated: (page = 1) => getList("top_rated", page),
  upcoming: (page = 1) => getList("upcoming", page),
  search: async (query: string, page = 1) => {
    const { data } = await movieApi.get<MovieResponse>("/search/movie", { params: { query, page, include_adult: false } });
    return data;
  },
  details: async (id: string) => {
    const { data } = await movieApi.get<MovieDetails>(`/movie/${id}`, { params: { append_to_response: "credits,videos,similar" } });
    return data;
  },
  genres: async () => {
    const { data } = await movieApi.get<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  },
  byGenre: async (genreId: string, page = 1) => {
    const { data } = await movieApi.get<MovieResponse>("/discover/movie", { params: { with_genres: genreId, page, sort_by: "popularity.desc" } });
    return data;
  },
};
