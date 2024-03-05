import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">MegaMart</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 s-gap">

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/categories">Categories</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/products">Products</NavLink>
        </li>
        
      </ul>

      <div className="">

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">



        <li className="nav-item">
          <span className="nav-icon"><FontAwesomeIcon icon={faUser} /></span>
          <NavLink className="nav-link" aria-current="page" to="/signin">Sign in</NavLink>
          <span className="separator-auth"> / </span>
          <NavLink className="nav-link" aria-current="page" to="/signup">Sign up</NavLink>

        </li>

        
        <li className="nav-item">
        <span className="separator"> | </span>
          <span className="nav-icon"><FontAwesomeIcon icon={faCartShopping} /></span>
          <NavLink className="nav-link" aria-current="page" to="/cart">Cart</NavLink>
        </li>

        </ul>

      </div>


     
    </div>
  </div>
</nav>

  );
}
