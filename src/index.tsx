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
// <React.StrictMode>
  <RouterProvider router={router}/>
// </React.StrictMode>
);
