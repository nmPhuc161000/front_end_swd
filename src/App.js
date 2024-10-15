import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Header from "./custom/header/Header";
import HomePage from "./components/home/HomePage";
import DetailPage from "./components/detail-page/DetailPage";
// import { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có phải là "/auth-page" không
  const isAuthPage = location.pathname === "/auth-page";
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        {/* sign in and sign up page */}
        <Route path="/auth-page" element={<AuthPage />} />
        {/* home page */}
        <Route path="/" element={<HomePage />} />
        {/* detail page */}
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
