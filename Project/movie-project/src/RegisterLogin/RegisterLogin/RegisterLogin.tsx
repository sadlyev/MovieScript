import { useState } from "react"
import ProjectIcon from "../../assets/logoBlack.svg"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import "./RegisterLogin.css"

const RegisterLogin = ({toggleClass} : {toggleClass: string}) => {

    const [pageAuth,  setPageAuth] = useState("register")

    function handlePage() {
        return setPageAuth((page) => page === "register" ? "login" : "register")
    }
    return (
        <div className={`${toggleClass} registerlogin_wrapper`}>
            <img className="registerlogin_icon" src={ProjectIcon} width="132" height="30"></img>
            {pageAuth === "register" ? <Register/> : <Login/>}
            <button onClick={handlePage}>{pageAuth === "register" ? "У меня есть пароль" : "Регистрация"}</button>
        </div>
    )
}

export default RegisterLogin