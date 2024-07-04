import React from "react";
import styles from './footer.module.scss'
import {NavLink} from "react-router-dom";

export function Footer() {
  return <footer className={styles.footer}>
    <div className={`screen_content ${styles.footer_sides}`}>
      <NavLink to="/">
        <div className={styles.logo}>
          <img src="/movie-videos-icon.svg" alt=""/>
          <p><span className="green">T</span>he <span className="green">M</span>ovie <br/> <span
            className="green">D</span>ata<span className="green">B</span>ase</p>
        </div>
      </NavLink>
      <a href="https://developer.themoviedb.org/reference/intro/getting-started"
         className={`green underline ${styles.tmdb}`} target="_blank">
        <img src="/tmdb_logo.png" alt=""/>
        <span>Official TMDB Api</span>
      </a>
    </div>
  </footer>;
}