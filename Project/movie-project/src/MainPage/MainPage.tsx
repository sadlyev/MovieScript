import { fetchMovies } from "../APIRequests/FetchMovie";
import AppHeader from "../HeaderComponents/AppHeader/AppHeader";
import { Route, Router, BrowserRouter, Routes } from "react-router-dom";
import { RandomMovie } from "../MovieComponents/RandomMovie/RandomMovie";
import { queryClient } from "../queryClient";
import { useQuery } from "@tanstack/react-query";

export const MainPage = () => {
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
          <AppHeader />
          <RandomMovie movie={myQuery.data} refetch={myQuery.refetch} />
        </div>
      );
  }
};
