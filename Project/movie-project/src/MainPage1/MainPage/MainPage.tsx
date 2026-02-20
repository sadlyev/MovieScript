import { fetchMovies } from "../../APIRequests/FetchMovie";
import AppHeader from "../AppHeader/AppHeader";
import { RandomMovie } from "../../MovieComponents/RandomMovie/RandomMovie";
import { queryClient } from "../../queryClient";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "../Footer/Footer";
import "./Mainpage.css"
import { lazy } from "react";
const LazyTopMovies = lazy(() => import("../../MovieComponents/TopMovies/TopMovies"))

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
        <div className="main_page">
          <AppHeader />
          <RandomMovie movie={myQuery.data} refetch={myQuery.refetch} />
          <LazyTopMovies/>
          <Footer/>
        </div>
      );
  }
};
