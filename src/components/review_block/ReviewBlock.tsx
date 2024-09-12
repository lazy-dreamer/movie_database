import React from "react";
import s from './review_block.module.scss'
import { TReview } from "../Reviews";
import {parseISOString} from "../../services/iso_string_parser";

type TReviewLocal = {
  review: TReview
}

export const ReviewBlock:React.FC<TReviewLocal> = ({review}) => {
  const {author_details, content, created_at, url} = review;
  const date = parseISOString(created_at);
  const month = date.getMonth() + 1;
  const formattedDate = date.getFullYear() + '/' + (month < 10 ? ('0' + month.toString()) : month) + '/' + date.getDate() + ' ' + date.toLocaleTimeString();

  return <div className={s.review_block}>
    <div className={s.head}>
      <div className={`${author_details.avatar_path ? '' : "no_avatar"} ${s.avatar}`}
           style={author_details?.avatar_path && author_details.avatar_path.length>0? ({backgroundImage: `url(${'https://image.tmdb.org/t/p/w92' + author_details.avatar_path})`}) : {left:0}}/>
      <div className={s.name}>{author_details.username}</div>
    </div>
    <div className={s.body}>
      <p>{content}</p>
      <div className={s.sides}>
        <a href={url} target="_blank" className='underline font'>Read on <span className="green">TMDB</span> site</a>
        <p className={s.created}>{formattedDate}</p>
      </div>
    </div>
  </div>;
}