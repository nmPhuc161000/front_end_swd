import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Header from "./custom/header/Header";
import HomePage from "./components/home/HomePage";
// import { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có phải là "/auth-page" không
  const isAuthPage = location.pathname === "/auth-page";
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-page" element={<AuthPage/>} />
      </Routes>
    </>
  );
}

export default App;
