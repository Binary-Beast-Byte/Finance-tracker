import { useState } from 'react'

import './App.css'
import { Routes, Route } from 'react-router-dom'
import SideBar from './components/SideBar/Index'
import Index from './pages/home/Index'
import { menuContext } from './context/MenuContext'
import { MantineProvider } from '@mantine/core';


function App() {
  const [hamBurger, setHamBurger] = useState(false);


  return (
    <>
    <MantineProvider>

    <menuContext.Provider value={{ hamBurger, setHamBurger }}> //!define Type
    <Routes>
      <Route path="/" element={<SideBar />} >
        <Route path='/' element={<Index />} />
     
      </Route>
    </Routes>
    </menuContext.Provider>
    </MantineProvider>

    </>
  )
}

export default App
