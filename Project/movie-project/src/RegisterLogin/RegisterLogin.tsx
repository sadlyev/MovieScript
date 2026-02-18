import { useState } from "react"
import ProjectIcon from "../assets/маруся white.svg"
import { Login } from "./Login/Login"
import { Register } from "./Register/Register"

const RegisterLogin = () => {

    const [pageAuth,  setPageAuth] = useState("register")

    function handlePage() {
        return setPageAuth((page) => page === "register" ? "login" : "register")
    }
    return (
        <div>
            <img src={ProjectIcon}></img>
            {pageAuth === "register" ? <Register/> : <Login/>}
            <button onClick={handlePage}>{pageAuth === "register" ? "У меня есть пароль" : "Регистрация"}</button>
        </div>
    )
}

export default RegisterLogin