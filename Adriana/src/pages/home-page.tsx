import { useCallback, useEffect, useState } from "react";

import HeroSection from "@/components/home/hero-section";
import PageContainer from "@/components/layout/page-container";
import { MoviesError } from "@/components/movies/movies-error";
import MoviesGrid from "@/components/movies/movies-grid";
import { MoviesLoading } from "@/components/movies/movies-loading";
import { getNowPlayingMovies } from "@/services/tmdb-service";
import type { Movie } from "@/types/movie";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getNowPlayingMovies();
      setMovies(data.slice(0, 6));
    } catch (requestError) {
      console.error(requestError);
      setError("No pudimos cargar los estrenos desde TMDB.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    getNowPlayingMovies()
      .then((data) => {
        if (isCurrent) setMovies(data.slice(0, 6));
      })
      .catch((requestError: unknown) => {
        console.error(requestError);
        if (isCurrent) setError("No pudimos cargar los estrenos desde TMDB.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <>
      <PageContainer>
        <HeroSection featuredMovie={movies[0]} />
      </PageContainer>

      <PageContainer>
        {isLoading && (
          <section className="py-14 sm:py-18">
            <div className="mb-8 space-y-3">
              <div className="h-3 w-32 rounded-full bg-blue-400/15" />
              <div className="h-9 w-72 max-w-full rounded-lg bg-white/8" />
            </div>
            <MoviesLoading count={6} />
          </section>
        )}

        {error && <MoviesError message={error} onRetry={loadMovies} />}

        {!isLoading && !error && <MoviesGrid movies={movies} />}
      </PageContainer>
    </>
  );
};

export default HomePage;
