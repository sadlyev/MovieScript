import { useQuery } from "@tanstack/react-query";
import { fetchSpecificGenre } from "../../APIRequests/FetchMovie";
import { useParams } from "react-router-dom";
import { queryClient } from "../../queryClient";
import AppHeader from "../../HeaderComponents/AppHeader/AppHeader";
import { Footer } from "../../Footer/Footer";
import "./MovieSplitGenre.css"
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/arrow.svg"

const MovieSplitGenre = () => {
  const { searchGenre } = useParams();
  const myQuery = useQuery(
    {
      queryFn: () => fetchSpecificGenre(15, searchGenre || ""),
      queryKey: ["searchGenre"],
    },
    queryClient,
  );

  switch (myQuery.status) {
    case "pending":
      return <span>Loading...</span>;
    case "error":
      return (
        <div>
          <span>Что то пошло не так</span>
          <button onClick={() => myQuery.refetch()}>Повторить</button>
        </div>
      );
    case "success":
      return (
        <div >
            <AppHeader/>
            <div className="genre_movie">
            <Link className="genre_movie-wrapper" to="/movie/genre">
                <img className="genre_movie-title-icon" src={ArrowIcon} width="40" height="40"></img>
                <h2 className="genre_movie-title">{searchGenre ? searchGenre[0].toUpperCase() + searchGenre.slice(1).toLowerCase() : ""}</h2>
            </Link>
           
            <ul className="genre_movie-list">
                {myQuery.data.map((genre: any, i: number) => (
                <li key={i}><Link to={`/movie/${genre.id}`}><img src={genre.backdropUrl} width="224" height="336"></img></Link></li>
                ))}
            </ul>
            <button className="genre_movie-btn">Показать еще</button>

            </div>
           
          <Footer/>
        </div>
        
      );
  }
};

export default MovieSplitGenre;
