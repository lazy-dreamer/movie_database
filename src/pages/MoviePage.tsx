import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {MovieDetails} from "../components/movie_details/MovieDetails";
import {RecommendedMovies} from "../components/RecommendedMovies";
import {SimilarMovies} from "../components/SimilarMovies";
import {Reviews} from "../components/Reviews";

export function MoviePage() {
  const {id} = useParams() as { id: string };
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    })
  }, [id])
  return <>
    <MovieDetails id={id}/>
    <SimilarMovies id={id}/>
    <RecommendedMovies id={id}/>
    <Reviews id={id}/>
  </>;
}