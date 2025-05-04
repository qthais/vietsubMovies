import { useState, useEffect } from "react";
import Header from "../../components-main/header/Header";
import "./AdminDashboard.css";
import MovieCard from "../../components-main/movie-card/MovieCard";
import { useGetAllMovies } from "../../hooks/getTrendingContent";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Edit } from "lucide-react";
import EditMovieModal from "../../components-main/admin/editModal";
import axiosClient from "../../api/axiosClient";

const AdminDashboard = () => {
  const { allMovies, setAllMovies } = useGetAllMovies();
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditMovie, setCurrentEditMovie] = useState({});
  const itemsPerPage = 12;
  useEffect(() => {
    const updatePageRange = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPageRangeDisplayed(3);
      } else if (width >= 640 && width < 768) {
        setPageRangeDisplayed(4);
      } else if (width >= 768 && width < 1024) {
        setPageRangeDisplayed(5);
      } else if (width >= 1024 && width < 1280) {
        setPageRangeDisplayed(6);
      } else {
        setPageRangeDisplayed(7);
      }
    };

    updatePageRange();

    // Add event listener for screen resize
    window.addEventListener("resize", updatePageRange);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updatePageRange);
  }, []);
  const handleReleased = async (movieID) => {
    try {
      const response = await axiosClient.get(
        `/api/movie/${movieID}/toggleRelease`
      );
      const updatedMovie = response.data.content;

      setAllMovies((prevMovies) =>
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
      const response = await axiosClient.post(
        `/api/movie/${movieId}/update`,
        updateData
      );
      console.log(movieId);
      const updatedMovie = response.data.content;
      setAllMovies((prevMovies) =>
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

  // Pagination logic
  const pageCount = Math.ceil(allMovies.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const currentMovies = allMovies.slice(startOffset, endOffset);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Update current page
  };

  if (allMovies.length == 0) {
    return (
      <div className="h-screen text-white relative">
        <div className="container">
          <Header />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="search-movie-list">
        {currentMovies.map((movie) => (
          <div className="movieCard" key={movie._id}>
            <MovieCard item={movie} />
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
          </div>
        ))}
      </div>

      <EditMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={currentEditMovie}
        setMovie={setCurrentEditMovie}
        onSave={() => handleUpdate(currentEditMovie._id)}
      />

      {/* Pagination Component */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel="< Prev"
        containerClassName="flex justify-center items-center space-x-2 mt-8 mx-4" // Wrapper styling
        pageClassName="px-4 py-2 border rounded-md text-white hover:bg-gray-100 hover:text-black" // Individual page styling
        activeClassName="bg-blue-500 text-white" // Active page styling
        previousClassName="px-4 py-2 border rounded-md text-white hover:bg-gray-100 hover:text-black"
        nextClassName="px-4 py-2 border rounded-md text-white hover:bg-gray-100 hover:text-black"
        breakClassName="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        disabledClassName="opacity-50 cursor-not-allowed" // Disabled state styling
      />
    </>
  );
};

export default AdminDashboard;
