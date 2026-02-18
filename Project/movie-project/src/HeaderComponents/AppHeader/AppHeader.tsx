import { Link } from "react-router-dom"
import AppLogo from "../../assets/logoWhite.svg"
import SearchIcon from "../../assets/search.svg"
import "./AppHeader.css"
import { lazy, useState } from "react"
const LazyRegisterLogin = lazy(() => import("../../RegisterLogin/RegisterLogin/RegisterLogin"))

const AppHeader = () => {

    const [compClass, setCompClass] = useState("registerlogin_wrapper-no" )
    
    return (
        <header className="header">
                <Link  className="header_link" to="/"><img src={AppLogo} className="header_logo" width="143" height="32"></img></Link>
            <div className="header_nav-wrapper">
                 <Link className="header_link" to="/">Главная</Link>
            <Link className="header_link" to="/movie/genre">Жанры</Link>
            <label className="header_label">
                <img src={SearchIcon} className="header_label-logo" width="20" height="20"></img>
                <input className="header_label-input" placeholder="поиск"></input>
            </label>
            </div>
           <LazyRegisterLogin toggleClass={compClass}/>
            <button className="header_link" onClick={() => setCompClass(compClass == "registerlogin_wrapper-no"  ? "" : "registerlogin_wrapper-no" )}>Войти</button>

        </header>
    )
}

export default AppHeader