import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CatalogPage } from "./catalog-page";
import { movieService } from "@/services/movie-service";
export function GenreDetailPage() { const { id = "" } = useParams(); const genres = useQuery({ queryKey: ["genres"], queryFn: movieService.genres }); const name = genres.data?.find((g) => String(g.id) === id)?.name || "Género"; return <CatalogPage title={name} description={`Una selección de películas de ${name.toLowerCase()}, ordenadas por popularidad.`} queryKey={`genre-${id}`} fetcher={(page) => movieService.byGenre(id, page)} />; }
