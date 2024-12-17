import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./rateMovieFunct.css";
import movieApi from "../../api/movieApi";
import { useAuth } from "../../Context/authContext";
import { useDetail } from "../../Context/detailContext";

const Rating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const {setRatingCount,setAverageRating}=useDetail()
  const [hasRated, setHasRated] = useState(false);
  const {user}=useAuth()
  useEffect(()=>{
    const initialRating=user.ratings.find((movie)=>movie.movieId==id)?.rate
    if(initialRating){
      setRating(initialRating)
      setHasRated(true)
    }
  },[user,id])
  const handleRating = async (ratingValue) => {
    try {
      const response = await movieApi.rateMovie(id, ratingValue);
      setAverageRating(response.data.content.averageRating);
      setRatingCount(response.data.content.ratingCount);
      setRating(ratingValue);
      setHasRated(true);
    } catch (error) {
      console.log("Failed to rate", error);
    }
  };

  return (
    <div className="rating-page">
      {/* 10 stars for rating*/}
      <div className="star-rating">
        {[...Array(10)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue)}
                disabled={hasRated} // Disable the input if the user has rated
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => !hasRated && setHover(ratingValue)}
                onMouseLeave={() => !hasRated && setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {hasRated && (
        <div className="hasRated-tooltip">Note: You have rated this movie!</div>
      )}
    </div>
  );
};

export default Rating;
