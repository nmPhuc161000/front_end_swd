import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShopNavBar.css";

export default function ShopNavBar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="shop-nav">
      <div className="nav-bar">
        <ul>
          <li className={activeLink === "/shopProfile/favourites" ? "active" : ""}>
            <Link
              to="/shopProfile/favourites"
              onClick={() => handleLinkClick("/shopProfile/favourites")}
            >
              Favorites
            </Link>
          </li>
          <li className={activeLink === "/shopProfile/shop" ? "active" : ""}>
            <Link
              to="/shopProfile/shop"
              onClick={() => handleLinkClick("/shopProfile/shop")}
            >
              Shop
            </Link>
          </li>
          <li className={activeLink === "/shopProfile/about" ? "active" : ""}>
            <Link
              to="/shopProfile/about"
              onClick={() => handleLinkClick("/shopProfile/about")}
            >
              About
            </Link>
          </li>
          <li className={activeLink === "/shopProfile/mylog/:id" ? "active" : ""}>
            <Link
              to="/shopProfile/mylog/:id"
              onClick={() => handleLinkClick("/shopProfile/mylog/:id")}
            >
              MyLog
            </Link>
          </li>
          <li className={activeLink === "/shopProfile/servicesHistory" ? "active" : ""}>
            <Link
              to="/shopProfile/servicesHistory"
              onClick={() => handleLinkClick("/shopProfile/servicesHistory")}
            >
              Services History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
