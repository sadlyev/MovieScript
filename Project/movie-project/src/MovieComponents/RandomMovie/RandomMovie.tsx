import  { useState, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import YouTube, { type YouTubeProps } from 'react-youtube';

import { queryClient } from "../../queryClient";
import { fetchFavorite, fetchRemoveFavorite } from "../../APIRequests/FetchMovie";
import { fetchUserData } from "../../APIRequests/FetchUser";

import LikeIcon from "../../assets/like.svg";
import LikedIcon from "../../assets/LikedIcon.svg";
import StarIcon from "../../assets/star.svg";
import BlockPhoto from "../../assets/img/im.jpg";
import RefetchIcon from "../../assets/refetch.svg";
import "./RandomMovie.css";

const LazyRegisterLogin = lazy(() => import("../../UserComponents/RegisterLogin/RegisterLogin"));

export const RandomMovie = ({ movie, refetch }: { movie: any, refetch: () => void }) => {
  const location = useLocation();
  const isMoviePage = location.pathname.includes("/movie");

  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const toggleModal = () => setIsOpen(prev => !prev);

  const checkUser = useQuery({
    queryFn: () => fetchUserData(),
    queryKey: ["user"],
    retry: false
  }, queryClient);

  const myMutation = useMutation({
    mutationFn: () => fetchFavorite(String(movie.id)),
    onSuccess: () => setLiked(true)
  }, queryClient);

  const myMutationDelete = useMutation({
    mutationFn: () => fetchRemoveFavorite(Number(movie.id)),
    onSuccess: () => {
      setLiked(false);
      queryClient.invalidateQueries({ queryKey: ["favoriteMovie", movie.id] });
    }
  }, queryClient);

  const handleLiking = () => {
    if (checkUser.isError) {
      setIsOpen(true);
      return;
    }
    liked ? myMutationDelete.mutate() : myMutation.mutate();
  };

  const videoOptions: YouTubeProps['opts'] = {
    height: '500',
    width: '100%',
    playerVars: { autoplay: 1, modestbranding: 1, rel: 0 },
  };

  return (
    <div className="random_movie">
      {showTrailer && (
        <div className="trailer_modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer_container" onClick={(e) => e.stopPropagation()}>
            <button className="close_trailer" onClick={() => setShowTrailer(false)}>✕</button>
            <YouTube videoId={movie.trailerYouTubeId} opts={videoOptions} />
          </div>
        </div>
      )}

      <div className="random_movie-inner">
        <div className="random_movie-info">
          <div className="random_movie-wrapper" style={{ 
            backgroundColor: movie.tmdbRating >= 8 ? "#A59400" : 
                             movie.tmdbRating >= 7 ? "green" : 
                             movie.tmdbRating >= 6 ? "#777777" : "red" 
          }}>
            <img src={StarIcon} alt="star" width="16" height="16" />
            <span className="random_movie-info-text">{movie.tmdbRating}</span>
          </div>
          
          <span className="random_movie-info-text">{movie.releaseYear}</span>
          <span className="random_movie-info-text">{movie.genres[0]}</span>
          <span className="random_movie-info-text">{movie.runtime} мин</span>
        </div>

        <div className="random_movie_main">
          <h2 className="random_movie-title">{movie.title}</h2>
          <p className="random_movie-desc">{movie.plot}</p>
        </div>

        <div className="random_movie-btnControl">
          <button onClick={() => setShowTrailer(true)} className="random_movie-transfer random_movie-transfer--blue">
            Трейлер
          </button>
          <div className="random_movie-btnControl-inner">
            {!isMoviePage && (
              <Link to={`/movie/${movie.id}`}>
                <button className="random_movie-transfer">О Фильме</button>
              </Link>
            )}
            <div className="random_movie-btnControl-inner">
             <button onClick={handleLiking} className="random_movie-control">
              <img className="random_movie-control-img" src={liked ? LikedIcon : LikeIcon} width="20" height="20" alt="like" />
            </button>

            {!isMoviePage && (
              <button className="random_movie-control" onClick={refetch}>
                <img src={RefetchIcon} className="random_movie-control-img" width="20" height="20" alt="refresh" />
              </button>
            )}
            
           </div> 
          </div>
        </div>
      </div>

      <div className="random_movie-photo-container">
        <img 
          className="random_movie-photo" 
          src={movie.backdropUrl || BlockPhoto} 
          style={{ width: "100%", height: "auto" }} 
          alt={movie.title} 
        />
      </div>

      <LazyRegisterLogin toggleClass={isOpen ? "" : "registerlogin_wrapper-no"} fnToggle={toggleModal} />
    </div>
  );
};