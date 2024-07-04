import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const fetchNowPlaying = createAsyncThunk(
  'users/fetchNowPlaying',
  async (pageId:number, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&page=${pageId}`)
      // console.log(response.data.results)
      return response.data.results
    } catch (err:any) {
      return rejectWithValue(err.response.status)
    }
  },
)

export type TNowPlaying = {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

export default fetchNowPlaying;