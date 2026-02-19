import { Link, useLocation } from "react-router-dom"
import AppLogo from "../../assets/logoWhite.svg"
import SearchIcon from "../../assets/search.svg"
import "./AppHeader.css"
import { lazy, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchUserData } from "../../APIRequests/FetchUser"
const LazyRegisterLogin = lazy(() => import("../../RegisterLogin/RegisterLogin/RegisterLogin"))
import React from "react"

const AppHeader = React.memo(() => {

    const {pathname} = useLocation()

    const {data, isLoading} = useQuery({
        queryFn: () => fetchUserData(),
        queryKey: ["user"],
        retry: false
    },
queryClient
)
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(prev => !prev)


            return (
                
                <header className="header">
                    <Link  className="header_link" to="/"><img src={AppLogo} className="header_logo" width="143" height="32"></img></Link>
                    <div className="header_nav-wrapper">
                        <Link className={`header_link ${pathname == "/" ? "header_link--active" : ""}`} to="/">Главная</Link>
                    <Link className={`header_link ${pathname == "/movie/genre" ? "header_link--active" : ""}`} to="/movie/genre">Жанры</Link>
                    <label className="header_label">
                        <img src={SearchIcon} className="header_label-logo" width="20" height="20"></img>
                        <input className="header_label-input" placeholder="поиск"></input>
                    </label>
                    </div>
                    
                    <LazyRegisterLogin toggleClass={isOpen ? "" : "registerlogin_wrapper-no" } fnToggle={toggleModal}/>
                    {isLoading && <div>Загрузка...</div>}
                    {isLoading && !data && (<span  onClick={toggleModal}>Войти</span>)}
                    {data && (<Link to="/profile"><span className={`header_link ${pathname == "/profile" ? "header_link--active" : ""}`}>{data.name}</span></Link> )}
                    
                
                </header>
            )
}
)
export default AppHeader