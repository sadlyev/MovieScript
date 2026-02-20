import React from "react"
import AppHeader from "../../MainPage1/AppHeader/AppHeader"
import { Footer } from "../../MainPage1/Footer/Footer"
import "./Profile.css"
import { useState } from "react"
import LikeIcon from "../../assets/like.svg"
import UserIcon from "../../assets/whiteUser.svg"
import FavoriteMovie from "../FavoriteMovies/FavoriteMovie"

const Profile = React.memo(() => {
    const [navPage, setNavPage] = useState("favorites")

    function handlePage() {
        setNavPage((prev) => prev == "favorites" ? "settings" : "favorites")
    }  

    return (
        <div className="profile_user">
            <AppHeader/>
            <div className="profile_wrapper">
                <h2 className="profile_title">Мой аккаунт</h2>
                <div className="profile_nav">
                    <div className="profile_nav-wrapper">
                        <div  className={`profile_nav-btn ${navPage == "favorites"? "profile_nav-btn--active" : ""}`} onClick={() => handlePage()}><img src={LikeIcon} width="24" height="24"></img><span>Избранные Фильмы</span></div>
                        <div className={`profile_nav-btn ${navPage == "settings"? "profile_nav-btn--active" : ""}`} onClick={() => handlePage()}><img src={UserIcon} width="24" height="24"></img><span>Настройки Аккаунта</span></div>
                    </div>
                    <FavoriteMovie/>
                </div>
            </div>
            <Footer/>
        </div>

    )
})

export default Profile