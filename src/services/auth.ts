import {AppDispatch} from "../redux/store";
import {setLogin} from "../redux/auth_slice/authSlice";
import {getUserFavorites} from "./favorites";
import {setFavFilms} from "../redux/films_slice/filmsSlice";
import { User } from 'firebase/auth';

export function setLoginInfo(user:User, dispatch:AppDispatch) {
  
  dispatch(setLogin({
    userName: user.email,
    userId: user.uid,
    authProvider: user.providerData[0].providerId
  }))
  getUserFavorites(user.uid).then(favorites => {
    dispatch(setFavFilms(favorites));
  });
}