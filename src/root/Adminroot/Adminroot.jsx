import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Footer from '../../components/Footer/Footer'
import CookieBanner from '../../components/CookieBanner/CookieBanner'
import NotificationBell from '../../components/NotificationBanner/NotificationBell'


const Adminroot = () => {
  return (
    <>
      <AdminHeader/>
      <Outlet/>
      <Footer/>
      <CookieBanner/>
      <NotificationBell/>
    </>
  )
}

export default Adminroot