import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";
import { CatalogPage } from "@/pages/catalog-page";
import { GenreDetailPage } from "@/pages/genre-detail-page";
import { GenresPage } from "@/pages/genres-page";
import { MovieDetailPage } from "@/pages/movie-detail-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { SearchPage } from "@/pages/search-page";
import { movieService } from "@/services/movie-service";

export const router = createBrowserRouter([{ element: <MainLayout />, children: [
  { path: "/", element: <HomePage /> },
  { path: "/populares", element: <CatalogPage title="Películas populares" description="Las historias que están marcando la conversación esta semana." queryKey="popular" fetcher={movieService.popular} /> },
  { path: "/estrenos", element: <CatalogPage title="Ahora en cines" description="Los estrenos que puedes disfrutar actualmente en la pantalla grande." queryKey="now" fetcher={movieService.nowPlaying} /> },
  { path: "/proximamente", element: <CatalogPage title="Próximamente" description="Prepara tu agenda con los lanzamientos que están por llegar." queryKey="upcoming" fetcher={movieService.upcoming} /> },
  { path: "/mejor-valoradas", element: <CatalogPage title="Mejor valoradas" description="Las películas con las puntuaciones más altas de la comunidad." queryKey="top" fetcher={movieService.topRated} ranked /> },
  { path: "/generos", element: <GenresPage /> }, { path: "/genero/:id", element: <GenreDetailPage /> },
  { path: "/buscar", element: <SearchPage /> }, { path: "/pelicula/:id", element: <MovieDetailPage /> },
  { path: "/movies", element: <CatalogPage title="Películas populares" description="Explora nuestro catálogo." queryKey="popular" fetcher={movieService.popular} /> },
  { path: "/movies/:id", element: <MovieDetailPage /> }, { path: "*", element: <NotFoundPage /> },
]}]);
