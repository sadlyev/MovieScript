

export const registerUser = (email: string, password: string, name: string, surname: string ) => {
    return  fetch(`https://cinemaguide.skillbox.cc/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({email, password, name, surname})
    })
}