import { useState } from "react"

export const Login = () => {


    const [emailValue,  setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")


    function handleSubmit() {
        
    }
    return (
        <form className="login_form">
            <div>
                <label>
                <input className="login_email-input"></input>
            </label>
            <label>
                <input></input>
            </label>
            </div>
            <button>Войти</button>
            

        </form>
    )
}