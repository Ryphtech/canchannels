import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Global/Footer/Footer'
import CookieBanner from '../../components/Global/CookieBanner/CookieBanner'
import NotificationBell from '../../components/Global/NotificationBanner/NotificationBell'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { AdminAuthProvider } from '../../contexts/AdminAuthContext'


const Adminroot = () => {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <Outlet/>
        <Footer/>
        <CookieBanner/>
        <NotificationBell/>
      </AdminAuthProvider>
    </ThemeProvider>
  )
}

export default Adminroot