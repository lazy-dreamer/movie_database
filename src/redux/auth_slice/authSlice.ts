import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  userName: '',
  userId: '',
  authProvider: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuth = true;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.authProvider = action.payload.authProvider;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.userName = '';
      state.userId = '';
      state.authProvider = '';
    }
  }
})

export const {setLogin, setLogout} = authSlice.actions

export default authSlice.reducer