import { useState } from 'react'
import './App.css'
import { lazy, Suspense } from 'react'
import {Route, Router, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from './MainPage/MainPage'
const LazyMovieProfile = lazy(() => import("./MovieComponents/MovieProfile/MovieProfile"))

function App() {

  return (
    <BrowserRouter>
    <Suspense>
       <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="/movie/:movieId" element={<LazyMovieProfile/>}></Route>
    </Routes>

    </Suspense>
    </BrowserRouter>
  )
}

export default App
