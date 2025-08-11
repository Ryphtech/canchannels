import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './styles/global.css'

import Userroot from './root/Userroot/Userroot';
import Homepage from './pages/Homepage/Homepage';
import Adminroot from './root/Adminroot/Adminroot';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Content from './pages/ContentDisplayPage/Content';

// Apply theme on app start
const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Userroot/>,
    children:[
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: "content",
        element: <Content/>
      }
    ]
  },
  {
    path: "/admin",
    element: <Adminroot/>,
    children:[
      {
        path: "/admin",
        element: <AdminDashboard/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
