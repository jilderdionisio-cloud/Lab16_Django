import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count?: number;
}

export function MoviesLoading({ count = 8 }: Props) {
  return (
    <div className="grid gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-white/8 bg-card/60">
          <Skeleton className="aspect-2/3 w-full rounded-none bg-white/8" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-3/4 bg-white/8" />
            <Skeleton className="h-4 w-full bg-white/8" />
            <Skeleton className="h-4 w-2/3 bg-white/8" />
          </div>
        </div>
      ))}
    </div>
  );
}
