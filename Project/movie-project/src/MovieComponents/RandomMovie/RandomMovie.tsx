import LikeIcon from "../../assets/like.svg"
import LikedIcon from "../../assets/Vector.svg"
import "./RandomMovie.css"
import StarIcon from "../../assets/star.svg"
import BlockPhoto from "../../assets/img/im.jpg"
import RefetchIcon from "../../assets/refetch.svg"
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchFavorite } from "../../APIRequests/FetchMovie"
import { useState } from "react"
import { fetchRemoveFavorite } from "../../APIRequests/FetchMovie"
import { lazy } from "react"
const LazyRegisterLogin = lazy(() => import("../../UserComponents/RegisterLogin/RegisterLogin"))
import YouTube, { type YouTubeProps } from 'react-youtube';
import { fetchUserData } from "../../APIRequests/FetchUser"

export const RandomMovie = ({movie, refetch}: {movie: any, refetch: () => void}) => {

  // нужен для отображения кнопки о фильме и кнопки рандомного фильма
  const location = useLocation()

  const [liked, setLiked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false);


  const toggleModal = () => setIsOpen(prev => !prev)

  // для добавления в фейвритс
    const myMutation = useMutation({
      mutationFn: () => fetchFavorite(String(movie.id)),
      mutationKey: ["favoriteMovie", movie.id]
    },queryClient)

  // для удаления из фейвритс
    const myMutationDelete = useMutation({
        mutationFn: () => fetchRemoveFavorite(Number(movie.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favoriteMovie", movie.id]})
        }
      },queryClient)

  // для проверки если пользователь зареган

    const checkUser = useQuery({
      queryFn: () => fetchUserData(),
      queryKey: ["user"]

    }, queryClient)   

    function handleLiking() {
      if(checkUser.isError) {
        setIsOpen(prev => true)
        return
      }  
      if(!liked) {
        setLiked(true)
        myMutation.mutate()
      } 
      if(liked) {
        setLiked(false)
        myMutationDelete.mutate()
      }
    }  

  const videoOptions: YouTubeProps['opts'] = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1, 
      modestbranding: 1,
      rel: 0, 
    },
  }

     return (
    <div className="random_movie">
      {showTrailer && (
        <div className="trailer_modal" onClick={() => setShowTrailer(false)}>
           <div className="trailer_container" onClick={(e) => e.stopPropagation()}>
              <button className="close_trailer" onClick={() => setShowTrailer(false)}>✕</button>
              <YouTube 
                videoId={movie.trailerYouTubeId} // Use your ID here (e.g., movie.youtubeId or movie.trailerUrl)
                opts={videoOptions} 
              />
           </div>
        </div>
      )}
      <div className="random_movie-inner">
        <div className="random_movie-info">
          <div className="random_movie-wrapper" style={{backgroundColor: movie.tmdbRating >= 8 ? "#A59400" : movie.tmdbRating >= 7 ? "green" : movie.tmdbRating >= 6 ? "#777777" : "red"} }>
             <img src={StarIcon} alt="star-icon" width="16" height="16"></img>
             <span className="random_movie-info-text">{movie.tmdbRating}</span>
          </div>
            <span className="random_movie-info-text">{movie.genres.join(", ")}</span>
            <span className="random_movie-info-text">{movie.releaseYear}</span>
            
            <span className="random_movie-info-text">{movie.runtime} мин</span>
        </div>
        <div className="random_movie_main">
            <h2 className="random_movie-title">{movie.title}</h2>
            <p className="random_movie-desc">{movie.plot}</p>
        </div>
        <div className="random_movie-btnControl">
              <button onClick={() =>setShowTrailer(prev => true)} className="random_movie-transfer random_movie-transfer--blue">Трейлер</button>
              {!location.pathname.includes("/movie") ?  <Link  to={`/movie/${movie.id}`}><button className="random_movie-transfer">О Фильме</button></Link> : undefined }
              <button onClick={handleLiking} className="random_movie-control">
                <img src={liked ? LikedIcon : LikeIcon}  width="20" height="20"></img>
              </button>
               {!location.pathname.includes("/movie") ?  <button className="random_movie-control" onClick={() => refetch()}>
                <img src={RefetchIcon} width="20" height="20"></img>
              </button> : undefined }
              
        </div>
      </div>
      <div><img  className="random_movie-photo" src={movie.backdropUrl ? movie.backdropUrl : BlockPhoto} width="680" height="552" alt="backdrop image of a movie"></img></div>
    <LazyRegisterLogin toggleClass={isOpen ? "" : "registerlogin_wrapper-no" } fnToggle={toggleModal}/>
    </div>
  );
  }

 

