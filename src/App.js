import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Header from "./custom/header/Header";
import HomePage from "./components/home/HomePage";
import DetailPage from "./components/detail-page/DetailPage";
import Footer from "./custom/footer/Footer";
import Shop from "./components/profiles/Shop/Shop";

function App() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có phải là "/auth-page" không
  const isAuthPage = location.pathname === "/auth-page";
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        {/* sign up user and sign up shop page */}
        <Route path="/auth-page" element={<AuthPage />} />
        {/* home page */}
        <Route path="/" element={<HomePage />} />
        {/* detail page */}
        <Route path="/detail/:id" element={<DetailPage />} />
        {/* profile shop */}
        <Route path="/shop/*" element={Shop} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
