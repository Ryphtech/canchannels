import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Global/Footer/Footer'
import CookieBanner from '../../components/Global/CookieBanner/CookieBanner'
import NotificationBell from '../../components/Global/NotificationBanner/NotificationBell'
import { ThemeProvider } from '../../contexts/ThemeContext'


const Adminroot = () => {
  return (
    <ThemeProvider>
      <Outlet/>
      <Footer/>
      <CookieBanner/>
      <NotificationBell/>
    </ThemeProvider>
  )
}

export default Adminroot