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
          <li className={activeLink === "/shop/favourites" ? "active" : ""}>
            <Link
              to="/shop/favourites"
              onClick={() => handleLinkClick("/shop/favourites")}
            >
              Favorites
            </Link>
          </li>
          <li className={activeLink === "/shop/shop" ? "active" : ""}>
            <Link
              to="/shop/shop"
              onClick={() => handleLinkClick("/shop/shop")}
            >
              Shop
            </Link>
          </li>
          <li className={activeLink === "/shop/about" ? "active" : ""}>
            <Link
              to="/shop/about"
              onClick={() => handleLinkClick("/shop/about")}
            >
              About
            </Link>
          </li>
          <li className={activeLink === "/shop/mylog/:id" ? "active" : ""}>
            <Link
              to="/shop/mylog/:id"
              onClick={() => handleLinkClick("/shop/mylog/:id")}
            >
              MyLog
            </Link>
          </li>
          <li className={activeLink === "/shop/saleHistory" ? "active" : ""}>
            <Link
              to="/shop/saleHistory"
              onClick={() => handleLinkClick("/shop/saleHistory")}
            >
              Sale History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
