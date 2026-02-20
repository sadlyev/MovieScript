/* fetch рандомного кино */
export const fetchMovies = async () => {
  return await fetch("https://cinemaguide.skillbox.cc/movie/random").then(
    (res) => res.json(),
  );
};

/* fetch фильма по id */
export const fetchMovieId = async (id: number) => {
  return await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`).then(
    (res) => res.json(),
  );
};

/* fetch топ 10 фильмов */
export const fetchTopMovies = async () => {
  return await fetch("https://cinemaguide.skillbox.cc/movie/top10")
    .then((res) => {
      if (!res.ok) throw new Error(`что то пошло не так ${res.status}`);
      return res.json();
    })
    .catch((er) => {
      console.log(er.message);
      throw er;
    });
};

/* жанры фильмов*/

export const fetchMovieGenres = async () => {
  return await fetch(`https://cinemaguide.skillbox.cc/movie/genres`)
    .then((res) => {
      if (!res.ok) throw new Error(`что то пошло не так ${res.status}`);
      return res.json();
    })
    .catch((er) => {
      throw er;
    });
};

// по жанрам
export const fetchSpecificGenre = async (
  pageNumber: number,
  SpGenre: string,
) => {
  return await fetch(
    `https://cinemaguide.skillbox.cc/movie?count=15&page=${pageNumber}&genre=${SpGenre}`,
  ).then((res) => res.json());
};

// favorite

export const fetchFavoriteMovies = async () => {
  const response =  await fetch("https://cinemaguide.skillbox.cc/favorites", {credentials: "include"})

  if (!response.ok) throw new Error("Что то пошло не так")
    return response.json()
};


// adding favorite

export const fetchFavorite = async (id: string) => {
    const response = await fetch("https://cinemaguide.skillbox.cc/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id}),
        credentials: "include"
    })

    const data = await response.json();
  if (!response.ok)
    throw new Error(`loginFailed ${(response.status, data.message)}`);
  return data;
}

// removing favorite

export const fetchRemoveFavorite = async(id: number) => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id}),
    credentials:"include"

  })

  if (!res.ok) throw new Error("removing movie failed")
    return res.json()
}