
import { useParams, useNavigate } from "react-router-dom";
import "./watching.css";
import { useEffect, useState } from "react";
import Header from "../../components-main/header/Header";
import { formatReleaseDate } from "../../utils/DateFunction";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constant";
import { useAuth } from "../../Context/authContext";
import axiosClient from "../../api/axiosClient";
const Watching = () => {
  const { id, type } = useParams(); //watching/:id or watching/:id/:type
  const [videoLink, setVideoLink] = useState([]);
  const [movieData, setMovieData] = useState(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [iframeDimensions, setIframeDimensions] = useState({
    width: 854, // Default width
    height: 480, // Default height
  });
  useEffect(() => {
    const updateIframeDimensions = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setIframeDimensions({ width: 426, height: 240 });
      } else if (width >= 640 && width < 1024) {
        setIframeDimensions({ width: 640, height: 360 });
      } else {
        setIframeDimensions({ width: 854, height: 480 });
      }
    };

    updateIframeDimensions();

    // Add event listener for resize
    window.addEventListener("resize", updateIframeDimensions);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateIframeDimensions);
  }, []);
  useEffect(() => {
    const getLink = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get(`/api/movie/${id}/details`);
        setMovieData(response.data.content);
        increaseViewCount(response.data.content);

        let video = null;
        if (type === "trailer") {
          video = response.data.content.videos.find(
            (video) => video.type === "Trailer"
          );
          if (video) {
            setVideoLink(`https://www.youtube.com/embed/${video.key}`);
          }
        } else {
          video = response.data.content.videos.find(
            (video) => video.type === "full-time"
          );
          if (video) {
            setVideoLink(video.key); // Update state with the video link
          } else {
            // If no full-time video found, try to find trailer
            video = response.data.content.videos.find(
              (video) => video.type === "Trailer"
            );
            if (video) {
              setVideoLink(`https://www.youtube.com/embed/${video.key}`);
            }
          }
        }
        if (!video) {
          console.log(`No ${type || "full-time"} video available.`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLink();
  }, []);


  // increase view count
  const increaseViewCount = async (movieDetail) => {
    try {
      await axiosClient.get(`/api/movie/${id}/view`);
      const updatedViewHistory = user.viewHistory.filter(
        (item) => item._id !== movieDetail?._id
      );
      updatedViewHistory.unshift(movieDetail); 
      setUser(prev=>({
        ...prev,
        viewHistory:updatedViewHistory,
      }))
    } catch (error) {
      console.error(error);
    }
  };

  // link to rate video page
  const handleGoBack = () => {
    navigate(`/detail/${id}`);
  };
  if (isLoading) {
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
    <div>
      {videoLink ? (
        <div className="bg-black min-h-screen text-white">
          <Header />
          <div className="pt-20 aspect-video pb-8 p-2 sm:px-10 md:px-32">
            <div className="video-container pt-10">
              <h1 className="md:text-5xl text-3xl mx-auto mt-6 max-w-[1000px] font-bold text-balance">
                {movieData?.title}
              </h1>
              <div onClick={handleGoBack} className="go-back">
                <button className="font-bold bg-white text-first-blue py-2 px-3 rounded-lg hover:bg-first-blue hover:text-white">Details</button>
              </div>
              <iframe
                src={videoLink}
                title="Video Player"
                allowFullScreen
                className="mx-auto mt-12 overflow-hidden rounded-lg"
                width={iframeDimensions.width}
                height={iframeDimensions.height}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-[50px] gap-20 max-w-6xl mx-auto">
              <div className="mb-4 md:mb-0">
                <h2 className="text-5xl font-bold text-balance">
                  {movieData?.title}
                </h2>
                <p className="mt-2 text-lg">
                  {formatReleaseDate(movieData?.release_date)}
                </p>
                <p className="mt-4 text-lg">{movieData?.overview}</p>
              </div>
              <img
                className="max-h-[600px] rounded-md"
                src={ORIGINAL_IMG_BASE_URL + movieData?.poster_path}
                alt="Poster Img"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No video available. Please select a video to watch.</p>
      )}
      {/* <button onClick={clickRateButton}>Rate this Movie</button> */}
    </div>
  );
};

export default Watching;
