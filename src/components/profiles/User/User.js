import React from "react";
import "./User.css";
import UserNavBar from "./user-navbar/UserNavBar";
import { Route, Routes } from "react-router-dom";
import UserInfor from "./user-navbar/container/user-information/UserInfor";

export default function User() {
  return (
    <div className="profile-container">
      <UserNavBar />
      <Routes>
        <Route path="infor" element={<UserInfor />} />
      </Routes>
    </div>
  );
}
