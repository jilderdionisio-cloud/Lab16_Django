import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HeroMovie } from "@/components/home/hero-movie";
import { MovieGrid } from "@/components/movies/movie-grid";
import { SectionTitle } from "@/components/movies/section-title";
import { TrailerModal } from "@/components/movies/trailer-modal";
import { ErrorMessage, Loader } from "@/components/shared/states";
import { movieService } from "@/services/movie-service";

export default function HomePage() {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const popular = useQuery({ queryKey: ["popular", 1], queryFn: () => movieService.popular() });
  const now = useQuery({ queryKey: ["now", 1], queryFn: () => movieService.nowPlaying() });
  const top = useQuery({ queryKey: ["top", 1], queryFn: () => movieService.topRated() });
  const upcoming = useQuery({ queryKey: ["upcoming", 1], queryFn: () => movieService.upcoming() });
  const hero = popular.data?.results[0];
  const details = useQuery({ queryKey: ["hero-details", hero?.id], queryFn: () => movieService.details(String(hero!.id)), enabled: Boolean(hero) });
  if (popular.isError) return <div className="px-5 py-32"><ErrorMessage message={popular.error.message} onRetry={() => popular.refetch()} /></div>;
  return <>
    {hero ? <HeroMovie movie={hero} onTrailer={() => setTrailerOpen(true)} /> : <div className="mx-auto max-w-7xl px-5 pb-12 pt-28"><Loader /></div>}
    <main className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-8">
      <section><SectionTitle eyebrow="Lo que todos ven" title="Películas populares" href="/populares" />{popular.data ? <MovieGrid movies={popular.data.results.slice(0, 6)} /> : <Loader />}</section>
      <section><SectionTitle eyebrow="En pantalla grande" title="Ahora en cines" href="/estrenos" />{now.data ? <MovieGrid movies={now.data.results.slice(0, 6)} /> : <Loader />}</section>
      <section><SectionTitle eyebrow="Selección del público" title="Las mejor valoradas" href="/mejor-valoradas" />{top.data ? <MovieGrid movies={top.data.results.slice(0, 6)} ranked /> : <Loader />}</section>
      <section><SectionTitle eyebrow="Agenda cinéfila" title="Muy pronto" href="/proximamente" />{upcoming.data ? <MovieGrid movies={upcoming.data.results.slice(0, 6)} /> : <Loader />}</section>
    </main>
    <TrailerModal open={trailerOpen} onClose={() => setTrailerOpen(false)} videoKey={details.data?.videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer")?.key} />
  </>;
}
