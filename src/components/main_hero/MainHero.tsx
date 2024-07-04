import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s from './main_hero.module.scss'
import {Link} from "react-router-dom";
import {Preloader} from "../preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import fetchNowPlaying, { TNowPlaying } from "../../redux/thunks/fetchNowPlaying";
import { AppDispatch, RootState } from "../../redux/store";

let settings = {
  infinite: true,
  dots: true,
  arrows: true,
  slidesToShow: 1,
  autoplaySpeed: 5000,
  draggable: false,
  speed: 1000,
  autoplay: true,
};

export function MainHero() {
  const dispatch: AppDispatch = useDispatch();
  const {nowPlaying, status} = useSelector((state:RootState) => state.nowPlaying)
  useEffect(() => {
    if (nowPlaying.length === 0) {
      dispatch(fetchNowPlaying(1))
    }
  }, []);

  if (status !== 'success') {
    return <Preloader customClass=''/>
  }

  return <section className='no_paddings'>
    <Slider {...settings} className='hero_slider'>
      {nowPlaying.map((slide:TNowPlaying, index:number) =>
        <div key={index} className={s.hero_slide}>
          <div className={`bg_img ${s.table}`}
               style={{backgroundImage: `url(${'https://image.tmdb.org/t/p/w1280' + slide.backdrop_path})`}}>
            <div className={s.cell}>
              <div className="screen_content">
                <Link to={`/movie/${slide.id}`} className={s.title}>{slide.title}</Link>
                <p className={s.descr}>{slide.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Slider>
  </section>;
}