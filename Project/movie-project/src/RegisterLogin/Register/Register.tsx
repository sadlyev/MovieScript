import "./Register.css"
import EmailIcon from "../../assets/email.svg"
import PasswordIcon from "../../assets/password.svg"
import Usericon from "../../assets/user.svg"
import { useState } from "react"

export const Register = () => {

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userSurname,  setUserSurname] = useState("")
    const [userPassword,  setUserPassword] = useState("")
    const [userSamePassword, setUserSamePassword] = useState("")

    return (

            <form className="register_form">
                <h3 className="register_form-title">Регистрация</h3>
                <div className="register_form-wrapper">
                    <label className="register_form-label">
                    <img className="register_form-icon" src={EmailIcon} height="24" width="24"></img>
                    <input className="register_form-input" name="почта" placeholder="Электронная почта" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={EmailIcon} height="24" width="24"></img>
                    <input className="register_form-input" name="имя" placeholder="Имя"  value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={Usericon} height="24" width="24"></img>
                    <input className="register_form-input" name="фамилия" placeholder="Фамилия"  value={userSurname} onChange={(e) => setUserSurname(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={PasswordIcon} height="24" width="24"></img>
                    <input className="register_form-input" name="пароль" placeholder="Пароль"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={PasswordIcon} height="24" width="24"></img>
                    <input className="register_form-input" name="пароль" placeholder="Подтвердите пароль"  value={userSamePassword} onChange={(e) => setUserSamePassword(e.target.value)}></input>
                </label>
                </div>
                <button className="register_form-btn">Создать Аккаунт</button>  
            </form>
    )
}