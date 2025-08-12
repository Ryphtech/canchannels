import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader'
import Footer from '../../components/Global/Footer/Footer'
import CookieBanner from '../../components/Global/CookieBanner/CookieBanner'
import NotificationBell from '../../components/Global/NotificationBanner/NotificationBell'


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