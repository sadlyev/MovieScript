import LikeIcon from "../../assets/like.svg"
import "./RandomMovie.css"
import StarIcon from "../../assets/star.svg"
import BlockPhoto from "../../assets/img/im.jpg"
import RefetchIcon from "../../assets/refetch.svg"
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchFavorite } from "../../APIRequests/FetchMovie"



export const RandomMovie = ({movie, refetch}: {movie: any, refetch: () => void}) => {

  const location = useLocation()

    const myMutation = useMutation({
      mutationFn: () => fetchFavorite(String(movie.id)),
      mutationKey: ["favoriteMovie", movie.id]
    },
  queryClient)

    function handleLiking() {
      myMutation.mutate()
    }
  

     return (
    <div className="random_movie">
      <div className="random_movie-inner">
        <div className="random_movie-info">
          <div className="random_movie-wrapper" style={{backgroundColor: movie.tmdbRating >= 8 ? "#A59400" : movie.tmdbRating >= 7 ? "green" : movie.tmdbRating >= 6 ? "#777777" : "red"} }>
             <img src={StarIcon} alt="star-icon" width="16" height="16"></img>
             <span className="random_movie-info-text">{movie.tmdbRating}</span>
          </div>
            <span className="random_movie-info-text">{movie.genres[0]}</span>
            <span className="random_movie-info-text">{movie.releaseYear}</span>
            
            <span className="random_movie-info-text">{movie.runtime} мин</span>
        </div>
        <div className="random_movie_main">
            <h2 className="random_movie-title">{movie.title}</h2>
            <p className="random_movie-desc">{movie.plot}</p>
        </div>
        <div className="random_movie-btnControl">
              <button className="random_movie-transfer random_movie-transfer--blue">Трейлер</button>
              {!location.pathname.includes("/movie") ? <Link  to={`/movie/${movie.id}`}><button className="random_movie-transfer">О Фильме</button></Link> : null }
              <button onClick={handleLiking} className="random_movie-control">
                <img src={LikeIcon} width="20" height="20"></img>
              </button>
              {!location.pathname.includes("/movie") ? <button className="random_movie-control" onClick={() => refetch()}>
                <img src={RefetchIcon} width="20" height="20"></img>
                </button> : null}
        </div>
      </div>
      <div><img  className="random_movie-photo" src={movie.backdropUrl ? movie.backdropUrl : BlockPhoto} width="680" height="552" alt="backdrop image of a movie"></img></div>
    </div>
  );
  }

 

