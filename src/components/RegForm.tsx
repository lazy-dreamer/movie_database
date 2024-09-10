import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";
import { AppDispatch} from "../redux/store";
import {setLogin} from "../redux/auth_slice/authSlice";

interface Props {
  className?: string,
  modalClose: (arg:boolean)=>void,
  toggleForm: (arg: boolean)=>void
}

export const RegForm:React.FC<Props> = ({className, toggleForm, modalClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();
  
  const regHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success('Registration successful!', {
          icon: '✅',
        })
        dispatch(setLogin({
          userName: user.email,
          userId: user.uid,
          authProvider: user.providerData[0].providerId
        }))
        setEmail('')
        setPassword('')
        modalClose(false)
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          icon: '⛔️',
        });
      });
  }
  
  return <div className={className}>
    <h3 className='subtitle'>Registration form</h3>
    <form className='offsets_inside' onSubmit={regHandler}>
      <input type="email" placeholder='Enter e-mail' value={email} onChange={(e) => setEmail(e.target.value)} name='e-mail' />
      <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' />
      <button type='submit' className='main_btn min_wide'>Register</button>
    </form>
    <div className="form_bottom_variants">
      <button onClick={()=>toggleForm(false)} className='green font_md'>Go to Login</button>
      <p>or</p>
    </div>
  </div>;
}