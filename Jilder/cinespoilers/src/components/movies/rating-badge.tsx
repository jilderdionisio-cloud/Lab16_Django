import { Star } from "lucide-react";
export function RatingBadge({ value }: { value: number }) { return <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur"><Star className="size-3 fill-current" />{value ? value.toFixed(1) : "N/D"}</span>; }
