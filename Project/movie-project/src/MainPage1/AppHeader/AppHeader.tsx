import { Link, useLocation } from "react-router-dom"
import AppLogo from "../../assets/logoWhite.svg"
import GenresIcon from "../../assets/genresIcon.svg"
import "./AppHeader.css"
import UserIcon from "../../assets/whiteUser.svg"
import { lazy, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchUserData } from "../../APIRequests/FetchUser"
const LazySearchedValue = lazy(() => import("../../MovieComponents/SearchedMovieList/SearchedMovieList"))
const LazyRegisterLogin = lazy(() => import("../../UserComponents/RegisterLogin/RegisterLogin"))
import React from "react"


const AppHeader = React.memo(() => {

    const {pathname} = useLocation()

    const {data, isError} = useQuery({
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
                    <Link   to="/"><img src={AppLogo} className="header_logo" width="143" height="32" alt="app logo"></img></Link>
                    <div className="header_inner">
                        <div className="header_nav-wrapper">
                            <div className="header_nav-innerWrapper">
                                 <Link className={`header_link  ${pathname == "/" ? "header_link--active" : ""}`} to="/">Главная</Link>
                                 <Link className={`header_link header_link--icon  ${pathname == "/movie/genre" ? "header_link--active" : ""}`} to="/movie/genre"><img src={GenresIcon}  className={`header_link header_link--icon `} width="24" height="24"></img></Link>
                                 <Link className={`header_link  ${pathname == "/movie/genre" ? "header_link--active" : ""}`} to="/movie/genre">Жанры</Link>
                            </div>
                            <LazySearchedValue className={"header_label"}/>    
                        </div>
                    
                    {isError && !data && (<span className="header_link" onClick={toggleModal}>Войти</span>)}
                    {data && (<Link to="/profile" className={`header_link ${pathname == "/profile" ? "header_link--active" : ""}`}>{data.name}</Link> )}
                    {data ? <Link  className={`header_link header_link--icon ${pathname == "/profile" ? "header_link--active" : ""}`} to="/profile"><img   className={`header_link header_link--icon `} src={UserIcon} width="24" height="24"></img></Link> : <img  className={`header_link header_link--icon `}  onClick={toggleModal} src={UserIcon} width="24" height="24"></img>}

                    </div>
                     <LazyRegisterLogin toggleClass={isOpen ? "" : "registerlogin_wrapper-no" } fnToggle={toggleModal}/>
                </header>
            )
}
)
export default AppHeader

