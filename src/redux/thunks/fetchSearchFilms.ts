import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const fetchSearchFilms = createAsyncThunk(
  'users/fetchSearchFilms',
  async (search: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&query=${search}&sort_by=popularity.desc`)
      // console.log(response.data.results)
      return response.data.results
    } catch (err: any) {
      return rejectWithValue(err.response.status)
    }
  },
)

export default fetchSearchFilms;