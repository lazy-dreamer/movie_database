import React, {useEffect, useState} from "react";
import s from './movie_details.module.scss'
import {MoviesService} from "../../services/movies.service";
import {Preloader} from "../preloader/Preloader";

export type TId = {
  id: string
}
type TMovieGenres = {
  id: number;
  name: string
}
type TPoductionCompanies = {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string
}
type TProductionCountries = {
  iso_3166_1: string,
  name: string
}
type TSpokenLanguages = {
  english_name: string,
  iso_639_1: string,
  name: string
}
type TMovieCollection = {
  id: number,
  name: string,
  poster_path: string,
  backdrop_path: string
}
type TMovieDetails = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: TMovieCollection,
  budget: number,
  genres: TMovieGenres[],
  homepage: string,
  id: number,
  imdb_id: string,
  origin_country: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: TPoductionCompanies[],
  production_countries: TProductionCountries[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: TSpokenLanguages[],
  status: string,
  tagline: string,
  title: string,
  video: false,
  vote_average: number,
  vote_count: number
}

export const MovieDetails:React.FC<TId> = ({id}) => {
  const [movie, setMovie] = useState<TMovieDetails>();
  const [loading, setLoading] = useState(true);
  const [imageShow, setImageShow] = useState(false);
  
  useEffect(() => {
    const fetchRecommendedMovies = async (id:string) => {
      const movies = await MoviesService.getMovieById(id)
      setMovie(movies)
      setLoading(false)
    }

    fetchRecommendedMovies(id)
  }, [id]);
  
  const handleImagShow = () => {
    setImageShow(!imageShow)
  }

  return (
    loading ? <Preloader customClass=''/> : <section>
      <div className="section_bg movie_back bg_img"
           style={movie?.backdrop_path && movie.backdrop_path.length>0? ({backgroundImage: `url(${'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path})`}) : {left:0}}
      />
      <div className="screen_content">
        <div className={s.heading}>
          <h1 className={s.main_title}>{movie?.title}</h1>
          <p>{movie?.tagline}</p>
        </div>

        <div className={s.overview_frame}>
          <div className={s.overview}>
            <p>{movie?.overview}</p>
          </div>
          <ul className={s.features}>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Rating:</p>
                <p className="green">{movie?.vote_average}</p>
                <img className={s.rate_start} src="/star.svg" alt=""/>
              </div>
            </li>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Runtime:</p>
                <p className="green">{movie?.runtime} min</p>
              </div>
            </li>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Release date:</p>
                <p className="green">{movie?.release_date}</p>
              </div>
            </li>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Budget:</p>
                <p className="green">{movie?.budget} $</p>
              </div>
            </li>
          </ul>
          <ul className={s.features}>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Genres:</p>
                {movie?.genres.map(genre => <p key={genre.name} className="green">{genre.name}</p>)}
              </div>
            </li>
          </ul>
          <ul className={s.features}>
            <li>
              <div className={s.feature_block}>
                <p className={s.feature_title}>Homepage:</p>
                {movie?.homepage && movie.homepage.length > 0 ? (
                  <a href={movie.homepage} target="_blank" rel="noreferrer" className="green underline">
                    {movie.homepage}
                  </a>
                ) : (
                  <p>No website</p>
                )}
              </div>
            </li>
          </ul>
          {movie?.backdrop_path && movie.backdrop_path.length>0 ? <div className={s.main_image_block}>
            <button type='button' className={`${s.main_image_trigger} green`} onClick={handleImagShow}>{ imageShow ? 'Hide banner image ⇑' : 'Show banner image ⇓'}</button>
            {imageShow && <div className={s.main_image_frame}>
              <img src={'https://image.tmdb.org/t/p/w1280' + movie?.backdrop_path} alt="main image"/>
            </div>}
          </div> : ''}
        </div>
      </div>
    </section>
  )
}