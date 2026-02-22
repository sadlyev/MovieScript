import SearchedIcon from "../../assets/WhiteSearch.svg"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { fetchMovieTitle } from "../../APIRequests/FetchMovie";
import StarIcon from "../../assets/star.svg";
import SearchIcon from "../../assets/search.svg";
import type { MovieType } from "../../Types";
import "./SearchedMovieList.css";
import { Link, useLocation } from "react-router-dom";



const SearchedMovie = ({className} : {className: string}) => {

  const [searchValue, setSearchValue] = useState("");
  const [isToggled, setIsToggled] = useState(false)

  const debouncedValue = useDebounce(searchValue, 400);

  const { data, isError, refetch } = useQuery({

    queryKey: ["searchMovie", debouncedValue],
    queryFn: () => fetchMovieTitle(debouncedValue.toLowerCase()),
    enabled: !!debouncedValue,
  }, queryClient);

  const location = useLocation();

  React.useEffect(() => {
    setSearchValue(""); 
  }, [location.pathname]);

  

  function handleSearchToggle(){
      setIsToggled(prev => !prev ? true : false)
  }

  function handleClearValue() {
    setSearchValue("")
    handleSearchToggle()
  }

  return (
    <div className="search_container" >
        {!isToggled ? <img onClick={handleSearchToggle} src={SearchedIcon} className="header_label-searchIcon  header_link--icon" width="24" height="24"></img> : null}
        <label className={`${className} ${isToggled ? "header-label--active" : ""}`} >
          <span className="header_label-clear" onClick={handleClearValue}>✖</span>
          <img src={SearchIcon}  className="header_label-logo"   width={20}    height={20} alt="search icon" />
          <input className="header_label-input" placeholder="Поиск" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          {debouncedValue && (
          <div className="search">
            {isError && (<div> Ошибка поиска <button onClick={() => refetch()}>Повторить</button> </div> )}
            {data && data.length === 0 && ( <div style={{ color: "#bcbdbd" }}>Ничего не найдено</div> )}
            {data &&
                data.map((movie: MovieType, i: number) => (
                  <Link  to={`/movie/${movie.id}`} className="search_movie" key={i}>
                    <img className="search_movie-img" src={movie.posterUrl} width={40} height={52} alt={movie.title} loading="lazy" />
                    <div className="search_movie-data">
                      <div className="search_movie-info">
                        
                        
                        <div  className="search_movie-info-wrapper" style={{  backgroundColor:  movie.tmdbRating >= 8  ? "#A59400" : movie.tmdbRating >= 7 ? "green" : movie.tmdbRating >= 6 ? "#777777": "red"}} >
                          <img src={StarIcon} width={16} height={16} alt="star" />
                          <span className="search_movie-info-sts">{Math.round(movie.tmdbRating * 10) / 10}</span>
                        </div>
                        <span className="search_movie-info-sts">{movie.releaseYear}</span>
                        <span className="search_movie-info-sts">{movie.genres?.join(", ")} </span>
                        <span className="search_movie-info-sts">{movie.runtime} мин</span>
                      </div>
                      <p>{movie.title}</p>
                    </div>
                  </Link> ))}
            </div> )}
    </label>
    </div>

  );
};

export default React.memo(SearchedMovie);


function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}