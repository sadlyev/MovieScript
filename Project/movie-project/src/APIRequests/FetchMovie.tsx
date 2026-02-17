
/* fetch рандомного кино */
export const fetchMovies = async () => {
    return await fetch("https://cinemaguide.skillbox.cc/movie/random").then((res) => res.json())

}

/* fetch фильма по id */
export const fetchMovieId = async (id: number) => {
    return await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)
    .then((res) => res.json())
    
}

/* fetch топ 10 фильмов */
export const fetchTopMovies = async() => {
    return await fetch("https://cinemaguide.skillbox.cc/movie/top10").then((res) => {
        if (!res.ok) throw new Error(`что то пошло не так ${res.status}`)
            return res.json()
        
    }).catch((er) => {
        console.log(er.message)
        throw er
    })
}

/* жанры фильмов*/

export const fetchMovieGenres = async() => {
    return await fetch(`https://cinemaguide.skillbox.cc/movie/genres`).then((res) => {
        if (!res.ok)  throw new Error(`что то пошло не так ${res.status}`)
        return res.json()
    }).catch((er) => {
        console.log(er.message)
        throw er
    })
}

export const fetchSpecificGenre = async(pageNumber : number, SpGenre: string) => {
    return await fetch(`https://cinemaguide.skillbox.cc/movie?count=${pageNumber}&genre=${SpGenre}`).then((res) => res.json())
}