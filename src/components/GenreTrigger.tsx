import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActiveGenre} from "../redux/filter_slice/filterSlice";
import Select from "react-select";
import fetchPopularFilms from "../redux/thunks/fetchPopularFilms";
import {setActivePage} from "../redux/films_slice/filmsSlice";
import fetchGenres from "../redux/thunks/fetchGenres";
import { AppDispatch, RootState } from '../redux/store';

type TGenre = {
  "id": number;
  "name": string
}
type TGenreOption = {
  "value": number;
  "label": string
}

export function GenreTrigger() {
  const dispatch: AppDispatch = useDispatch();
  const genres = useSelector((state:RootState) => state.filter.genres);
  const activeGenres = useSelector((state:RootState) => state.filter.activeGenres);
  const selectOptions = genres.map((genre:TGenre):TGenreOption => {
    return {
      "value": genre.id,
      "label": genre.name
    }
  })
  const [selectedOption, setSelectedOption] = useState(activeGenres);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres())
    }
  }, [])

  useEffect(() => {
    if (selectedOption !== activeGenres) {
      dispatch(setActiveGenre(selectedOption))
      dispatch(fetchPopularFilms(1));
      dispatch(setActivePage(1));
    }
  }, [selectedOption])
  
  return <div className="select_block">
    {selectOptions.length > 0 ? <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      classNamePrefix="react-select"
      placeholder="Choose something..."
      closeMenuOnSelect={false}
      isMulti
      options={selectOptions}
    /> : 'Loading ...'}
  </div>;
}