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
      <div></div>
      <div><img src={myQuery.data.}></img></div>
    </div>
  );
  }

 
};
