import { useState } from "react"
import EmailIcon from "../../assets/email.svg"
import PasswordIcon from "../../assets/password.svg"
import "./Login.css"

export const Login = () => {


    const [emailValue,  setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [errorValue,  setErrorValue] = useState({email: true, password: true})


    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const errorValue = {email: true, password: true }

        if (!emailValue) {
            errorValue.email = false
        }

        if (!passwordValue) {
            errorValue.password = false
        }

        setErrorValue(errorValue)

        if (!errorValue.email || !errorValue.password) {
            return
        } else {
            console.log("login values are correct")
        } 
    }
    return (
        <form  onSubmit={handleSubmit} className="login_form">
            <div className="login_form-wrapper">
                <label className="login_form-label">
                    <img className="login_form-icon" src={EmailIcon} width="24" height="24"></img>
                <input  name="email" placeholder="Электронная почта" style={!errorValue.email ?{ border: "2px solid red"} : undefined} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} ></input>
            </label>
            <label className="login_form-label">
                <img className="login_form-icon" src={PasswordIcon} width="24" height="24"></img>
                <input name="password" className="login_email-input" placeholder="Пароль" style={!errorValue.password ?{ border: "2px solid red"} : undefined} value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} ></input>
            </label>
            </div>
            <button>Войти</button>
        </form>
    )
}