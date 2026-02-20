import { lazy, useState } from "react"
import ProjectIcon from "../../assets/logoBlack.svg"
const LazyLogin = lazy(() => import("../Login/Login"))
const LazyRegister = lazy(() => import("../Register/Register")) 
import "./RegisterLogin.css"
import CloseIcon from "../../assets/close.svg"
import React from "react"

const RegisterLogin = React.memo(({toggleClass, fnToggle} : {toggleClass: string, fnToggle: () => void}) => {
    const [pageAuth, setPageAuth] = useState("login")
    const [isRegistered, setIsRegistered] = useState(false) 

    function handlePage() {
        if (pageAuth === "register" || isRegistered) {
            setPageAuth("login")
            setIsRegistered(false)
        } else {
            setPageAuth("register")
        }
    }
    
    return (
        <div className={`${toggleClass} registerlogin_wrapper`}>
            <button onClick={fnToggle} className="registerlogin_close-btn">
                <img src={CloseIcon} width="20" height="20" alt="close" />
            </button>
            <img className="registerlogin_icon" src={ProjectIcon} 
                 width={pageAuth === "login" ? "156" : "136"} height="35" alt="logo" />

            {pageAuth === "login" ? 
                <LazyLogin fnToggle={fnToggle} /> : 
                <LazyRegister toggleText={setIsRegistered}/> 
            }

            <span className="registerlogin_btn" onClick={handlePage}>
                {(pageAuth === "register" || isRegistered) ? "Войти" : "Регистрация"}
            </span>
        </div>
    )
})

export default RegisterLogin
