import React from "react";
import s from './filters.module.scss'
import {GenreTrigger} from "../GenreTrigger";
import {SortingTrigger} from "../SortingTrigger";

export function Filters() {
  return <div className={s.genre_filters}>
    <div className="half_sides">
      <div className="half_side">
        <h3 className={s.title}>Choose genres</h3>
        <GenreTrigger/>
      </div>
      <div className="half_side">
        <h3 className={s.title}>Sort by:</h3>
        <SortingTrigger/>
      </div>
    </div>
  </div>;
}