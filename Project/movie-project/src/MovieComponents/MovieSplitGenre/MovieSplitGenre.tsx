import { useInfiniteQuery} from "@tanstack/react-query";
import { fetchSpecificGenre } from "../../APIRequests/FetchMovie";
import { useParams } from "react-router-dom";
import { queryClient } from "../../queryClient";
import AppHeader from "../../MainPage1/AppHeader/AppHeader";
import { Footer } from "../../MainPage1/Footer/Footer";
import "./MovieSplitGenre.css"
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/arrow.svg"
import NoPhoto from "../../assets/img/im.jpg"

const MovieSplitGenre = () => {

  const { searchGenre } = useParams();

  const myQuery = useInfiniteQuery({
    queryFn: ({pageParam}) => fetchSpecificGenre(pageParam, searchGenre || ""),
    queryKey: ["searchGenre", searchGenre],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.length === 15 ? allPages.length + 1 : undefined,
  },
  queryClient
  );

  switch (myQuery.status) {
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
                {myQuery.data.pages.flatMap(page => page).map((genre: any, i: number) => (
                <li key={i}><Link to={`/movie/${genre.id}`}><img src={genre.backdropUrl ? genre.backdropUrl : NoPhoto} width="224" height="336"></img></Link></li>
                ))} 
            </ul>
            {myQuery.hasNextPage ? <button onClick={() =>myQuery.fetchNextPage()} className="genre_movie-btn">Показать еще</button> : null}
            </div> 
          <Footer/>
        </div>
      );
  }
};

export default MovieSplitGenre;
