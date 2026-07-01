import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieGrid } from "@/components/movies/movie-grid";
import { ErrorMessage, Loader } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import type { MovieResponse } from "@/types/movie";

export function CatalogPage({ title, description, queryKey, fetcher, ranked = false }: { title: string; description: string; queryKey: string; fetcher: (page: number) => Promise<MovieResponse>; ranked?: boolean }) {
  const [page, setPage] = useState(1);
  const query = useQuery({ queryKey: [queryKey, page], queryFn: () => fetcher(page), placeholderData: (old) => old });
  return <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
    <header className="mb-10 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-red-500">CineSpoilers · Catálogo</p><h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 leading-7 text-zinc-400">{description}</p></header>
    {query.isLoading ? <Loader /> : query.isError ? <ErrorMessage message={query.error.message} onRetry={() => query.refetch()} /> : <><MovieGrid movies={query.data?.results || []} ranked={ranked} /><div className="mt-12 flex items-center justify-center gap-4"><Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Anterior</Button><span className="text-sm text-zinc-400">Página {page} de {Math.min(query.data?.total_pages || 1, 500)}</span><Button disabled={page >= Math.min(query.data?.total_pages || 1, 500)} onClick={() => setPage((p) => p + 1)}>Siguiente</Button></div></>}
  </div>;
}
