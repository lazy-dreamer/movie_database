import React from "react";
import {useSelector} from "react-redux";
import {FilmBlock} from "../components/film_block/FilmBlock";
import {NoFavorites} from "../components/no_favorites/NoFavorites";
import { RootState } from "../redux/store";
import { TFilm } from "../components/PopularMovies";
import { Navigate } from "react-router-dom"; // імпортуємо Navigate

export function FavoritesPage() {
  const {isAuth} = useSelector((state:RootState) => state.auth);
  const {favorites} = useSelector((state:RootState) => state.films);
  
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  
  return (
    <section>
      <div className="screen_content">
        {favorites.length > 0 ? (
          <div className="quarter_blocks bottom_offset">
            {favorites.map((item: TFilm) => (
              <FilmBlock key={item.title + item.id} film={item} />
            ))}
          </div>
        ) : (
          <NoFavorites />
        )}
      </div>
    </section>
  );
}
