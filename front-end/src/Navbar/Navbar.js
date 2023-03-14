import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/likes" activeClassName="active">Likes</NavLink>
        </li>
        <li>
          <NavLink to="/create-listing" activeClassName="active">Create Listing</NavLink>
        </li>
        <li>
          <NavLink to="/messages" activeClassName="active">Messages</NavLink>
        </li>
        <li>
          <NavLink to="/my-profile" activeClassName="active">My Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
