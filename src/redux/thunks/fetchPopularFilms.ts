import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import { RootState } from '../store';
type TActiveFilterGenre = {
  value:number;
  label:string
}
interface FetchPopularFilmsResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

const fetchPopularFilms = createAsyncThunk<FetchPopularFilmsResponse, number, { state: RootState }>(
  'users/fetchPopularFilmsStatus',
  async (pageId:number, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {filter} = getState();
    let activeGenres;
    if (filter.activeGenres.length > 0) {
      activeGenres = filter.activeGenres.map((el:TActiveFilterGenre) => el.value)
    }

    try {
      const response = await axios.get<FetchPopularFilmsResponse>(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMD_API_KEY}${filter.activeGenres.length > 0 ? `&with_genres=${activeGenres.toString()}` : ''}&sort_by=${filter.sorting.value}&page=${pageId}`)
      // console.log(response.data.results)
      return response.data
    } catch (err:any) {
      return rejectWithValue(err.response.status)
    }
  },
)

export default fetchPopularFilms;