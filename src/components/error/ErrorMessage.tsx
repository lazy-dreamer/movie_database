import React, {useState, useEffect} from "react";
import styles from './error_message.module.scss'

type TError = {
  error: string
}

export const ErrorMessage:React.FC<TError> = ({error}) => {
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    return () => {
      switch (error) {
        case '404':
          setErrorMsg('Not found!')
          break
        default:
          setErrorMsg('Something went wrong...')
          break
      }
    };
  }, []);

  return <h1 className={styles.title}>{errorMsg}</h1>;
}