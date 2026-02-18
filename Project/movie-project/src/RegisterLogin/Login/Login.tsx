import { useState } from "react"
import EmailIcon from "../../assets/email.svg"
import PasswordIcon from "../../assets/password.svg"
import "./Login.css"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../APIRequests/FetchUser"
import { queryClient } from "../../queryClient"

export const Login = () => {


    const [emailValue,  setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [errorValue,  setErrorValue] = useState({email: true, password: true})

    const myMutation = useMutation({
        mutationFn: () => loginUser(emailValue, passwordValue),
        mutationKey: ["user"]
    },
queryClient)


    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newError = {email: true, password: true }

        if (!emailValue)  newError.email = false
        if (!passwordValue)  newError.password = false
        
        setErrorValue(newError)
        if (!newError.email || !newError.password)   return 
        myMutation.mutate()
  
    }
    return (
        <form  onSubmit={handleSubmit} className="login_form">
            <div className="login_form-wrapper">
                <label className="login_form-label">
                    <img className="login_form-icon" src={EmailIcon} width="24" height="24"></img>
                <input   placeholder="Электронная почта" style={!errorValue.email ?{ border: "2px solid red"} : undefined} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} ></input>
            </label>
            <label className="login_form-label">
                <img className="login_form-icon" src={PasswordIcon} width="24" height="24"></img>
                <input  className="login_email-input" placeholder="Пароль" style={!errorValue.password ?{ border: "2px solid red"} : undefined} value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} ></input>
            </label>
            </div>
            <button className="login_form-btn">Войти</button>
        </form>
    )
}