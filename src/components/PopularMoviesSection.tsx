import React from "react";
import {Filters} from "./filters/Filters";
import PopularMovies from "./PopularMovies";

export function PopularMoviesSection() {
  return <section>
    <div className="screen_content">
      <h2 className='main_title'>Popular movies</h2>
      <Filters/>
      <PopularMovies/>
    </div>
  </section>;
}