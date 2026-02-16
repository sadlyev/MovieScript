import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { fetchMovies } from "../../APIRequests/FetchMovie";

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
    <div>
      <div>
        <div>
            <span>{myQuery.data.tmdbRating}</span>
            <span>{myQuery.data.releaseYear}</span>
            <span>{myQuery.data.runtime} м</span>
        </div>
        <div>
            <h2>{myQuery.data.title}</h2>
            <p>{myQuery.data.plot}</p>
        </div>
      </div>
      <div><img src={myQuery.data.backdropUrl} width="680" height="552" alt="backdrop image of a movie"></img></div>
    </div>
  );
  }

 
};
