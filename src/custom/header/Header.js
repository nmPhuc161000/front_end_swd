import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [showUserMenu, setShowUserMenu] = useState(false);
  const role = localStorage.getItem("role");
  const full_name = localStorage.getItem("full_name");
  const navigate = useNavigate();

  // Toggle user menu visibility
  const toggleUserMenu = () => {
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("full_name");
    setIsLoggedIn(false);
    setShowUserMenu(false);
    navigate("/"); // Chuyển hướng về trang Home
  };

  return (
    <nav className="NavbarItems">
      <div>
        <h1 className="navbar-logo">
          <i className="material-icons">pets</i> Animal Haven
        </h1>
      </div>
      {/* Kiểm tra nếu role không phải là Staff thì mới hiển thị */}
      {role !== "Staff" && (
        <div>
          <div className="search-bar">
            <input type="text" placeholder="Search for pets, services..." />
            <button className="search-button">
              <i className="material-icons">search</i>
            </button>
          </div>
          <ul className="nav-menu" style={{ padding: "10px" }}>
            <li>
              <Link to="/" className="nav-links">
                <i className="material-icons">home</i> Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="nav-links">
                <i className="material-icons">nature_people</i> Services
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-links">
                <i className="material-icons">storefront</i> Products
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div style={{ width: "160px", position: "relative" }}>
        {isLoggedIn ? (
          <div className="user-menu">
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={toggleUserMenu} className="user-icon-button">
                <i className="material-icons">account_circle</i>
              </button>
              <div>{full_name}</div>
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <Link to="/userProfile/infor" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/products" className="dropdown-item">
                  Product
                </Link>
                <Link to="/services" className="dropdown-item">
                  Service
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="nav-links">
            <i className="material-icons">login</i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
