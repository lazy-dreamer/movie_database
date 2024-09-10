import React from "react";
import s from './header_user.module.scss'
import { getAuth, signOut } from "firebase/auth";
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setLogout} from "../../redux/auth_slice/authSlice";

interface Props {
  className?: string,
  user: string
}

export const HeaderUser:React.FC<Props> = ({className, user}) => {
  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();
  
  const logOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setLogout())
      toast.success('Successfully signed out!', {
        icon: '✅',
      })
    }).catch((error) => {
      toast.error('Sign out failure :(', {
        icon: '⛔️',
      });
    });
  }
  return <div className={`${className} ${s.header_user} green`}>
    <p className='font_md'>{user.substring(0, user.indexOf('@'))}</p>
    <button className={s.logout_btn} onClick={logOutHandler}><img src="logout.svg" alt="logout"/></button>
  </div>;
}