import { useCallback, useEffect, useMemo, useState } from "react";

import PageContainer from "@/components/layout/page-container";
import { MoviesError } from "@/components/movies/movies-error";
import MoviesList from "@/components/movies/movies-list";
import { MoviesLoading } from "@/components/movies/movies-loading";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";
import { getPopularMovies } from "@/services/tmdb-service";
import type { Movie } from "@/types/movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPopularMovies();
      setMovies(data);
    } catch (requestError) {
      console.error(requestError);
      setError("No pudimos cargar las películas populares desde TMDB.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    getPopularMovies()
      .then((data) => {
        if (isCurrent) setMovies(data);
      })
      .catch((requestError: unknown) => {
        console.error(requestError);
        if (isCurrent) setError("No pudimos cargar las películas populares desde TMDB.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const genres = useMemo(
    () => Array.from(new Set(movies.map((movie) => movie.genre))).sort(),
    [movies],
  );

  const filteredMovies = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(normalizedSearchTerm);
      const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;

      return matchesTitle && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  return (
    <PageContainer>
      <MoviesPageHeader />

      {!error && (
        <MoviesSearch
          genres={genres}
          resultsCount={isLoading ? 0 : filteredMovies.length}
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          onSearchTermChange={setSearchTerm}
        />
      )}

      {isLoading && <MoviesLoading />}
      {error && <MoviesError message={error} onRetry={loadMovies} />}
      {!isLoading && !error && <MoviesList movies={filteredMovies} />}
    </PageContainer>
  );
};

export default MoviesPage;
