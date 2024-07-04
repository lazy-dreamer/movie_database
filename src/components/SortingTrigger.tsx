import React, {useEffect, useState} from "react";
import Select from "react-select";
import {SortingService} from "../services/sorting.service";
import {setSorting} from "../redux/filter_slice/filterSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActivePage} from "../redux/films_slice/filmsSlice";
import fetchPopularFilms from "../redux/thunks/fetchPopularFilms";
import { AppDispatch, RootState } from "../redux/store";

const sortingOption = SortingService.getSortOptions();

export function SortingTrigger() {
  const dispatch: AppDispatch = useDispatch();
  const sorting = useSelector((state:RootState) => state.filter.sorting)
  const [selectedOption, setSelectedOption] = useState(sorting);

  useEffect(() => {
    if (selectedOption !== sorting) {
      dispatch(setSorting(selectedOption))
      dispatch(fetchPopularFilms(1));
      dispatch(setActivePage(1));
    }
  }, [selectedOption])


  return <div className="select_block">
    {sortingOption.length > 0 ? <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      classNamePrefix="react-select"
      placeholder="Choose something..."
      options={sortingOption}
    /> : 'Loading...'}
  </div>;
}