import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieGrid } from "@/components/movies/movie-grid";
import { EmptyState, ErrorMessage, Loader } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movieService } from "@/services/movie-service";

export function SearchPage() {
  const [params, setParams] = useSearchParams(); const current = params.get("q") || ""; const [value, setValue] = useState(current);
  const query = useQuery({ queryKey: ["search", current], queryFn: () => movieService.search(current), enabled: current.length > 0 });
  return <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-28 sm:px-8"><header className="mx-auto mb-12 max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-red-500">Explora el catálogo</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">¿Qué quieres ver?</h1><form className="mt-8 flex gap-2" onSubmit={(e) => { e.preventDefault(); const q = value.trim(); setParams(q ? { q } : {}); }}><div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500" /><Input value={value} onChange={(e) => setValue(e.target.value)} className="h-12 rounded-xl border-white/10 bg-white/5 pl-12" placeholder="Busca por título..." autoFocus /></div><Button className="h-12 bg-red-600 px-5 hover:bg-red-500">Buscar</Button></form></header>{!current ? <EmptyState title="Tu próxima película está aquí" text="Escribe un título para comenzar." /> : query.isLoading ? <Loader /> : query.isError ? <ErrorMessage message={query.error.message} /> : <><p className="mb-6 text-sm text-zinc-400">{query.data?.total_results || 0} resultados para “{current}”</p><MovieGrid movies={query.data?.results || []} /></>}</div>;
}
