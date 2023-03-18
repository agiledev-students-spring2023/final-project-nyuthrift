import './navBar.css'
import React from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='Navbar'>
      <ul>
        <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
        <li><a href="/myprofile">MyProfile</a></li>
        <li><NavLink to="/messages" activeClassName="active">Messages</NavLink></li>
        <li><a href="https://www.google.com/">Sell</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;