import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useHistory
import DetailHeader from "./movie-header";
import Cast from "./cast";
import movieApi from "../../api/movieApi";
import Header from "../../components-main/header/Header";
import { useDetail } from "../../Context/detailContext";
const Detail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [credit, setCredit] = useState(null); 
  const {setRatingCount,setAverageRating}=useDetail()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await movieApi.getMovieDetails(id);
        setMovie(response.data.content); 
        setCredit(response.data.content.credit); 
        setAverageRating(response.data.content.averageRating);
        setRatingCount(response.data.content.ratingCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovieDetails();
  }, [id]); 

  if (!movie && !credit)
    return (
      <div className="h-screen text-white relatvie">
        <div className="container">
          <Header />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  return (
    <div className="detail-page">
      {/* Header */}
      <div className="container">
        <Header />
      </div>
      {/* MovieInfo */}

      <DetailHeader movie={movie} credit={credit}></DetailHeader>

      {/* Cast */}
      <div className="mx-10">
        <Cast credit={credit}></Cast>
      </div>
    </div>
  );
};

export default Detail;
