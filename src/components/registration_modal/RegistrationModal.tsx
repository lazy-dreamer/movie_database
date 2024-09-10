import React, {useState} from "react";
import s from './reg_modal.module.scss'
import {LoginForm} from "../LoginForm";
import {RegForm} from "../RegForm";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {provider} from "../../index";
import toast from 'react-hot-toast';
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {setLogin} from "../../redux/auth_slice/authSlice";

interface Props {
  className?: string,
  modalClose: (arg:boolean)=>void
}

export const RegistrationModal:React.FC<Props> = ({className, modalClose}) => {
  const [isRegistration, setIsRegistration] = useState(false)
  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();
  
  const googleAuthHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setLogin({
          userName: user.email,
          userId: user.uid,
          authProvider: user.providerData[0].providerId
        }))
        toast.success('Login successful!', {
          icon: '✅',
        })
        console.log(user)
        modalClose(false)
      }).catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        icon: '⛔️',
      });
    });
  }
  
  return <div className={`${className?className:''} ${s.reg_modal}`}>
    <button className='modal_close' onClick={()=>modalClose(false)}/>
    {
      isRegistration ? 
      <RegForm modalClose={modalClose} toggleForm={setIsRegistration} className='offsets_inside'/> : 
      <LoginForm modalClose={modalClose} toggleForm={setIsRegistration} className='offsets_inside'/>
    }
    {
      <p className='variant_line pt_xs'>
        <span>Sign in with</span>
        <button className='google_btn' onClick={googleAuthHandler}><img src="google.png" alt="google ico"/> <span>Google</span>
        </button>
      </p>
    }
  </div>
}