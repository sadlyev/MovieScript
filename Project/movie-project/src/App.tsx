import { useState } from 'react'
import './App.css'
import { lazy, Suspense } from 'react'
import {Route, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from './MainPage/MainPage'
const LazyMovieGenre = lazy(() => import("./MovieComponents/MovieGenre/MovieGenre"))
const LazyMovieSplitGenre = lazy(() => import("./MovieComponents/MovieSplitGenre/MovieSplitGenre"))
const LazyMovieProfile = lazy(() => import("./MovieComponents/MovieProfile/MovieProfile"))

function App() {

  return (
    <BrowserRouter>
    <Suspense>
       <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="/movie/:movieId" element={<LazyMovieProfile/>}></Route>
      <Route path="/movie/genre" element={<LazyMovieGenre/>}></Route>
      <Route path="/movie/genre/:searchGenre" element={<LazyMovieSplitGenre/>}></Route>
    </Routes>

    </Suspense>
    </BrowserRouter>
  )
}

export default App
