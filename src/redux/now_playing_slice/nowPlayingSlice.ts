import {createSlice} from '@reduxjs/toolkit'
import fetchNowPlaying from "../thunks/fetchNowPlaying";

const initialState = {
  nowPlaying: [],
  status: 'loading',
  errorStatus: 0
}

export const filmsSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNowPlaying.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchNowPlaying.fulfilled, (state, action) => {
      state.status = 'success';
      state.nowPlaying = action.payload;
    })
    builder.addCase(fetchNowPlaying.rejected, (state, action) => {
      state.status = 'error';
      state.errorStatus = action.error.message ? Number(action.error.message) : 0
    })
  },
})


export default filmsSlice.reducer