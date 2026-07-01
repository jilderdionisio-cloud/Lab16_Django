export interface Genre { id: number; name: string }

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  status?: string;
  tagline?: string;
}

export interface MovieResponse { page: number; results: Movie[]; total_pages: number; total_results: number }
export interface CastMember { id: number; name: string; character: string; profile_path: string | null }
export interface Video { id: string; key: string; name: string; site: string; type: string; official: boolean }
export interface MovieDetails extends Movie {
  credits: { cast: CastMember[] };
  videos: { results: Video[] };
  similar: MovieResponse;
}
