import React, { useState } from "react";
import "./UserNavBar.css";
import { Link, useLocation } from "react-router-dom";

export default function UserNavBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <div>
      <div className="tabs">
        <Link to={`/userProfile/infor`}>
          <button
            className={`tab ${activeTab === "/userProfile/infor" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("/userProfile/infor")}
          >
            Thông tin tài khoản
          </button>
        </Link>
        <Link to={`/userProfile/buyer`}>
          <button
            className={`tab ${activeTab === "/userProfile/buyer" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("/userProfile/buyer")}
          >
            Save lists
          </button>
        </Link>
        <Link to={`/userProfile/change-password`}>
          <button
            className={`tab ${activeTab === "/userProfile/change-password" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("/userProfile/change-password")}
          >
            Thay đổi mật khẩu
          </button>
        </Link>
        <Link to={`/userProfile/payment`}>
          <button
            className={`tab ${activeTab === "/userProfile/payment" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("/userProfile/payment")}
          >
            Thông tin thanh toán
          </button>
        </Link>
      </div>
    </div>
  );
}

