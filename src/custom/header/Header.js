import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem("token"),
      showUserMenu: false,
    };
  }

  // Toggle user menu visibility
  toggleUserMenu = () => {
    this.setState((prevState) => ({
      showUserMenu: !prevState.showUserMenu,
    }));
  };

  // Handle logout
  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false, showUserMenu: false });
  };

  render() {
    const { isLoggedIn, showUserMenu } = this.state;

    return (
      <nav className="NavbarItems">
        <div>
          <h1 className="navbar-logo">
            <i className="material-icons">pets</i> Animal Haven
          </h1>
        </div>
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
        <div style={{ width: "160px", position: "relative" }}>
          {!isLoggedIn ? (
            <div className="user-menu">
              <button
                onClick={this.toggleUserMenu}
                className="user-icon-button"
              >
                <i className="material-icons">account_circle</i>
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/cast" className="dropdown-item">
                    Cast
                  </Link>{" "}
                  {/* Cast item */}
                  <Link to="/products" className="dropdown-item">
                    Product
                  </Link>{" "}
                  {/* Product link */}
                  <Link to="/services" className="dropdown-item">
                    Service
                  </Link>{" "}
                  {/* Service link */}
                  <Link to="/user" className="dropdown-item">
                    User
                  </Link>{" "}
                  {/* User.js link */}
                  <button onClick={this.handleLogout} className="dropdown-item">
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
}

export default Navbar;
