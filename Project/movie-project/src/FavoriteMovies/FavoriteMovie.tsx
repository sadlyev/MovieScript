import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { Link } from "react-router-dom";
import type { MovieType } from "../Types";
import "./FavoriteMovie.css";
import CloseIcon from "../assets/close.svg";
import { fetchRemoveFavorite } from "../APIRequests/FetchMovie";
import React, { useState } from "react";
import { fetchFavoriteMovies } from "../APIRequests/FetchMovie";

const FavoriteMovie = React.memo(() => {

  const myQuery = useQuery(
    {
      queryFn: () => fetchFavoriteMovies(),
      queryKey: ["favoriteMovies"],
    },
    queryClient,
  );

  const myMutation = useMutation({
    mutationFn: (id: number) => fetchRemoveFavorite(Number(id)),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["favoriteMovies"]})
    }
  },queryClient)

  function handleDelete(id: number) {

    myMutation.mutate(id)
  }

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
        <ul className="favorite_list">
          {myQuery.data.map((movie: MovieType, i: number) => (
            <li className="favorite_list-item" key={i}>
              <button onClick={() => handleDelete(movie.id)} className="favorite_list-delete">
                <img src={CloseIcon} width="24" height="24"></img>
              </button>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="favorite_list-img"
                  src={movie.posterUrl}
                  alt="top movie"
                  width="224"
                  height="336"
                ></img>
              </Link>
            </li>
          ))}
        </ul>
      );
  }
});

export default FavoriteMovie;
