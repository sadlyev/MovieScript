
import AppHeader  from "../HeaderComponents/AppHeader/AppHeader"
import {Route, Router, BrowserRouter, Routes } from 'react-router-dom'
import { RandomMovie } from '../MovieComponents/RandomMovie/RandomMovie'

export const MainPage = () => {
    return (
        <div>
            <AppHeader/>
            <RandomMovie/>
        </div>
    )
}