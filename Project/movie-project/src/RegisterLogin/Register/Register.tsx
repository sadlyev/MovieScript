import "./Register.css"
import EmailIcon from "../../assets/email.svg"
import PasswordIcon from "../../assets/password.svg"
import Usericon from "../../assets/user.svg"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { registerUser } from "../../APIRequests/FetchUser"

export const Register = () => {

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userSurname,  setUserSurname] = useState("")
    const [userPassword,  setUserPassword] = useState("")
    const [userSamePassword, setUserSamePassword] = useState("")
    const [errorValue, setErrorvalue] = useState({email: true, name: true, surname: true, password: true,  samePassword: true})
    
     const myMutation = useMutation({
            mutationFn: () => registerUser(userEmail, userPassword, userName, userSurname),
            mutationKey: ["user"]
        },
    queryClient)

    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newErrors = {email: true, name: true, surname: true, password: true,  samePassword: true}

        if (!userEmail)  newErrors.email = false
        if (!userName)  newErrors.name = false
        if(!userSurname)  newErrors.surname = false
        if(!userPassword)  newErrors.password = false
        if(!userSamePassword)  newErrors.samePassword = false
         
        setErrorvalue(newErrors)

        if(!newErrors.email || !newErrors.name || !newErrors.surname || !newErrors.password || !newErrors.samePassword || userPassword !== userSamePassword) {
            return
        } else {
            console.log("tests are passing")
            myMutation.mutate()
        }

    }



    return (
            <form onSubmit={handleRegister} className="register_form">
                <h3 className="register_form-title">Регистрация</h3>
                <div className="register_form-wrapper">
                    <label className="register_form-label">
                    <img className="register_form-icon" src={EmailIcon} height="24" width="24"></img>
                    <input className="register_form-input" style={!errorValue.email ? {border: "1px solid red"} : undefined} placeholder="Электронная почта" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={EmailIcon} height="24" width="24"></img>
                    <input className="register_form-input" style={!errorValue.name ? {border: "1px solid red"} : undefined} placeholder="Имя"  value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={Usericon} height="24" width="24"></img>
                    <input className="register_form-input"  style={!errorValue.surname ? {border: "1px solid red"} : undefined} placeholder="Фамилия"  value={userSurname} onChange={(e) => setUserSurname(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={PasswordIcon} height="24" width="24"></img>
                    <input className="register_form-input"  style={!errorValue.password ? {border: "1px solid red"} : undefined} placeholder="Пароль"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
                </label>
                <label className="register_form-label">
                    <img className="register_form-icon" src={PasswordIcon} height="24" width="24"></img>
                    <input className="register_form-input" style={!errorValue.samePassword ? {border: "1px solid red"} : undefined} placeholder="Подтвердите пароль"  value={userSamePassword} onChange={(e) => setUserSamePassword(e.target.value)}></input>
                </label>
                </div>
                <button type="submit" className="register_form-btn">Создать Аккаунт</button>  
            </form>
    )
}