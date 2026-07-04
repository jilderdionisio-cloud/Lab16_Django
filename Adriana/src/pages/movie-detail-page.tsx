import { ArrowLeft, Check, ShoppingCart, Ticket } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { MoviesError } from "@/components/movies/movies-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMovieById } from "@/services/tmdb-service";
import { useCartStore } from "@/store/cart-store";
import type { Movie } from "@/types/movie";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const quantityInCart = useCartStore(
    (state) => state.items.find((item) => item.id === Number(movieId))?.quantity ?? 0,
  );

  const loadMovie = useCallback(async () => {
    if (!movieId) {
      setError("No se proporcionó un identificador de película.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getMovieById(movieId);
      setMovie(data);
    } catch (requestError) {
      console.error(requestError);
      setError("No pudimos cargar el detalle de esta película.");
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    let isCurrent = true;

    if (!movieId) return undefined;

    getMovieById(movieId)
      .then((data) => {
        if (isCurrent) setMovie(data);
      })
      .catch((requestError: unknown) => {
        console.error(requestError);
        if (isCurrent) setError("No pudimos cargar el detalle de esta película.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [movieId]);

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden">
      {movie && (
        <>
          <img
            src={movie.posterUrl}
            alt=""
            className="absolute inset-0 h-[560px] w-full object-cover object-top opacity-15 blur-2xl"
          />
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-background/40 to-background" />
        </>
      )}

      <PageContainer>
        <section className="relative py-8 sm:py-12">
          <Button asChild variant="ghost" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
            <Link to="/movies"><ArrowLeft /> Volver a películas</Link>
          </Button>

          {isLoading && (
            <div className="grid gap-8 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-14">
              <Skeleton className="aspect-2/3 w-full rounded-2xl bg-white/8" />
              <div className="space-y-5 self-center">
                <Skeleton className="h-7 w-28 bg-white/8" />
                <Skeleton className="h-14 w-4/5 bg-white/8" />
                <Skeleton className="h-5 w-full bg-white/8" />
                <Skeleton className="h-5 w-3/4 bg-white/8" />
                <Skeleton className="mt-8 h-32 w-full bg-white/8" />
              </div>
            </div>
          )}

          {error && <MoviesError message={error} onRetry={loadMovie} />}

          {!isLoading && !error && movie && (
            <article className="grid items-center gap-8 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-14">
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl bg-blue-600/15 blur-2xl" />
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="relative aspect-2/3 w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/40"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-blue-400/20 bg-blue-500/10 text-blue-200">{movie.genre}</Badge>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Ticket className="size-4" /> Entrada digital
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {movie.synopsis}
                </p>

                <div className="mt-9 max-w-xl rounded-2xl border border-white/10 bg-card/70 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio por entrada</p>
                      <p className="mt-1 text-3xl font-bold">S/ 15.00</p>
                    </div>
                    {quantityInCart > 0 && (
                      <Badge variant="secondary" className="text-emerald-300">
                        <Check /> {quantityInCart} en carrito
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="mt-5 h-12 w-full bg-blue-600 text-base shadow-lg shadow-blue-600/20 hover:bg-blue-500"
                    onClick={() => addToCart({
                      id: Number(movie.id),
                      title: movie.title,
                      posterUrl: movie.posterUrl,
                      price: 15,
                    })}
                  >
                    <ShoppingCart /> Agregar al carrito
                  </Button>
                </div>
              </div>
            </article>
          )}
        </section>
      </PageContainer>
    </div>
  );
}
