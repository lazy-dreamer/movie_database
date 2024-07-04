import {configureStore, combineReducers} from "@reduxjs/toolkit";
import filmsReducer from "./films_slice/filmsSlice"
import authReducer from "./auth_slice/authSlice"
import filterReducer from "./filter_slice/filterSlice"
import nowPlaying from "./now_playing_slice/nowPlayingSlice"
import searchReducer from './search_slice/searchSlice'

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    nowPlaying: nowPlaying,
    auth: authReducer,
    filter: filterReducer,
    search: searchReducer
  }
})

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch