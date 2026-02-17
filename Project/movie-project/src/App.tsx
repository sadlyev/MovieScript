import { useState } from 'react'
import './App.css'
import { lazy, Suspense } from 'react'
import {Route, Router, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from './MainPage/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Suspense>
       <Routes>
      <Route path="/" element={<MainPage/>}></Route>
    </Routes>

    </Suspense>
    </BrowserRouter>
  )
}

export default App
