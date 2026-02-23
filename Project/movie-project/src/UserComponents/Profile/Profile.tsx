import React, { lazy, Suspense } from "react"
import AppHeader from "../../MainPage1/AppHeader/AppHeader"
import { Footer } from "../../MainPage1/Footer/Footer"
import "./Profile.css"
import { useState } from "react"
import LikeIcon from "../../assets/like.svg"
import UserIcon from "../../assets/whiteUser.svg"
const LazyFavoriteMovie = lazy(() => import("../FavoriteMovies/FavoriteMovie"))
const LazyUserData = lazy(() => import("../UserData/UserData"))
import { useNavigate } from "react-router-dom"
import { useMutation , useQuery} from "@tanstack/react-query"
import { fetchUserLogout } from "../../APIRequests/FetchUser"
import { queryClient } from "../../queryClient"
import { fetchUserData } from "../../APIRequests/FetchUser"
import { Loader } from "../../Loader/Loader"

const Profile = React.memo(() => {
    const [navPage, setNavPage] = useState("favorites")

    function handlePage() {
        setNavPage((prev) => prev == "favorites" ? "settings" : "favorites")
    }  

    const navigate = useNavigate()

  const myMutation = useMutation({
    mutationFn: () =>  fetchUserLogout(),
    onSuccess: () => {
        queryClient.clear(); 
    navigate("/");
    }
  }, queryClient)

  const myQuery = useQuery(
    {
      queryFn: () => fetchUserData(),
      queryKey: ["user"],
      retry: false, 
    refetchOnWindowFocus: false,
    },
    queryClient,
  );

  function handleUserLogout() {
    myMutation.mutate()
  }


    switch (myQuery.status) {
    case "pending":
      return (<Loader/>);
    case "error":
      return (
        <div style={{display: "flex",  flexDirection: "column", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", gap: "40px"}}>
          <span style={{fontSize : "40px", color: "white"}}>Пожалуйста, войдите в аккаунт</span>
          <button onClick={() => navigate("/")}>На главную</button>
        </div>
      );
    case "success":

    return (
        <div className="profile_user">
            <AppHeader/>
            <div className="profile_wrapper">
                <h2 className="profile_title">Мой аккаунт</h2>
                <div className="profile_nav-wrapper">
                    <div  className={`profile_nav-btn ${navPage == "favorites"? "profile_nav-btn--active" : ""}`} onClick={() => handlePage()}><img src={LikeIcon} width="24" height="24"></img><span>Избранные</span><span className="profile_nav-btn-text">Фильмы</span></div>
                    <div className={`profile_nav-btn ${navPage == "settings"? "profile_nav-btn--active" : ""}`} onClick={() => handlePage()}><img src={UserIcon} width="24" height="24"></img><span>Настройки</span><span className="profile_nav-btn-text">Аккаунта</span></div>
                </div>
            </div>
            
           <Suspense fallback={<Loader/>}>
              {navPage === "favorites" ? (  <div className="favorite_scroll-wrapper">
  <LazyFavoriteMovie />
</div>  ) : (  <LazyUserData userInfo={myQuery.data} outFn={handleUserLogout} />  )}
            </Suspense>
            <Footer/>
        </div>

    )
}})

export default Profile