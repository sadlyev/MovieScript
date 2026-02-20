import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../queryClient";
import { fetchMovieId } from "../../APIRequests/FetchMovie";
import { RandomMovie } from "../RandomMovie/RandomMovie";
import AppHeader from "../../MainPage1/AppHeader/AppHeader";
import "./MovieProfile.css"
import { Footer } from "../../MainPage1/Footer/Footer";

const MovieProfile = () => {
  const { movieId } = useParams();

  const myQuery = useQuery(
    {
      queryFn: () => fetchMovieId(Number(movieId)),
      queryKey: ["movieId", movieId],
    },
    queryClient,
  );

  switch (myQuery.status) {
    case "pending":
      return <div>Загрузка...</div>;
    case "error":
      return (
        <div>
          <span>Произошла Ошибка</span>
          <button onClick={() => myQuery.refetch()}>Повторить</button>
        </div>
      );
    case "success":
      return (
        <div className="movie_profile">
            <AppHeader></AppHeader>
          <RandomMovie movie={myQuery.data} refetch={myQuery.refetch} />
          <div className="movie_profile-info">
            <h2 className="movie_profile-title">О Фильме</h2>
            <ul className="movie_profile-list">
              <li><span>Язык Оригинала</span>  ...................   <span>{myQuery.data.language ? myQuery.data.language : "Неизвестно"}</span></li>
              <li><span>Бюджет</span>  .....................................   <span>{myQuery.data.budget ? myQuery.data.budget : "Неизвестно"}</span></li>
              <li><span>Выручка</span>  ....................................   <span>{myQuery.data.revenue ? myQuery.data.revenue : "Неизвестно"}</span></li>
              <li><span>Режиссёр</span>  ..................................   <span>{myQuery.data.director ? myQuery.data.director : "Неизвестно"}</span></li>
              <li><span>Продакшен</span>  ..............................   <span>{myQuery.data.production ? myQuery.data.production : "Неизвестно"}</span></li>
               <li><span>Награды</span>  .....................................   <span>{myQuery.data.awardsSummary ? myQuery.data.awardsSummary : "Неизвестно"}</span></li>
            </ul>
          </div>
          <Footer/>
        </div>
      );
  }
};

export default MovieProfile;
