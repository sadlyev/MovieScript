import { Link } from "react-router-dom"
import AppLogo from "../../assets/Mask group.svg"

const AppHeader = () => {
    
    return (
        <header>
            <div>
                <img src={AppLogo}></img>
                <p>маруся</p>
            </div>
            <Link to="/">Главная</Link>
            <Link to="">Жанры</Link>
            <label>
                <input></input>
            </label>

        </header>
    )
}

export default AppHeader