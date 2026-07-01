import { CalendarDays, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/api/api-config";
import type { Movie } from "@/types/movie";
import { RatingBadge } from "./rating-badge";

export default function MovieCard({ movie, rank }: { movie: Movie; rank?: number }) {
  const poster = getImageUrl(movie.poster_path, "w500");
  return <article className="group relative min-w-0">
    <Link to={`/pelicula/${movie.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-2xl" aria-label={`Ver detalles de ${movie.title}`}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/8 transition duration-300 group-hover:-translate-y-1 group-hover:ring-red-500/50">
        {poster ? <img src={poster} alt={`Póster de ${movie.title}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-600"><Film className="size-12" /><span className="text-xs">Imagen no disponible</span></div>}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute left-3 top-3"><RatingBadge value={movie.vote_average} /></div>
        {rank && <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-red-600 text-sm font-black">#{rank}</span>}
      </div>
      <h3 className="mt-3 truncate font-semibold text-zinc-100 transition group-hover:text-red-400">{movie.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500"><CalendarDays className="size-3.5" />{movie.release_date ? new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("es-PE", { year: "numeric", month: "short" }) : "Fecha por confirmar"}</p>
    </Link>
  </article>;
}
