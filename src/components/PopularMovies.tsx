import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "./preloader/Preloader";
import {ErrorMessage} from "./error/ErrorMessage";
import {FilmBlock} from "./film_block/FilmBlock";
import fetchPopularFilms from "../redux/thunks/fetchPopularFilms";
import ReactPaginate from 'react-paginate';
import {setActivePage} from "../redux/films_slice/filmsSlice";
import { AppDispatch, RootState } from "../redux/store";

export type TFilm = {
  "adult": boolean;
  "backdrop_path": string;
  "genre_ids": number[];
  "id": number;
  "original_language": string;
  "original_title": string;
  "overview": string;
  "popularity": number;
  "poster_path": string;
  "release_date": string;
  "title": string;
  "video": false;
  "vote_average": number;
  "vote_count": number;
}

function PopularMovies() {
  const dispatch: AppDispatch = useDispatch();
  const {films, status, errorStatus, totalPages, page} = useSelector((state:RootState) => state.films);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchPopularFilms(page));
    console.log('PopularMovies effect')
    // if (popularPage !== page) {
    //  
    // }
  }, [page, dispatch]);

  useEffect(() => {
    if (films.length === 0) {
      console.log('PopularMovies first load')
      dispatch(fetchPopularFilms(1));
    }
  }, []);

  type TSelectedPage = {
    selected: number
  }

  const handlePageClick = (e:TSelectedPage):void => {
    console.log('handlePageClick')
    const selectedPage = e.selected + 1;
    dispatch(setActivePage(selectedPage));

    window.scrollTo({
      top: ref.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {status === 'loading' ? <Preloader customClass=''/> : status === 'error' ?
        <ErrorMessage error={errorStatus}/> :
        <>
          <div className="quarter_blocks bottom_offset" ref={ref}>
            {films?.map((item:TFilm) => <FilmBlock key={item.id} film={item}/>)}
          </div>

          {totalPages > 1 && (
            <ReactPaginate
              className='custom_pagination'
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Previous"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          )}
        </>
      }
    </>
  );
}

export default PopularMovies;
