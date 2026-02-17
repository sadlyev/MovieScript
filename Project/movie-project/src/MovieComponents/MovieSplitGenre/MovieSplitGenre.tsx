import { useQuery } from "@tanstack/react-query"
import { fetchSpecificGenre } from "../../APIRequests/FetchMovie"
import { useParams } from "react-router-dom"
import { queryClient } from "../../queryClient"

const MovieSplitGenre = () => {
    const {searchGenre} = useParams()
    const myQuery = useQuery({
        queryFn: () => fetchSpecificGenre(15, searchGenre || ""),
        queryKey: ["searchGenre"]
    },
queryClient)



    switch(myQuery.status) {
        case "success" :
            return (
                <ul>
                    {myQuery.data.map((genre: any, i: number) => (
                        <li key={i}>{genre.title}</li>
                    ))}
                </ul>
            )
    }
}

export default MovieSplitGenre