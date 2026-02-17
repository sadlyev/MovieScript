import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../queryClient";
import { fetchMovieId } from "../../APIRequests/FetchMovie";
import { RandomMovie } from "../RandomMovie/RandomMovie";
import AppHeader from "../../HeaderComponents/AppHeader/AppHeader";

const MovieProfile = () => {
  const { movieId } = useParams();

  const myQuery = useQuery(
    {
      queryFn: () => fetchMovieId(Number(movieId)),
      queryKey: ["movieId"],
    },
    queryClient,
  );

  switch (myQuery.status) {
    case "pending":
      return <div>Загрузка...</div>;
    case "error":
      console.log("big error");
      return (
        <div>
          <span>Произошла Ошибка</span>
          <button onClick={() => myQuery.refetch()}>Повторить</button>
        </div>
      );
    case "success":
      return (
        <div>
            <AppHeader></AppHeader>
          <RandomMovie movie={myQuery.data} refetch={myQuery.refetch} />
          <div></div>
        </div>
      );
  }
};

export default MovieProfile;
