import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../resources/css/index.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span style={{ paddingRight: "1.2rem" }}>TraVlog</span>
            <i class="fas fa-tenge"></i>
          </Link>
          <ul className="nav-menu">
            <li className="nav-item underline-effect">
              <Link to="/login" className="nav-links ">
                Login
              </Link>
            </li>
            <li className="nav-item underline-effect">
              <Link to="/sign-up" className="nav-links">
                Sign Up
              </Link>
            </li>

            <li className="nav-item underline-effect">
              <Link to="/profile" className="nav-links">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
