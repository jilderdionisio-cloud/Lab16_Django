import type { Movie } from "@/types/movie";
import MovieCard from "./movie-card";
import { EmptyState } from "@/components/shared/states";

export function MovieGrid({ movies, ranked = false }: { movies: Movie[]; ranked?: boolean }) {
  if (!movies.length) return <EmptyState />;
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} rank={ranked ? index + 1 : undefined} />)}</div>;
}
