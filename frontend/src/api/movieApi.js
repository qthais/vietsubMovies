import axiosClient from "./axiosClient";


export const movieType = {
  trending: "trending",
  popular: "popular",
  top_rated: "top_rated",
  all:'all'
};
export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
  "Music",
];

const movieApi = {
  getMoviesList: (type) => {
    const url = `/api/movie/${movieType[type]}`;
    return axiosClient.get(url);
  },
  getMoviesListByType: (type) => {
    const url = `/api/movie/type?category=${movieType[type]}`;
    return axiosClient.get(url);
  },
  getTopRatedMovies: () => {
    const url = `/api/movie/top-rated`;
    return axiosClient.get(url);
  },
  getMovieDetails: (id) => {
    const url = `/api/movie/${id}/details`;
    return axiosClient.get(url);
  },

  getMoviesByCategory: (cate) => {
    const url = `/api/movie/${cate}/category`;
    return axiosClient.get(url, { cate });
  },
  getMoviesByOption: (option) => {
    const url = `/api/movie/options`;
    return axiosClient.post(url, option);
  },

  searchMovie: (movieName) => {
    const url = `/api/search/movie`;
    return axiosClient.get(url, {
      params: {
        name: movieName,
      },
    });
  },
  rateMovie: (id, rating) => {
    const url = `/api/movie/${id}/rate`;
    return axiosClient.patch(url, { rating });
  },

  loveMovie: (id) => {
    const url = `/api/movie/${id}/favorite`;
    return axiosClient.post(url);
  },
  searchPerson: (personName) => {
    const url = `/api/search/person`;
    return axiosClient.get(url, {
      params: {
        name: personName,
      },
    });
  },
  toggleReleased:(movieId)=>{
    return axiosClient.get(`/api/movie/${movieId}/toggleRelease`);
  },
  updateMovie:(movieId,UpdateBody)=>{
    return axiosClient.post(`/api/movie/${movieId}/update`,UpdateBody)
  }
};

export default movieApi;