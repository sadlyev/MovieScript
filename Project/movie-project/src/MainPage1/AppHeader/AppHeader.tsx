import { Link, useLocation } from "react-router-dom"
import AppLogo from "../../assets/logoWhite.svg"
import SearchIcon from "../../assets/search.svg"
import "./AppHeader.css"
import { lazy, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { fetchUserData } from "../../APIRequests/FetchUser"
const LazySearchedValue = lazy(() => import("../../MovieComponents/SearchedMovieList/SearchedMovieList"))
const LazyRegisterLogin = lazy(() => import("../../UserComponents/RegisterLogin/RegisterLogin"))
import React from "react"


const AppHeader = React.memo(() => {

    const {pathname} = useLocation()

    const {data, isLoading, isError} = useQuery({
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
                    <div className="header_inner">
                        <div className="header_nav-wrapper">
                            <Link className={`header_link ${pathname == "/" ? "header_link--active" : ""}`} to="/">Главная</Link>
                            <Link className={`header_link ${pathname == "/movie/genre" ? "header_link--active" : ""}`} to="/movie/genre">Жанры</Link>
                            <LazySearchedValue/>
                           
                        </div>
                    
                    <LazyRegisterLogin toggleClass={isOpen ? "" : "registerlogin_wrapper-no" } fnToggle={toggleModal}/>
                    {isLoading && <div>Загрузка...</div>}
                    {isError && !data && (<span className="header_link" onClick={toggleModal}>Войти</span>)}
                    {data && (<Link to="/profile"><span className={`header_link ${pathname == "/profile" ? "header_link--active" : ""}`}>{data.name}</span></Link> )}

                    </div>
                </header>
            )
}
)
export default AppHeader

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}