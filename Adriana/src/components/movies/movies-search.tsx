import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  genres: string[];
  resultsCount: number;
  searchTerm: string;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  onSearchTermChange: (searchTerm: string) => void;
}

const MoviesSearch = ({
  genres,
  resultsCount,
  searchTerm,
  selectedGenre,
  onGenreChange,
  onSearchTermChange,
}: Props) => {
  return (
    <section aria-label="Filtros de películas" className="sticky top-22 z-30 mb-8">
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-card/85 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl md:grid-cols-[1fr_210px_auto] md:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="movie-search"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Buscar por título..."
            aria-label="Buscar película por título"
            className="h-11 border-white/10 bg-background/50 pl-11"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <select
            id="movie-genre"
            value={selectedGenre}
            onChange={(event) => onGenreChange(event.target.value)}
            aria-label="Filtrar por género"
            className="h-11 w-full appearance-none rounded-lg border border-input bg-background/50 pl-11 pr-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
          >
            <option value="all">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <p className="whitespace-nowrap rounded-lg bg-blue-500/10 px-4 py-3 text-center text-sm font-medium text-blue-200">
          {resultsCount} {resultsCount === 1 ? "película" : "películas"}
        </p>
      </div>
    </section>
  );
};

export default MoviesSearch;
