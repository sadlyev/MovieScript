export const fetchMovies = async () => {
    return await fetch("https://cinemaguide.skillbox.cc/movie/random").then((res) => res.json())

}

export const fetchMovieId = async (id: number) => {
    return await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`).then((res) => res.json())
}