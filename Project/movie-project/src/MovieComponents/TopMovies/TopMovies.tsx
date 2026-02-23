import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchTopMovies } from "../../APIRequests/FetchMovie"
import { Link } from "react-router-dom"
import type { MovieType } from "../../Types"
import "./TopMovies.css"
import React from "react"
import NoPhoto from "../../assets/img/im.jpg"
import { Loader } from "../../Loader/Loader"

 const TopMovies = React.memo(() => {


    const myQuery = useQuery({
        queryFn: () => fetchTopMovies(),
        queryKey: ["topMovies"]
    },
queryClient)

    switch(myQuery.status) {
        case "pending" :
            return (<Loader/>)
        case "error" :
            return (<div><span>Что то пошло не так</span><button onClick={() => myQuery.refetch()}>Повторить</button></div>)
        case "success": 
        return (
        <div className="top_movie-container">
            <h3 className="top_movie-title">Топ 10 фильмов</h3>
            <ul className="top_movie-list">
                {myQuery.data.map((movie: MovieType, i: number) => (
                    <li className="top_movie-item" key={i}><Link to={`/movie/${movie.id}`}><span className="top_movie-number">{i + 1}</span><img className="top_movie-img" src={movie.posterUrl ? movie.posterUrl : NoPhoto} alt="top movie" width="224" height="336"></img></Link></li>
                ))}
            </ul>
            
        </div>
    )


    }
})

export default TopMovies