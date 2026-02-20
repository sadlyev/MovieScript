export const registerUser = async (
  email: string,
  password: string,
  name: string,
  surname: string,
) => {
  return await fetch(`https://cinemaguide.skillbox.cc/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, surname }),
    credentials: "include"
  });
};

// логин 
export const loginUser = async (email: string, password: string) => {
  const response = await fetch("https://cinemaguide.skillbox.cc/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(`loginFailed ${(response.status, data.message)}`);
  return data;
};



export const fetchUserData = async () => {
    const res =  await fetch("https://cinemaguide.skillbox.cc/profile", {
        credentials: "include"
    })

    if (!res.ok) throw new Error("Пользователя нет")
    return await res.json()
}

export const fetchUserLogout = async() => {
  const res = await fetch("https://cinemaguide.skillbox.cc/auth/logout", {
    credentials: "include"
  })

  if (!res.ok) throw new Error("что то пошло не так ")
    return res.json()
}
