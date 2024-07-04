import React from "react";
import s from './no_favorites.module.scss'

export function NoFavorites() {
  return <div className={s.no_favs_block}>
    <div className={s.no_fav_ico}>
      <img src="/no_fav.png" alt="img"/>
    </div>
    <h2 className={s.title}>There are no favorite movies!</h2>
  </div>;
}