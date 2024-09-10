import React, {useEffect} from "react";
import styles from './film_block.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, removeFavorite} from "../../redux/films_slice/filmsSlice";
import { RootState } from '../../redux/store';
import toast from 'react-hot-toast';


export type TFilmProps = {
  "adult": boolean;
  "backdrop_path": string;
  "genre_ids": number[];
  "id": number;
  "original_language": string;
  "original_title": string;
  "overview": string;
  "popularity": number;
  "poster_path": string;
  "release_date": string;
  "title": string;
  "video": boolean;
  "vote_average": number;
  "vote_count": number
}
type TFilmBlock = {
  film: TFilmProps
}

export const FilmBlock:React.FC<TFilmBlock> = ({film}) => {
  const {favorites} = useSelector((state:RootState) => state.films)
  const {isAuth} = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch();
  const descr = film.overview.length > 35 ? film.overview.substr(0, 35) + '...' : film.overview.length
  const isFav = favorites.find((el:TFilmProps) => el.id === film.id);

  const onFavClick = () => {
    if (isAuth) {
      isFav ? dispatch(removeFavorite(film)) : dispatch(addFavorite(film));
    } else {
      toast.error('You should be logged in or registered!', {
        icon: '⛔️',
      });
    }
  }

  return <div className={styles.film_block}>
    <div className={styles.image_frame}>
      <div className={styles.image}
           style={film.backdrop_path ? {backgroundImage: `url(${'https://image.tmdb.org/t/p/w500' + film.backdrop_path})`} : {backgroundImage: 'url(/Image_not_available.png)'}}
      />
      <button className={`${styles.fav} ${isAuth && (isFav ? 'filled_fav' : '')}  `} onClick={onFavClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="#fff"
                d="m12 21-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812 2.388 10.4 2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412-2.625 2.963T13.45 19.7z"/>
        </svg>
      </button>
    </div>
    <div className={styles.body}>
      <Link to={`/movie/${film.id}`} className={styles.title}>{film.title}</Link>
      <p>{descr}</p>
    </div>
  </div>;
}

