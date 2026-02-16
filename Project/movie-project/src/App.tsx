import { useState } from 'react'
import './App.css'
import { lazy, Suspense } from 'react'
const LazyAppHeader = lazy(() => import("./HeaderComponents/AppHeader/AppHeader"))
import {Route, Router, BrowserRouter, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Suspense>
       <Routes>
      <Route path="/" element={<LazyAppHeader></LazyAppHeader>}></Route>
    </Routes>

    </Suspense>
    </BrowserRouter>
  )
}

export default App
