import {createSlice} from '@reduxjs/toolkit';
import fetchGenres from "../thunks/fetchGenres";

const initialState = {
  activeGenres: [],
  sorting: {
    "value": "popularity.desc",
    "label": "popularity.desc"
  },
  status: 'idle',
  genres: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveGenre: (state, action) => {
      state.activeGenres = action.payload
    },
    setSorting: (state, action) => {
      state.sorting = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.status = 'success';
      state.genres = action.payload;
    })
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.status = 'error';
    })
  },
})

export const {setActiveGenre, setSorting} = filterSlice.actions

export default filterSlice.reducer