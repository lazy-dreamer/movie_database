import {createSlice} from '@reduxjs/toolkit'
import fetchPopularFilms from "../thunks/fetchPopularFilms";
import { TFilm } from '../../components/PopularMovies';


interface State {
  favorites: TFilm[];
  films: TFilm[];
  page: number;
  totalPages: number;
  status: 'loading' | 'success' | 'error';
  errorStatus: number;
}

const initialState:State = {
  favorites: [],
  films: [],
  page: 1,
  totalPages: 1,
  status: 'loading',
  errorStatus: 0
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFavFilms: (state, action) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload]
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload.id)
    },
    setActivePage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularFilms.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchPopularFilms.fulfilled, (state, action) => {
      state.status = 'success';
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      state.films = action.payload.results;
    })
    builder.addCase(fetchPopularFilms.rejected, (state, action) => {
      state.status = 'error';
      state.errorStatus = action.error.message ? Number(action.error.message) : 0
    })
  },
})

export const {setFavFilms, addFavorite, removeFavorite, setActivePage} = filmsSlice.actions

export default filmsSlice.reducer