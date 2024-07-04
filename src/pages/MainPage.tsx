import React from "react";
import {MainHero} from "../components/main_hero/MainHero";
import {PopularMoviesSection} from "../components/PopularMoviesSection";


function MainPage() {
  return (
    <>
      <MainHero/>
      <PopularMoviesSection/>
    </>
  )
}

export default MainPage;
