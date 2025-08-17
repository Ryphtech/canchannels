import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './styles/global.css'

import Userroot from './root/Userroot/Userroot';
import Homepage from './pages/User/Homepage/Homepage';
import Adminroot from './root/Adminroot/Adminroot';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import ProtectedRoute from './components/Admin/ProtectedRoute/ProtectedRoute';
import Content from './pages/User/ContentDisplayPage/Content';
import PrivacyPolicy from './pages/Global/PrivacyPolicy/PrivacyPolicy';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { ThemeProvider } from './contexts/ThemeContext';

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
      },
      {
        path: "content/:postId",
        element: <Content/>
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy/>
      }
    ]
  },
  {
    path: "/admin",
    element: <Adminroot/>,
    children:[
      {
        path: "/admin",
        element: <ProtectedRoute><AdminDashboard/></ProtectedRoute>
      },
      {
        path: "/admin/login",
        element: <AdminLogin/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CookieConsentProvider>
        <RouterProvider router={router} />
      </CookieConsentProvider>
    </ThemeProvider>
  </StrictMode>,
)
