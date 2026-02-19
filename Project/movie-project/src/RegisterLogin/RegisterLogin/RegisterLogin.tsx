import { lazy, useState } from "react"
import ProjectIcon from "../../assets/logoBlack.svg"
const LazyLogin = lazy(() => import("../Login/Login"))
const LazyRegister = lazy(() => import("../Register/Register")) 
import "./RegisterLogin.css"
import CloseIcon from "../../assets/close.svg"

const RegisterLogin = ({toggleClass, fnToggle} : {toggleClass: string, fnToggle: () => void}) => {

    const [pageAuth,  setPageAuth] = useState("login")

    function handlePage() {
        return setPageAuth((page) => page === "login" ? "register" : "login")
    }
    
    return (
        <div className={`${toggleClass} registerlogin_wrapper`}>
            <button onClick={() => fnToggle()} className="registerlogin_close-btn"><img src={CloseIcon} width="20" height="20"></img></button>
            <img className="registerlogin_icon" src={ProjectIcon} width={pageAuth === "login" ? "156" : "136"} height="35"></img>
            {pageAuth === "login" ? <LazyLogin/> : <LazyRegister/>  }
            <span className="registerlogin_btn" onClick={handlePage}>{pageAuth === "login" ? "Регистрация" : "У меня есть пароль"}</span>
        </div>
    )
}

export default RegisterLogin