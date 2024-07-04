import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const fetchGenres = createAsyncThunk(
  'users/fetchGenresStatus',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${process.env.REACT_APP_TMD_API_KEY}`)
      return response.data.genres
    } catch (err:any) {
      return rejectWithValue(err.response.status)
    }
  },
)

export default fetchGenres;