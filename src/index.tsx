import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import MainPage from './pages/MainPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {AboutPage} from "./pages/AboutPage";
import {ErrorPage} from "./pages/error_page/ErrorPage";
import {MoviePage} from "./pages/MoviePage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {SearchPage} from "./pages/SearchPage";
import {Layout} from "./components/Layoyut";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <MainPage/>
      },
      {
        path: "/movie/:id",
        element: <MoviePage/>
      },
      {
        path: "/about",
        element: <AboutPage/>
      },
      {
        path: "/search",
        element: <SearchPage/>
      },
      {
        path: "/favorites",
        element: <FavoritesPage/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RouterProvider router={router}/>
);
