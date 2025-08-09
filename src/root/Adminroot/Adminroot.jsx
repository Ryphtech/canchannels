import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Footer from '../../components/Footer/Footer'

const Adminroot = () => {
  return (
    <>
      <AdminHeader/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Adminroot