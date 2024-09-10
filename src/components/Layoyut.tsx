import {Outlet} from "react-router-dom" ;
import {Footer} from "./footer/Footer";
import {Header} from "./header/Header";
import React from "react";
import {store} from "../redux/store";
import {Provider} from "react-redux";
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <div className="page_wrapper">
        <Header/>
        <main className='content'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </Provider>
  )
}