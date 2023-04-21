import '../styles/navBar.css'
import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const hiddenRoutes = ["/signin", "/signup"];
  const isHiddenRoute = hiddenRoutes.includes(location.pathname);

  if (isHiddenRoute) {
    return null;
  }

  return (
    <nav className='Navbar'>
      <ul>
        <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
        <li><a href="/myprofile">MyProfile</a></li>
        <li><NavLink to="/messages" activeClassName="active">Messages</NavLink></li>
        <li><NavLink to="/sell" activeClassName="active">Sell</NavLink></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;