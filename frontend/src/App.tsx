import { useContext, useEffect, useState } from 'react'

import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SideBar from './components/SideBar/Index'
import Index from './pages/home/Index'
import { menuContext } from './context/MenuContext'
import { MantineProvider } from '@mantine/core';
import LoginPage from './pages/login'
import useCheckAuth from './hooks/UseAuth.js'
import Reports from './pages/reports/Index.js'
import Guide from './pages/guide/Index.js'


function App() {
  const [hamBurger, setHamBurger] = useState(false);

  const { isAuthenticated } = useCheckAuth();

  return (
    <>
      <MantineProvider>

        <menuContext.Provider value={{ hamBurger, setHamBurger }}>
          <Routes>
            {
              isAuthenticated && isAuthenticated === true ?
                (
                  <Route path="/" element={<SideBar />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/guide" element={<Guide />} />
                  </Route>
                )
                :
                (
                  <Route path="/" element={<LoginPage />} />
                )
            }
          </Routes>




        </menuContext.Provider>

      </MantineProvider>

    </>
  )
}

export default App
