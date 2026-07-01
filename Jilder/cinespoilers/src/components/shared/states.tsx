import { AlertCircle, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Loader({ label = "Cargando películas" }: { label?: string }) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" aria-label={label}>{Array.from({ length: 10 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-2xl bg-white/6" />)}</div>;
}

export function ErrorMessage({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-14 text-center"><AlertCircle className="mb-4 size-9 text-red-400" /><h2 className="text-xl font-semibold">Algo salió mal</h2><p className="mt-2 text-sm text-zinc-400">{message || "No pudimos cargar el contenido."}</p>{onRetry && <Button onClick={onRetry} className="mt-6">Reintentar</Button>}</div>;
}

export function EmptyState({ title = "No encontramos películas", text = "Prueba con otra búsqueda o filtro." }: { title?: string; text?: string }) {
  return <div className="flex flex-col items-center py-20 text-center"><Clapperboard className="mb-4 size-10 text-zinc-600" /><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 text-zinc-400">{text}</p></div>;
}
