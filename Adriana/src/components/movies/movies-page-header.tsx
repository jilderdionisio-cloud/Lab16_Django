import { Film } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const MoviesPageHeader = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute left-1/3 top-0 h-40 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative max-w-3xl">
        <Badge className="mb-5 border-blue-400/20 bg-blue-500/10 text-blue-200">
          <Film /> Cartelera TMDB
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Encuentra una historia para esta noche.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Explora títulos populares, consulta cada detalle y agrega tus entradas
          al carrito en pocos pasos.
        </p>
      </div>
    </section>
  );
};

export default MoviesPageHeader;
