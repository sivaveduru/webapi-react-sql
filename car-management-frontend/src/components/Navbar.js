import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import custom CSS

const Navbar = () => {
  // State to control the collapse of the navbar on mobile
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Toggle the collapse state when a menu item is clicked
  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand custom-brand" to="/">
          Car Dealer Limited
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse state
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/cars"
                onClick={handleLinkClick}
              >
                Car Management
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/users"
                onClick={handleLinkClick}
              >
                Users List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/login"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/register"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/about"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
