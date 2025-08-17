import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_small from '../../../assets/can-channels-logo-small.png'
import ThemeToggle from '../../Global/ThemeToggle/ThemeToggle'
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import { supabase } from '../../../backend/supabaseClient';



const AdminHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userRole, setUserRole] = useState('ADMIN');
  const { signOut, admin } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch user role when admin changes
  useEffect(() => {
    const fetchUserRole = async () => {
      if (admin?.id) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', admin.id)
            .single();
          
          if (!error && profile?.role) {
            setUserRole(profile.role.toUpperCase());
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [admin]);

  // Format date as "Aug 15"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentDateTime.toLocaleTimeString();
  
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
                         <ul
               tabIndex={0}
               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
             >
               <li>
                 <a href="/admin">Dashboard</a>
               </li>
               <li>
                 <a href="/admin">Manage Posts</a>
               </li>
               <li>
                 <a href="/admin">Add New Post</a>
               </li>
               {userRole === 'ADMIN' && (
                 <li>
                   <a href="/admin">Sub-Admin Management</a>
                 </li>
               )}
             </ul>
          </div>
          <div>
            <img src={logo_small} className="w-24 sm:w-32 md:w-40 lg:w-44 rounded bg-transparent dark:bg-white" alt="logo" />
          </div>
        </div>
                 <div className="navbar-center hidden lg:flex">
           <ul className="menu menu-horizontal px-1">
             <li>
               <a href="/admin">Dashboard</a>
             </li>
             <li>
               <a href="/admin">Manage Posts</a>
             </li>
             <li>
               <a href="/admin">Add New Post</a>
             </li>
             {userRole === 'ADMIN' && (
               <li>
                 <a href="/admin">Sub-Admin Management</a>
               </li>
             )}
           </ul>
         </div>
        <div className="navbar-end">
          <div className="badge badge-primary mr-2 sm:mr-4 text-xs sm:text-sm">{userRole}</div>
          <ThemeToggle />
          <a className="btn btn-ghost btn-sm sm:btn-md" href="/">
            <span className="hidden sm:inline">View Site</span>
            <span className="sm:hidden">Site</span>
          </a>
          
          {/* Settings Dropdown */}
          <div className="dropdown dropdown-end ml-2">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm sm:btn-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
                         <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64">
               {/* Admin Info */}
               <li className="menu-title text-xs text-base-content/50 uppercase font-semibold">
                 Admin Account
               </li>
                                <li className="px-3 py-2 text-sm text-base-content/70 border-b border-base-200">
                   <div className="flex flex-col">
                     <span className="font-medium break-all">{admin?.email}</span>
                     <span className="text-xs text-base-content/50">{userRole.charAt(0) + userRole.slice(1).toLowerCase()}</span>
                   </div>
                 </li>
              
              {/* Settings Options */}
              <li className="menu-title text-xs text-base-content/50 uppercase font-semibold mt-2">
                Settings
              </li>
              <li>
                <button className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Settings
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security
                </button>
              </li>
              
              {/* Sign Out */}
              <li className="menu-title text-xs text-base-content/50 uppercase font-semibold mt-2">
                Account
              </li>
              <li>
                <button 
                  onClick={async () => {
                    await signOut();
                    navigate('/admin/login');
                  }}
                  className="text-error hover:text-error-focus flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
          
          {/* Date and Time */}
          <div className="ml-2 sm:ml-4 text-center text-xs sm:text-sm leading-tight hidden sm:block">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
