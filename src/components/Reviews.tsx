import React, {useEffect, useState} from "react";
import {MoviesService} from "../services/movies.service";
import {Preloader} from "./preloader/Preloader";
import {ReviewBlock} from "./review_block/ReviewBlock";
import { TId } from "./movie_details/MovieDetails";

type TAuthorDetails = {
  "name": string;
  "username": string;
  "avatar_path": string;
  "rating": number | null 
}

export type TReview = {
  "author": string;
  "author_details": TAuthorDetails;
  "content": string;
  "created_at": string;
  "id": string;
  "updated_at": string;
  "url": string
}

export const Reviews:React.FC<TId> = ({id}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecommendedMovies = async (id:string) => {
      const movieReviews = await MoviesService.getMovieReviews(id)
      setReviews(movieReviews)
      setLoading(false)
    }

    fetchRecommendedMovies(id)
  }, [id]);

  return <section>
    <div className="screen_content">
      <h1 className='main_title'>Reviews:</h1>
      {loading ? <Preloader customClass=""/> : reviews.length > 0 ? reviews.map((item:TReview) => <ReviewBlock key={item.id} review={item}/>) :
        <p className='subtitle'>Sorry, there are no reviews :(</p>}
    </div>
  </section>;
}