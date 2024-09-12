import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import styles from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../redux/store";
import {ModalOverlay} from "../modal_overlay/ModalOverlay";
import {RegistrationModal} from "../registration_modal/RegistrationModal";
import {HeaderUser} from "../header_user/HeaderUser";
import {saveUserFavorites} from "../../services/favorites";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setLoginInfo} from "../../services/auth";

export function Header() {
  const dispatch = useDispatch()
  const auth = getAuth();
  const favFilms = useSelector((state:RootState) => state.films.favorites);
  const {isAuth, userName, userId} = useSelector((state:RootState) => state.auth)
  const [showRegModal, setShowRegModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const menuClose = () => {
    setShowMobileMenu(false)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginInfo(user, dispatch)
      }
    });
  }, []);
  
  useEffect(() => {
    if (isAuth) {
      saveUserFavorites(userId, favFilms)
    }
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
        <div className={`${styles.mobile_menu} ${showMobileMenu? 'mobile_menu_open' : ''}`}>
          <nav className={styles.header_navigation}>
            <NavLink onClick={menuClose} className={({isActive}) => isActive ? styles.active : ""} to="/">Home</NavLink>
            <NavLink onClick={menuClose} className={({isActive}) => isActive ? styles.active : ""} to="/search">Search</NavLink>
            <NavLink onClick={menuClose} className={({isActive}) => isActive ? styles.active : ""} to="/about">About</NavLink>
            {isAuth? <NavLink onClick={menuClose} className={({isActive}) => isActive ? styles.active : ""} to="/favorites">Favorites <span className={styles.fav_count}>{favFilms.length}</span></NavLink> : ''}
          </nav>
        </div>
        <div className={styles.user}>{isAuth ? <HeaderUser userName={userName}/> :
          <button type='button'className={styles.reg_btn} onClick={() => setShowRegModal(true)}>
            <span>Log  in</span>
            <img src="/login.svg" alt="ico"/>
          </button>
        } <button className={`${styles.menu_btn} ${showMobileMenu? 'opened' : ''}`} onClick={()=>setShowMobileMenu(!showMobileMenu)} /></div>
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