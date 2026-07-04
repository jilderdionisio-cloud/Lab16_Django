import { ArrowRight, Clapperboard, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

interface Props {
  featuredMovie?: Movie;
}

const HeroSection = ({ featuredMovie }: Props) => {
  return (
    <section className="relative my-6 min-h-[560px] overflow-hidden rounded-3xl border bg-card sm:my-8 lg:min-h-[620px]">
      {featuredMovie && (
        <img
          src={featuredMovie.posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-45 sm:object-[75%_25%]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-end px-6 py-12 sm:px-10 lg:min-h-[620px] lg:px-16 lg:py-16">
        <Badge className="mb-6 w-fit border-blue-400/30 bg-blue-500/15 text-blue-200">
          <Clapperboard /> En cartelera ahora
        </Badge>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
          CineSpoilerS presenta
        </p>

        <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Tu próxima gran historia empieza aquí.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          Descubre estrenos, explora cada historia y reserva tu próxima
          experiencia de cine en un solo lugar.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 bg-blue-600 px-6 hover:bg-blue-500">
            <Link to="/movies">
              <Play className="fill-current" /> Explorar películas
            </Link>
          </Button>

          {featuredMovie && (
            <Button asChild size="lg" variant="outline" className="h-11 px-6 backdrop-blur-md">
              <Link to={`/movies/${featuredMovie.id}`}>
                Ver destacada <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
