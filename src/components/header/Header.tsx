import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import styles from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setFavFilms} from "../../redux/films_slice/filmsSlice";
import { RootState } from "../../redux/store";

export function Header() {
  const dispatch = useDispatch()
  const favFilms = useSelector((state:RootState) => state.films.favorites);

  useEffect(() => {
    const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms') || '""');
    if (favoriteFilms) {
      dispatch(setFavFilms(favoriteFilms));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('favoriteFilms', JSON.stringify(favFilms));
  }, [favFilms]);

  return <header className={styles.header}>
    <div className={`screen_content ${styles.header_container}`}>
      <NavLink to="/">
        <div className={styles.logo}>
          <img src="/movie-videos-icon.svg" alt=""/>
          <p><span className="green">T</span>he <span className="green">M</span>ovie <br/> <span
            className="green">D</span>ata<span className="green">B</span>ase</p>
        </div>
      </NavLink>
      <nav className={styles.header_navigation}>
        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/search">Search</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/about">About</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.active : ""}
                 to="/favorites">Favorites <span className={styles.fav_count}>{favFilms.length}</span></NavLink>
      </nav>
    </div>
  </header>
}