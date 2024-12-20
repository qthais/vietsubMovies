import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero-slide.css";
import movieApi, { movieType } from "../../api/movieApi";
import { image_API } from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import { FaUser } from "react-icons/fa";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await movieApi.getMoviesList(
          movieType.trending,
        );

        if (response && response.data.content) {
          setMovieItems(response.data.content.slice(0, 8)); // Fetch movies
        } else {
          console.log("No movies found in the response.");
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error.message);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    getMovies();
  }, []);
  if(isLoading){
    return(
      <div className="h-screen text-white relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
    </div>
    )
  }
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        direction="horizontal"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {movieItems.map((movie, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                movie={movie}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Content Component
const HeroSlideItem = (props) => {
  const item = props.movie;
  const navigate = useNavigate();

  const background = image_API.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      className={`hero-slide_item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide_item_content container">
        <div className="hero-slide_item_content_info">
          <h2 className="title text-3xl sm:text-7xl">{item.title}</h2>
          <div className="rate">
            <p className="hero-rating">
              {item.averageRating} ({item.ratingCount})
            </p>
            <p className="divider"> | </p>
            <p className="hero-views"> {item.view} </p>
            <FaUser />
          </div>
          <p className="line-clamp-3 overview sm:text-[18px]">{item.overview}</p>
          <div className="btns">
            <Button onClick={() => navigate(`/watching/${item.id}/full-time`)}>
              Watch Now
            </Button>
            <OutlineButton
              onClick={() => navigate(`/watching/${item.id}/trailer`)}
            >
              Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide_item_content_poster">
          <img src={image_API.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
