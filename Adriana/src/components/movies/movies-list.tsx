import type { Movie } from "@/types/movie";

import MovieCard from "./movie-card";

interface Props {
  movies: Movie[];
}

const MoviesList = ({
  movies,
}: Props) => {
  if (movies.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-white/15 bg-card/40 px-6 py-20 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-muted text-2xl">🎬</div>
        <h2 className="text-xl font-semibold">
          No encontramos películas
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Prueba con otro título o cambia los filtros.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Movies list"
      className="grid gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
};

export default MoviesList;
