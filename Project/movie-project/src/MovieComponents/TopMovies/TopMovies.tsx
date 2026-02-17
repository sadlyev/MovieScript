import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchTopMovies } from "../../APIRequests/FetchMovie"
import { Link } from "react-router-dom"
import type { MovieType } from "../../Types"
import "./TopMovies.css"

export const TopMovies = () => {


    const myQuery = useQuery({
        queryFn: () => fetchTopMovies(),
        queryKey: ["topMovies"]
    },
queryClient)

    switch(myQuery.status) {
        case "pending" :
            return (<span>Loading...</span>)
        case "error" :
            return (<div><span>Что то пошло не так</span><button onClick={() => myQuery.refetch()}>Повторить</button></div>)
        case "success": 
        return (
        <div>
            <ul className="top_movie">
                {myQuery.data.map((movie: MovieType, i: number) => (
                    <li key={i}><Link to={`/movie/${movie.id}`}><img src={movie.posterUrl} alt="top movie" width="224" height="336"></img></Link></li>
                ))}
            </ul>
            
        </div>
    )


    }
}