import VKLogo from "../../assets/Socials/vk.svg"
import YTlogo from "../../assets/Socials/youtube.svg"
import OdnoLogo from "../../assets/Socials/klassniki.svg"
import TgLogo from "../../assets/Socials/tg.svg"
import "./Footer.css"
import React from "react"

export const Footer = React.memo(() => {
    return (
        <footer className="footer">
            <ul className="footer_list">
            <li><a href="https://vk.ru/maratsadiyev"><img src={VKLogo} alt="vk logo"></img></a></li>
            <li><a href=""><img src={YTlogo} alt="vk logo" ></img></a></li>
            <li><a href=""><img src={OdnoLogo} alt="vk logo" ></img></a></li>
            <li><a href="https://t.me/richycala33"><img src={TgLogo} alt="vk logo" ></img></a></li>  
        </ul>
        </footer>
        
    )
})