import {createSlice} from '@reduxjs/toolkit'
import fetchSearchFilms from "../thunks/fetchSearchFilms";
import {TFilm} from '../../components/PopularMovies';

interface State {
  searchQuery: string;
  films: TFilm[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorStatus: number;
}

const initialState: State = {
  searchQuery: '',
  films: [],
  status: 'idle',
  errorStatus: 0
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    resetSearchQuery: (state) => {
      state.searchQuery = '';
      state.films = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchFilms.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchSearchFilms.fulfilled, (state, action) => {
      state.status = 'success';
      state.films = action.payload;
    })
    builder.addCase(fetchSearchFilms.rejected, (state, action) => {
      state.status = 'error';
      state.errorStatus = action.error.message ? Number(action.error.message) : 0
    })
  },
})

export const {setSearchQuery, resetSearchQuery} = searchSlice.actions

export default searchSlice.reducer