import { Film } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-16 bg-black/15">
      <Separator />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-600/15">
              <Film className="h-5 w-5 text-blue-300" />
            </span>
            <span className="font-semibold">CineSpoilerS</span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Historias, estrenos y tu próxima experiencia de cine.
          </p>

          <p className="text-sm text-muted-foreground">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
