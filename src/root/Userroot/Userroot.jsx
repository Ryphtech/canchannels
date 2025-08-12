import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/User/Header/Header'
import Footer from '../../components/Global/Footer/Footer'
import CookieBanner from '../../components/Global/CookieBanner/CookieBanner'
import NotificationBell from '../../components/Global/NotificationBanner/NotificationBell'
import AdBanner from '../../components/User/Adbanner/Adbanner'


const Userroot = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <CookieBanner/>
    <NotificationBell/>
    </>

  )
}

export default Userroot