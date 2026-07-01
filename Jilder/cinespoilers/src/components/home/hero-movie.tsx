import { Info, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/api/api-config";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

export function HeroMovie({ movie, onTrailer }: { movie: Movie; onTrailer: () => void }) {
  const backdrop = getImageUrl(movie.backdrop_path, "original");
  return <section className="relative min-h-[70svh] overflow-hidden border-b border-white/5">
    {backdrop && <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,#09090b_0%,rgba(9,9,11,.85)_35%,rgba(9,9,11,.15)_75%),linear-gradient(0deg,#09090b_0%,transparent_45%)]" />
    <div className="relative mx-auto flex min-h-[70svh] max-w-7xl items-end px-5 pb-16 pt-28 sm:items-center sm:px-8 sm:pb-0">
      <div className="max-w-2xl">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-zinc-200 backdrop-blur"><span className="size-1.5 rounded-full bg-red-500" /> Destacada de hoy</span>
        <h1 className="text-4xl font-black leading-[.95] tracking-[-.04em] text-white sm:text-6xl lg:text-7xl">{movie.title}</h1>
        <div className="mt-5 flex items-center gap-4 text-sm text-zinc-300"><span className="flex items-center gap-1 text-amber-300"><Star className="size-4 fill-current" /> {movie.vote_average.toFixed(1)}</span><span>{movie.release_date?.slice(0, 4)}</span><span>Película</span></div>
        <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">{movie.overview || "Descubre esta historia y todo lo que tiene preparado para ti."}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" className="h-11 bg-red-600 px-5 text-white hover:bg-red-500" onClick={onTrailer}><Play className="fill-current" /> Ver trailer</Button><Button asChild size="lg" variant="outline" className="h-11 border-white/20 bg-black/20 px-5 text-white hover:bg-white/10"><Link to={`/pelicula/${movie.id}`}><Info /> Ver detalles</Link></Button></div>
      </div>
    </div>
  </section>;
}
