import React from "react";
import "./DropDown.css";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
const SearchDropdown = ({
  genres,
  selectedGenres,
  handleGenreSelect,
  selectedRatings,
  handleRatingSelect,
  CloseDropDown,
}) => {
  const ratingScore = [
    "Wonderful: 9+",
    "Very good: 8+",
    "Good: 7+",
    "Pleasant: 6+",
    "Average: 5+",
    "Bad: 4+",
    "Poor: 3+",
    "Very poor: 2+",
  ];
  return (
    <div className="drop-down max-h-[80vh]">
      {/* close button */}
      <button className="close-btn-container">
        <div>
          {" "}
          <AiFillCloseSquare
            className="cursor-pointer text-2xl sm:text-3xl text-gray-400 hover:text-white transition-colors duration-200"
            onClick={CloseDropDown}
          />{" "}
        </div>
      </button>
      <div className="filter-type">
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Genres</h3>
        <div className="dropdown-line"></div>
        <p className="text-sm sm:text-lg md:text-xl">*Pick a maximum of 3*</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-7 gap-4 my-5">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`relative genre-tab text-sm sm:text-base md:text-lg  ${
              selectedGenres.includes(genre) ? "selected" : ""
            } 
                        ${
                          selectedGenres.length >= 3 &&
                          !selectedGenres.includes(genre)
                            ? "faded"
                            : ""
                        }`}
            onClick={() => handleGenreSelect(genre)}
          >
            {/*tick when genre is choosen*/}
            {genre}
          </div>
        ))}
      </div>
      <div className="filter-type">
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium">
          Rating score
        </h3>
        <div className="dropdown-line"></div>
        <p className="text-sm sm:text-lg md:text-xl">*Pick a maximum of 3*</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 my-5">
        {ratingScore.map((rating) => (
          <div
            key={rating}
            className={`rating-tab text-sm sm:text-base md:text-lg  ${
              selectedRatings.includes(parseFloat(rating.split(":")[1]))
                ? "selected"
                : ""
            } 
                        ${
                          selectedRatings.length >= 3 &&
                          !selectedRatings.includes(
                            parseFloat(rating.split(":")[1])
                          )
                            ? "faded"
                            : ""
                        }`}
            onClick={() => handleRatingSelect(rating)}
          >
            {rating}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (selectedRatings.length < 1 && selectedGenres.length < 1) {
            alert("Please select a filter");
          } else {
            CloseDropDown();
          }
        }}
        className="apply-filter-btn sm:text-lg md:text-xl font-medium w-full h-12 sm:h-14"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SearchDropdown;
