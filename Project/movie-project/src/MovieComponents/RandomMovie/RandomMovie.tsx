import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { fetchMovies } from "../../APIRequests/FetchMovie";
import LikeIcon from "../../assets/like.svg"
import "./RandomMovie.css"
import StarIcon from "../../assets/star.svg"
import BlockPhoto from "../../assets/img/im.jpg"
import RefetchBtn from "../../assets/refetch.svg"
import { Link } from "react-router-dom";

export const RandomMovie = () => {
  const myQuery = useQuery(
    {
      queryFn: () => fetchMovies(),
      queryKey: ["randomMovie"],
    },
    queryClient,
  );

  switch (myQuery.status) {
    case "pending":
      return <div>Loading...</div>;
    case "error":
      return (
        <div>
          <span>NetWork Error</span>
          <button onClick={() => myQuery.refetch()}>Повторить</button>
        </div>
      );
    case "success": 
     return (
    <div className="random_movie">
      <div className="random_movie-inner">
        <div className="random_movie-info">
          <div className="random_movie-wrapper" style={{backgroundColor: myQuery.data.tmdbRating >= 8 ? "#A59400" : myQuery.data.tmdbRating >= 7 ? "green" : myQuery.data.tmdbRating >= 6 ? "#777777" : "red"} }>
            <img src={StarIcon} alt="star-icon" width="16" height="16"></img>
             <span className="random_movie-info-text">{myQuery.data.tmdbRating}</span>
          </div>
           
            <span className="random_movie-info-text">{myQuery.data.releaseYear}</span>
            <span className="random_movie-info-text">{myQuery.data.genres[0]}</span>
            <span className="random_movie-info-text">{myQuery.data.runtime} м</span>
        </div>
        <div className="random_movie_main">
            <h2 className="random_movie-title">{myQuery.data.title}</h2>
            <p className="random_movie-desc">{myQuery.data.plot}</p>
        </div>
        <div className="random_movie-btnControl">
          <Link className="random_movie-transfer" to={`/movie/${myQuery.data.id}`}>О Фильме</Link>
          <button className="random_movie-control">
            <img src={LikeIcon} width="20" height="20"></img>
          </button>
          <button className="random_movie-control" onClick={() => myQuery.refetch()}>
            <img src={RefetchBtn} width="20" height="20"></img>
            </button>
        </div>
      </div>
      <div><img  className="random_movie-photo" src={myQuery.data.backdropUrl ? myQuery.data.backdropUrl : BlockPhoto} width="680" height="552" alt="backdrop image of a movie"></img></div>
    </div>
  );
  }

 
};
