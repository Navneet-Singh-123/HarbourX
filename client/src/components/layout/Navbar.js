import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../resources/css/index.css";

const Navbar = ({ history }) => {
  const isAutheticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  };

  const signout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    window.location.reload();
  };

  const guestLinks = () => (
    <>
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
    </>
  );

  const authLinks = () => (
    <>
      <li className="nav-item underline-effect">
        <div
          className="nav-links"
          onClick={(e) => signout()}
          style={{ cursor: "pointer" }}
        >
          Sign Out
        </div>
      </li>

      <li className="nav-item underline-effect">
        <Link to="/profile" className="nav-links">
          Profile
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span style={{ paddingRight: "1.2rem", paddingLeft: "2.5rem" }}>
              TraVlog
            </span>
            <i class="fas fa-tenge"></i>
          </Link>
          <ul className="nav-menu">
            {!isAutheticated() ? guestLinks() : authLinks()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
