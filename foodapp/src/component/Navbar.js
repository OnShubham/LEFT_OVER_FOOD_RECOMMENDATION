// import { useState , useContext } from "react"
// import { Link, useLocation , useNavigate} from "react-router-dom"
// import Sidebar from './Sidebars'
// import { faHome, faCog , faCookieBite, faPerson} from "@fortawesome/free-solid-svg-icons"; //faList
// import { faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons"
// import { UserContext } from '../UserContext'; // Import UserContext


// export default function Navbar() {

//   const [sidebar, setSidebar] = useState(false)
//   const location = useLocation()
//   const { loggedIn, setLoggedIn } = useContext(UserContext); // Destructure loggedIn and setLoggedIn from UserContext
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     const confirmLogout = window.confirm('Are you sure you want to log out?');
//     if (confirmLogout) {
//       setLoggedIn(false); // Update the loggedIn state to false
//       navigate('/login'); // Navigate to the login page
//     }
//   };
  


//   const links = [
//   {
//     name: 'Home',
//     path: '/',
//     icon: faHome
//   },
//   // {
//   //   name: "Recipes",
//   //   path: "/recipes",
//   //   icon: faList
//   // },
//   {
//     name: "FoodRecipe",
//     path: "/recipes1",
//     icon: faCookieBite
//   },
//   {
//     name: "Recommend",
//     path: "/recommend",
//     icon: faSquareGooglePlus
//   },
//   {
//     name: "Settings",
//     path: "/settings",
//     icon: faCog
//   },
//   {
//     name: loggedIn ? 'Logout' : 'Login',
//     path: loggedIn ? '/login' : '/login',
//     icon: faPerson,
//   },
  
// ]
// function closeSidebar(){
//   setSidebar(false)
// }
//   return (
//     <>
//       <div className='navbar container'>
//         <Link to='/' className='logo'>Left<span>O</span>ver</Link>
//         <div className='nav-links'>
//           {links.map((link, index) => (
//             <Link className={location.pathname === link.path ? "active" : ""} to={link.path}
//             onClick={link.name === "Logout" ? handleLogout : undefined }
//             key={link.name}>{link.name}</Link>
//           ))}
//           {/* <a href='#!'>Home</a>
//           <a href='#!'>Recipes</a>
//           <a href='#!'>Setting</a> */}
//         </div>
//         <div onClick={() => setSidebar(!sidebar)} className={sidebar ? "sidebar-btn active" : "sidebar-btn"}>
//           <div className='bar'></div>
//           <div className='bar'></div>
//           <div className='bar'></div>
//         </div>
//       </div>
//       { sidebar && <Sidebar close = {closeSidebar} links={links} />}
//     </>
//   )
// }




import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faHome, faCog, faCookieBite, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../UserContext';
import Sidebar from "./Sidebars";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setLoggedIn(false);
    setShowLogoutModal(false); // Hide the logout confirmation modal
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Hide the logout confirmation modal
    navigate('/')
  };

  const links = [
    {
      name: 'Home',
      path: '/',
      icon: faHome,
    },
    {
      name: 'FoodRecipe',
      path: '/recipes1',
      icon: faCookieBite,
    },
    {
      name: 'Recommend',
      path: '/recommend',
      icon: faSquareGooglePlus,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: faCog,
    },
    {
      name: loggedIn ? 'Logout' : 'Login',
      path: loggedIn ? '/logout' : '/login',
      icon: faPerson,
    },
  ];

  function closeSidebar() {
    setSidebar(false);
  }

  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          Left<span>O</span>ver
        </Link>
        <div className="nav-links">
          {links.map((link, index) => (
            <Link
              className={location.pathname === link.path ? 'active' : ''}
              to={link.path}
              onClick={link.name === 'Logout' ? handleLogout : undefined}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div onClick={() => setSidebar(!sidebar)} className={sidebar ? 'sidebar-btn active' : 'sidebar-btn'}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {sidebar && <Sidebar close={closeSidebar} links={links} />}
      

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-modal-buttons">
              <button className="logout-confirm" onClick={handleConfirmLogout}>
                Confirm
              </button>
              <button className="logout-cancel" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

