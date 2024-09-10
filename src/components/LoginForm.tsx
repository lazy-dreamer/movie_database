import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';
import {setLogin} from "../redux/auth_slice/authSlice";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";

interface Props {
  className?: string
  modalClose: (arg:boolean)=>void,
  toggleForm: (arg: boolean)=>void
}

export const LoginForm:React.FC<Props> = ({className, toggleForm, modalClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();
  
  const loginHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success('Login successful!', {
          icon: '✅',
        })
        dispatch(setLogin({
          userName: user.email,
          userId: user.uid,
          authProvider: user.providerData[0].providerId
        }))
        console.log(user)
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
    <h3 className='subtitle'>Login form</h3>
    <form className='offsets_inside' onSubmit={loginHandler}>
      <input type="email" placeholder='Your e-mail' value={email} onChange={(e) => setEmail(e.target.value)} name='e-mail' />
      <input type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' />
      <button type='submit' className='main_btn min_wide'>Login</button>
    </form>
    <div className="form_bottom_variants">
      <button onClick={()=>toggleForm(true)} className='green font_md'>Go to Registration</button>
      <p>or</p>
    </div>
  </div>;
}