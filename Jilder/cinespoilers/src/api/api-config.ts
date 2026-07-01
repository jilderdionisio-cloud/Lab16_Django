const FALLBACK_API_KEY = "fdc8614cd380f3081b0eea90a126eafd";

export const API_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: import.meta.env.VITE_TMDB_API_KEY || FALLBACK_API_KEY,
  language: "es-PE",
  imageBaseUrl: "https://image.tmdb.org/t/p",
} as const;

export type ImageSize = "w185" | "w342" | "w500" | "w780" | "original";

export function getImageUrl(path: string | null | undefined, size: ImageSize = "w500") {
  return path ? `${API_CONFIG.imageBaseUrl}/${size}${path}` : null;
}
