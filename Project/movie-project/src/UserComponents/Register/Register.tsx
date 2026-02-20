import "./Register.css"
import EmailIcon from "../../assets/email.svg"
import PasswordIcon from "../../assets/password.svg"
import Usericon from "../../assets/user.svg"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { registerUser } from "../../APIRequests/FetchUser"

interface RegisterProps {
    toggleText: (val: boolean) => void;
}

const Register = ({ toggleText }: RegisterProps) => {
    const [formData, setFormData] = useState({ email: "",  name: "", surname: "", password: "",  confirmPassword: "" })
    const [errors, setErrors] = useState<Record<string, boolean>>({})

    const mutation = useMutation({
        mutationFn: () => registerUser(formData.email, formData.password, formData.name, formData.surname),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toggleText(true); 
        }
    }, queryClient)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
    }

    const validate = () => {
        const newErrors: Record<string, boolean> = {}
        if (!formData.email) newErrors.email = true
        if (!formData.name) newErrors.name = true
        if (!formData.surname) newErrors.surname = true
        if (!formData.password) newErrors.password = true
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = true
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) mutation.mutate()
    }

    if (mutation.isSuccess) {
        return (
            <div className="register_success">
                <h3>Регистрация завершена!</h3>
                <p>Используйте ваш email для входа в систему.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="register_form">
            <h3 className="register_form-title">Создать аккаунт</h3>
            <div className="register_form-wrapper">
                {[
                    { name: "email", icon: EmailIcon, placeholder: "Email", type: "email" },
                    { name: "name", icon: Usericon, placeholder: "Имя", type: "text" },
                    { name: "surname", icon: Usericon, placeholder: "Фамилия", type: "text" },
                    { name: "password", icon: PasswordIcon, placeholder: "Пароль", type: "password" },
                    { name: "confirmPassword", icon: PasswordIcon, placeholder: "Повторите пароль", type: "password" }
                ].map((field) => (
                    <label key={field.name} className="register_form-label">
                        <img className="register_form-icon" src={field.icon} alt="" width="24" height="24" />
                        <input name={field.name}  type={field.type}  className="register_form-input"  style={errors[field.name] ? { border: "1px solid red" } : undefined}  placeholder={field.placeholder}   value={(formData as any)[field.name]}  onChange={handleInputChange}  />
                    </label>
                ))}
            </div>
            <button 
                type="submit" 
                className="register_form-btn" 
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Загрузка..." : "Зарегистрироваться"}
            </button>
            {mutation.isError && <p className="error-text">Ошибка при регистрации. Попробуйте снова.</p>}
        </form>
    )
}

export default Register
