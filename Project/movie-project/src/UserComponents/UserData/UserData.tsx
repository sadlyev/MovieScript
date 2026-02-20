import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchUserData } from "../../APIRequests/FetchUser";
import { queryClient } from "../../queryClient";
import EmailIcon from "../../assets/whiteEmail.svg"
import "./UserData.css"
import { fetchUserLogout } from "../../APIRequests/FetchUser";
import { useNavigate } from "react-router-dom";

const UserData = React.memo(() => {

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
    },
    queryClient,
  );

  function handleUserLogout() {
    myMutation.mutate()
  }

  switch (myQuery.status) {
    case "pending":
      return <div>Загрузка...</div>;
    case "error":
      return (
        <div>
          <span>Произошла Ошибка</span>
          <button onClick={() => myQuery.refetch()}>Повторить</button>
        </div>
      );
    case "success":
      return (
        <div className="user_data">
          <div className="user_data-inner">
            <div className="user_data-wrapper">
                <div className="user_logo"><span >{`${myQuery.data.name[0].toUpperCase()}${myQuery.data.surname[0].toUpperCase()}`}</span></div>
                <div className="user_data-inner-info">
                    <span className="user_data-label">Имя Фамилия</span>
                    <span className="user_data-info">{`${myQuery.data.name} ${myQuery.data.surname}`}</span>
                </div>
            </div>
            <div className="user_data-wrapper">
                <div className="user_logo user_logo--img"><img  src={EmailIcon} width="24" height="24"></img></div>
                
                <div className="user_data-inner-info">
                    <span className="user_data-label">Электронная почта</span>
                    <span className="user_data-info">{myQuery.data.email}</span>
                </div>
            </div>
          </div>   
          <button onClick={handleUserLogout} className="user_data-btn">Выйти из аккаунта</button>  
        </div>
      );
  }
});

export default UserData;
