export const fetchMovies = async () => {
    return await fetch("https://cinemaguide.skillbox.cc/movie/random").then((res) => res.json())

}