import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import styles from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setFavFilms} from "../../redux/films_slice/filmsSlice";
import { RootState } from "../../redux/store";
import {ModalOverlay} from "../modal_overlay/ModalOverlay";
import {RegistrationModal} from "../registration_modal/RegistrationModal";
import {HeaderUser} from "../header_user/HeaderUser";

interface IUser {
  name:string
}

export function Header() {
  const dispatch = useDispatch()
  const favFilms = useSelector((state:RootState) => state.films.favorites);
  
  const {isAuth, userName} = useSelector((state:RootState) => state.auth)
  const [showRegModal, setShowRegModal] = useState(false)
  

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
      <div className={styles.header_right}>
        <nav className={styles.header_navigation}>
          <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">Home</NavLink>
          <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/search">Search</NavLink>
          <NavLink className={({isActive}) => isActive ? styles.active : ""} to="/about">About</NavLink>
          {isAuth? <NavLink className={({isActive}) => isActive ? styles.active : ""}
                            to="/favorites">Favorites <span className={styles.fav_count}>{favFilms.length}</span></NavLink> : ''}
          
        </nav>
        <div className={styles.user}>{isAuth? <HeaderUser user={userName}/> :
          <button type='button'className={styles.reg_btn} onClick={() => setShowRegModal(true)}>Account</button>
        }</div>
      </div>
      {
        showRegModal && (
          <ModalOverlay>
            <RegistrationModal modalClose={setShowRegModal}/>
          </ModalOverlay>
        )
      }
    </div>
  </header>
}