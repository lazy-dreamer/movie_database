import React, {useEffect, useState} from "react";
import s from './search.module.scss'
import {Preloader} from "../preloader/Preloader";
import {FilmBlock} from "../film_block/FilmBlock";
import {TFilm} from "../PopularMovies";
import {AppDispatch, RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {resetSearchQuery, setSearchQuery} from "../../redux/search_slice/searchSlice";
import fetchSearchFilms from "../../redux/thunks/fetchSearchFilms";

export function Search() {
  const [state, setState] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const {searchQuery, films, status} = useSelector((state: RootState) => state.search)
  
  useEffect(() => {
    const throttleTimer = setTimeout(() => {
      dispatch(setSearchQuery(state));
    }, 500);
    
    return () => {
      clearTimeout(throttleTimer);
    };
  }, [state, dispatch]);
  
  useEffect(() => {
    dispatch(fetchSearchFilms(searchQuery))
    setState(searchQuery)
  }, [searchQuery, dispatch]);
  
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((e.target as HTMLInputElement).value)
  }
  
  const clearSearch = () => {
    dispatch(resetSearchQuery())
    setState('')
  }
  
  return <section>
    <div className="screen_content">
      <div className={s.search_form_frame}>
        <h2 className={s.title}>Search movie:</h2>
        <form action="" className={s.search_form} onSubmit={(e) => e.preventDefault()}>
          <div className={s.search_field_block}>
            <input type="text" value={state} placeholder='Search...'
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e)}/>
            {searchQuery.length >= 1 &&
            <button type='button' className={s.clear} onClick={() => clearSearch()}/>}
          </div>
        </form>
      </div>
      {status === 'loading' ? <Preloader customClass=""/> : <div className="quarter_blocks">
        {films.map((item: TFilm) => <FilmBlock key={item.id} film={item}/>)}
        {searchQuery.length > 1 && films.length === 0 && <h3 className='subtitle'>Nothing found :(</h3>}
      </div>}
    </div>
  </section>
}