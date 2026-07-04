import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  message: string;
  onRetry: () => void;
}

export function MoviesError({ message, onRetry }: Props) {
  return (
    <section className="rounded-2xl border border-red-400/15 bg-red-500/5 px-6 py-16 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-500/10 text-red-300">
        <AlertTriangle />
      </span>
      <h2 className="mt-5 text-xl font-semibold">Algo salió mal</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" className="mt-6" onClick={onRetry}>
        <RotateCcw /> Intentar nuevamente
      </Button>
    </section>
  );
}
