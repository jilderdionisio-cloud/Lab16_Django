import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Globe2, Play, Star } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "@/api/api-config";
import { MovieGrid } from "@/components/movies/movie-grid";
import { SectionTitle } from "@/components/movies/section-title";
import { TrailerModal } from "@/components/movies/trailer-modal";
import { ErrorMessage, Loader } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { movieService } from "@/services/movie-service";

export function MovieDetailPage() {
  const { id = "" } = useParams(); const navigate = useNavigate(); const [open, setOpen] = useState(false);
  const query = useQuery({ queryKey: ["movie", id], queryFn: () => movieService.details(id), enabled: Boolean(id) });
  if (query.isLoading) return <div className="mx-auto max-w-7xl px-5 py-32"><Loader /></div>;
  if (query.isError || !query.data) return <div className="px-5 py-32"><ErrorMessage message={query.error?.message || "Película no encontrada"} onRetry={() => query.refetch()} /></div>;
  const movie = query.data; const trailer = movie.videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
  return <>
    <section className="relative min-h-[78svh] overflow-hidden"><img src={getImageUrl(movie.backdrop_path, "original") || ""} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#09090b_5%,rgba(9,9,11,.83)_48%,rgba(9,9,11,.35)),linear-gradient(0deg,#09090b_0%,transparent_60%)]" />
      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-end px-5 pb-14 pt-28 sm:px-8"><div className="grid w-full gap-8 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] lg:gap-12"><img src={getImageUrl(movie.poster_path, "w500") || ""} alt={`Póster de ${movie.title}`} className="hidden aspect-[2/3] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 md:block" /><div className="self-end"><button onClick={() => navigate(-1)} className="mb-7 flex items-center gap-2 text-sm text-zinc-300 hover:text-white"><ArrowLeft className="size-4" /> Volver</button>{movie.tagline && <p className="mb-3 text-sm font-medium text-red-400">{movie.tagline}</p>}<h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{movie.title}</h1><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-300"><span className="flex items-center gap-1 text-amber-300"><Star className="size-4 fill-current" />{movie.vote_average.toFixed(1)}</span><span className="flex items-center gap-1"><Calendar className="size-4" />{movie.release_date || "Por confirmar"}</span>{movie.runtime && <span className="flex items-center gap-1"><Clock className="size-4" />{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}<span className="flex items-center gap-1"><Globe2 className="size-4" />{movie.original_language.toUpperCase()}</span></div><div className="mt-5 flex flex-wrap gap-2">{movie.genres?.map((g) => <Link to={`/genero/${g.id}`} key={g.id} className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs hover:border-red-500/60">{g.name}</Link>)}</div><p className="mt-6 max-w-3xl leading-7 text-zinc-300">{movie.overview || "Sin sinopsis disponible."}</p><Button onClick={() => setOpen(true)} className="mt-7 h-11 bg-red-600 px-5 text-white hover:bg-red-500"><Play className="fill-current" /> Ver trailer</Button></div></div></div>
    </section>
    <main className="mx-auto max-w-7xl space-y-16 px-5 pb-20 sm:px-8"><section><SectionTitle eyebrow="Frente a cámara" title="Reparto principal" /><div className="flex gap-4 overflow-x-auto pb-3">{movie.credits.cast.slice(0, 12).map((person) => <article key={person.id} className="w-32 shrink-0"><div className="aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900">{person.profile_path && <img src={getImageUrl(person.profile_path, "w342") || ""} alt={person.name} className="h-full w-full object-cover" />}</div><h3 className="mt-2 truncate text-sm font-semibold">{person.name}</h3><p className="truncate text-xs text-zinc-500">{person.character}</p></article>)}</div></section><section><SectionTitle eyebrow="Sigue explorando" title="También podrían gustarte" /> <MovieGrid movies={movie.similar.results.slice(0, 6)} /></section></main>
    <TrailerModal open={open} onClose={() => setOpen(false)} videoKey={trailer?.key} />
  </>;
}
