import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CookieBanner from '../../components/CookieBanner/CookieBanner'
import NotificationBell from '../../components/NotificationBanner/NotificationBell'


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