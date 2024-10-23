import React from "react";
import "./Shop.css";
import ShopNavBar from "./shop-navbar/ShopNavBar";
import { Route, Routes } from "react-router-dom";
import ServicesHistory from "./serviceHistory/ServicesHistory";

export default function Shop() {
  return (
    <div className="shop">
      <ShopNavBar />
      <Routes>
        <Route path="shop" />
        <Route path="mylog/:id"></Route>
        <Route path="servicesHistory" element={<ServicesHistory />}></Route>
      </Routes>
    </div>
  );
}
