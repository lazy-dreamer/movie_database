import React from "react";

export function AboutPage() {
  return <section>
    <div className="screen_content">
      <div className="simple_text text_container">
        <h3>What is TMDB's API?</h3>
        <p>The API service is for those of you interested in using our movie, TV show or actor images and/or data in
          your application. Our API is a system we provide for you and your team to programmatically fetch and use our
          data and/or images.
        </p>

        <h3>Popularity</h3>
        <p>Popularity is a fairly important metric here on TMDB. It helps us boost search results, adds an incredibly
          useful sort value for discover, and is also just kind of fun to see items chart up and down. You can think of
          popularity as being a "lifetime" popularity score that is impacted by the attributes below. It's calculated
          quite differently than trending.</p>
        <p>Each model builds their popularity value slightly differently. Here are some of the attributes we use for
          each media type.</p>

        <h3>Trending</h3>
        <p>Trending is another type of "popularity" score on TMDB but unlike popularity (discussed above), trending's
          time windows are much shorter (daily, weekly). This helps us surface the relevant content of today (the new
          stuff) much easier.</p>
        <p>Just like popularity, we track trending scores for movies, TV shows and people.</p>
      </div>
    </div>
  </section>;
}