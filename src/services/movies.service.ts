import axios from "axios";

export const MoviesService = {
  async getMovieById(id:string) {
    const film = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&page=1`)

    return film.data
  },
  async getRecommendedMovies(id:string) {
    const film = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&page=1`)

    return film.data.results
  },
  async getSimilarMovies(id:string) {
    const film = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&page=1`)

    return film.data.results
  },
  async getMovieReviews(id:string) {
    const film = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&page=1`)

    return film.data.results
  },
  async searchMovies(search:string) {
    const film = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMD_API_KEY}&language=en-US&query=${search}&sort_by=popularity.desc`)

    return film.data.results
  }
}