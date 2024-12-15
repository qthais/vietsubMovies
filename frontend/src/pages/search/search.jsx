import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components-main/movie-card/MovieCard";
import movieApi from "../../api/movieApi";
import "./search.css";
import Header from "../../components-main/header/Header";
import { useAuth } from "../../Context/authContext";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import axios from "axios";
import EditMovieModal from "../../components-main/admin/editModal";
const Search = () => {
  const location = useLocation();
  const [searchMode, setSearchMode] = useState("filter");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditMovie, setCurrentEditMovie] = useState(null);
  const handleReleased = async (movieID) => {
    try {
      const response = await movieApi.toggleReleased(movieID);
      const updatedMovie = response.data.content;

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id
            ? { ...movie, isPublished: updatedMovie.isPublished }
            : movie
        )
      );

      toast.success("Update successfully!");
    } catch (err) {
      toast.error(err.response?.data.message || "Update failed!");
    }
  };
  const handleEditClick = (movie) => {
    setCurrentEditMovie(movie);
    setIsModalOpen(true); // Open the modal
  };
  const handleUpdate = async (movieId) => {
    try {
      const updateData = { ...currentEditMovie };
      delete updateData._id;
      const response = await axios.post(
        `/api/movie/${movieId}/update`,
        updateData
      );
      console.log(movieId);
      const updatedMovie = response.data.content;
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        )
      );
      toast.success(`Update ${updatedMovie.title} successfully!`);
      // setCurrentEditMovie(null);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data.message || "Update failed!");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const movieNameQueryParam = queryParams.get("movieName");
    if (movieNameQueryParam) {
      setSearchMode("name");
      setQuery(location.search);
    } else {
      setSearchMode("filter");
      setQuery(location.search);
    }
  }, [location.search]);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        let allMovies = [];
        let optionMovies = [];
        const queryParams = new URLSearchParams(query);
        const movieNameQueryParam = queryParams.get("movieName");
        const genreQueryParam = queryParams.get("genres");
        const ratingQueryParam = queryParams.get("ratings");

        if (movieNameQueryParam) {
          const response = await movieApi.searchMovie(movieNameQueryParam);
          allMovies = response.data.content;
        }

        if (genreQueryParam || ratingQueryParam) {
          let filteredMovies = allMovies;

          const options = {
            genreNames: genreQueryParam ? genreQueryParam.split("-") : [],
            minRatings: ratingQueryParam
              ? ratingQueryParam.split("-").map(Number)
              : [],
          };

          const response = await movieApi.getMoviesByOption(options);
          console.log(response);
          optionMovies = response.data.content;

          if (allMovies.length > 0) {
            const movieIds = new Set(allMovies.map((movie) => movie.id));
            filteredMovies = optionMovies.filter((movie) =>
              movieIds.has(movie.id)
            );
          } else {
            filteredMovies = optionMovies;
          }

          allMovies = filteredMovies;
        }

        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      handleSearch();
    }
  }, [query, searchMode]);
  return (
    <>
      <div className="searchresult">
        <Header className="Header" setQuery={setQuery} />
        <div>
          {loading ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
          ) : (
            <div>
              <div className="query-value">
                {(() => {
                  const queryParams = new URLSearchParams(query);
                  const movieName = queryParams.get("movieName");
                  const genreQueryParam = queryParams.get("genres");
                  const ratingQueryParam = queryParams.get("ratings");
                  const genres = genreQueryParam
                    ? genreQueryParam.split("-").join(" & ")
                    : "";
                  const ratings = ratingQueryParam
                    ? ratingQueryParam
                        .split("-")
                        .map((r) => `${r}`)
                        .join(" & ")
                    : "";

                  if (movieName) {
                    return (
                      <h2 className="text-2xl font-semibold text-second-blue my-4">
                        {movies.length} results for{" "}
                        <span className="font-bold">"{movieName}"</span>{" "}
                        {genres || ratings ? "with " : ""}
                        {genres ? (
                          <span className="text-blue-600">
                            genres: {genres}
                          </span>
                        ) : (
                          ""
                        )}
                        {genres && ratings ? " , " : ""}
                        {ratings ? (
                          <span className="text-green-600">
                            ratings: {ratings}
                          </span>
                        ) : (
                          ""
                        )}
                      </h2>
                    );
                  } else {
                    return (
                      <h2>
                        {movies.length} results with{" "}
                        {genres ? `genres: ${genres}` : ""}
                        {genres && ratings ? " , " : ""}
                        {ratings ? `ratings: ${ratings}` : ""}
                      </h2>
                    );
                  }
                })()}
              </div>
              <div className="search-movie-list">
                {movies.map((movie) => (
                  <div className="movieCard" key={movie.id}>
                    <MovieCard item={movie} />
                    {user.role == "admin" && (
                      <div className="mt-5 flex justify-between">
                        {movie.isPublished ? (
                          <button
                            onClick={() => handleReleased(movie._id)}
                            className={
                              "text-xs bg-green-600 rounded-2xl px-1 py-2 sm:px-4 sm:text-sm"
                            }
                          >
                            Released
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReleased(movie._id)}
                            className={
                              "text-xs bg-red-600 rounded-2xl px-1 py-2 sm:px-4 sm:text-sm"
                            }
                          >
                            Unreleased
                          </button>
                        )}
                        <button
                          onClick={() => handleEditClick(movie)}
                          className="flex items-center text-xs bg-first-blue rounded-2xl px-1 py-2 sm:px-4 sm:text-sm"
                        >
                          Update <Edit className="ml-1 size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <EditMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={currentEditMovie}
        setMovie={setCurrentEditMovie}
        onSave={() => handleUpdate(currentEditMovie._id)}
      />
    </>
  );
};

export default Search;
