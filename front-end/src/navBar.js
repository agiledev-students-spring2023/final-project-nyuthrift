import './navBar.css'
import React from "react";

function Navbar() {
  return (
    <nav className='Navbar'>
      <ul>
        <li><a href="https://www.google.com/">Home</a></li>
        <li><a href="https://www.google.com/">MyProfile</a></li>
        <li><a href="https://www.google.com/">Messages</a></li>
        <li><a href="https://www.google.com/">Sell</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;