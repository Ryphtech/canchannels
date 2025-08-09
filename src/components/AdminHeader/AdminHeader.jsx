import React, { useEffect, useState } from "react";
import logo_small from '../../assets/can-channels-logo-small.png'

const AdminHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date as "Aug 15"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentDateTime.toLocaleTimeString();
  
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:px-20 lg:px-50">
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
                <a>Dashboard</a>
              </li>
              <li>
                <a>Manage Posts</a>
              </li>
              <li>
                <a>Add New Post</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
          <div>
            <img src={logo_small} className="w-35 md:w-45 rounded bg-transparent dark:bg-white" alt="logo" />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Manage Posts</a>
            </li>
            <li>
              <a>Add New Post</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="badge badge-primary mr-4">ADMIN</div>
          <a className="btn btn-ghost" href="/">View Site</a>
          <div className="ml-4 text-center text-sm leading-tight">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
