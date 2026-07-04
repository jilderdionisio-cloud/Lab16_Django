import type { Movie } from "@/types/movie";

import MovieCard from "./movie-card";

interface Props {
  movies: Movie[];
}

const MoviesGrid = ({ movies }: Props) => {
  return (
    <section className="py-14 sm:py-18">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
          Selección de estreno
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Películas destacadas
        </h2>

        <p className="mt-2 text-muted-foreground">
          Lo más reciente de la cartelera, actualizado desde TMDB.
        </p>
      </header>

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default MoviesGrid;
