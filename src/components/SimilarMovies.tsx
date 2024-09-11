import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MoviesService} from "../services/movies.service";
import {FilmBlock} from "./film_block/FilmBlock";
import {Preloader} from "./preloader/Preloader";
import { TId } from "./movie_details/MovieDetails";
import { TFilm } from "./PopularMovies";

let settings = {
  infinite: true,
  dots: true,
  arrows: true,
  slidesToShow: 4,
  autoplaySpeed: 5000,
  draggable: false,
  speed: 700,
  autoplay: true,
  responsive: [{
    breakpoint: 991,
    settings: {
      slidesToShow: 3
    }
  },{
    breakpoint: 799,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 420,
    settings: {
      slidesToShow: 1
    }
  }]
};

export const SimilarMovies:React.FC<TId> = ({id}) =>  {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecommendedMovies = async (id:string) => {
      const movies = await MoviesService.getSimilarMovies(id)
      setMovies(movies)
      setLoading(false)
    }

    fetchRecommendedMovies(id)
  }, [id]);


  return <section>
    <div className="screen_content">
      <h1 className='main_title'>Similar movies</h1>
      {
        loading ? <Preloader customClass=""/> : movies.length > 0 ? <Slider className="quarter_slider slider_with_dots" {...settings}>
          {
            movies.map((film:TFilm) => <div key={film.id}><FilmBlock film={film}/></div>)
          }
        </Slider> : <p className='subtitle'>Sorry, there are no similar movies :(</p>
      }
    </div>
  </section>;
}