import { ArrowUpRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie } from "@/types/movie";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <article className="group h-full">
      <Card className="h-full gap-0 overflow-hidden border-white/8 bg-card/70 py-0 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-blue-950/30">
        <Link to={`/movies/${movie.id}`} className="relative block overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            loading="lazy"
            className="aspect-2/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          <Badge className="absolute left-4 top-4 border-white/15 bg-black/55 text-white backdrop-blur-md">
            {movie.genre}
          </Badge>
          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-blue-600 text-white opacity-0 shadow-lg transition-all group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>

        <CardHeader className="gap-2 px-5 pt-5">
          <CardTitle className="line-clamp-1 text-lg">{movie.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col px-5 pb-5">
          <p className="line-clamp-3 min-h-15 text-sm leading-5 text-muted-foreground">
            {movie.synopsis}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-blue-300">
              <Ticket className="size-4" /> S/ 15.00
            </span>
            <Link
              to={`/movies/${movie.id}`}
              className="text-sm font-medium text-foreground transition-colors hover:text-blue-300"
            >
              Ver detalle
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;
