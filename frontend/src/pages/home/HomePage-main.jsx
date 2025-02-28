

import "./homepage-main.css";
import Header from "../../components-main/header/Header";
import HeroSlide from "../../components-main/hero-slide/HeroSlide";
import MovieList from "../../components-main/movie-list/MovieList";
import { movieType } from "../../api/movieApi";
import { useAuth } from "../../Context/authContext";

const HomePage_Main = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Header */}
      <div className="container">
        <Header />
      </div>
      {/* Hero-slide */}
      <HeroSlide></HeroSlide>
      <div className="mx-10">
        <div className="container">
          <div className="section_header mb-1 mt-2 font-mono text-xl">
            <h2>History</h2>
          </div>
          {user && user?.viewHistory?.length > 0 ? (
            <MovieList movies={user?.viewHistory.slice(0, 5)} />
          ) : (
            <div className="no-movies">
              <p>No movies in progress. Try watching something! </p>
            </div>
          )}
          <div className="section_header mb-1 mt-2 font-mono text-xl">
            <h2>Trending Movies</h2>
          </div>
          <MovieList type={movieType.trending}></MovieList>
          <h2 className="section_header mb-1 mt-2 font-mono text-xl">Popular Movies</h2>

          <MovieList type={movieType.popular}></MovieList>

          <h2 className="section_header mb-1 mt-2 font-mono text-xl">Top 10 highest rate </h2>
          <MovieList type={movieType.top_rated}></MovieList>

          <br></br>
        </div>
      </div>
    </div>
  );
};

export default HomePage_Main;
