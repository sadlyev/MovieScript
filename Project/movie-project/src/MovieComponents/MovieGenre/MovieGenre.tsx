import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres } from "../../APIRequests/FetchMovie";
import { queryClient } from "../../queryClient";
import { Link } from "react-router-dom";
import "./MovieGenre.css";
import AppHeader from "../../HeaderComponents/AppHeader/AppHeader";
import img1 from "../../assets/img/genre1.png";
import img2 from "../../assets/img/genre2.png";
import img3 from "../../assets/img/genre3.png";
import img4 from "../../assets/img/genre4.png";
import img5 from "../../assets/img/genre5.png";
import img6 from "../../assets/img/genre6.png";
import img7 from "../../assets/img/genre7.png";
import img8 from "../../assets/img/genre8.png";
import { Footer } from "../../Footer/Footer";

const srcArray: any = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img1,
  img2,
  img3,
  img4,
  img5,
];

const MovieGenre = () => {
  const myQuery = useQuery(
    {
      queryFn: () => fetchMovieGenres(),
      queryKey: ["genres"],
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
        <div>
          <AppHeader></AppHeader>
          <h2 className="movie_genre-title">Жанры Фильмов</h2>
          <ul className="movie_genre-list">
            {myQuery.data.map((genre: string, i: number) => (
              <li className="movie_genre-item" key={i}><Link className="movie_genre-inner" to={`/movie/genre/${genre}`}>
                <img src={srcArray[i + 1]} width="290" height="220"></img>
                <span className="movie_genre-name">{genre[0].toUpperCase() + genre.slice(1).toLowerCase()}</span>
              </Link></li>
            ))}
          </ul>
          <Footer/>
        </div>
      );
  }
};

export default MovieGenre;
