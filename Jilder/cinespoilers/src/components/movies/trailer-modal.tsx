import { X } from "lucide-react";
import { useEffect } from "react";
export function TrailerModal({ videoKey, open, onClose }: { videoKey?: string; open: boolean; onClose: () => void }) {
  useEffect(() => { if (!open) return; const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.body.style.overflow = "hidden"; window.addEventListener("keydown", fn); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); }; }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Trailer"><button className="absolute right-5 top-5 rounded-full bg-white/10 p-2 hover:bg-white/20" onClick={onClose} aria-label="Cerrar"><X /></button><div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-900">{videoKey ? <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`} title="Trailer de la película" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="grid h-full place-items-center p-8 text-center text-zinc-400">No hay un trailer disponible para esta película.</div>}</div></div>;
}
