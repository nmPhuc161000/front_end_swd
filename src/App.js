import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./custom/header/Header";
import HomePage from "./components/home/HomePage";
import DetailPage from "./components/detail-page/DetailPage";
import Footer from "./custom/footer/Footer";
import Shop from "./components/profiles/Shop/Shop";
import SignUp from "./components/auth/signUp/SignUp";
import SignUpShop from "./components/auth/signUpShop/SignUpShop";
import SignIn from "./components/auth/signIn/SignIn";
import PageForCat from "./components/services-page/page-cat/PageForCat";
import PageForDog from "./components/services-page/page-dog/PageForDog";

function App() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có phải là "/page" không
  const isLoginPage = location.pathname === "/signin";
  const isSignUpUser = location.pathname === "/signUpUser";
  const isSignUpShop = location.pathname === "/signUpShop";
  return (
    <>
      {!(isLoginPage || isSignUpUser || isSignUpShop) && <Header />}
      <Routes>
        {/* sign up user and sign up shop page */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUpUser" element={<SignUp />} />
        <Route path="/signUpShop" element={<SignUpShop />} />
        {/* home page */}
        <Route path="/" element={<HomePage />} />
        {/* detail page */}
        <Route path="/detail/:id" element={<DetailPage />} />
        {/* profile shop */}
        <Route path="/shopProfile/*" element={<Shop />} />
        {/* page for cat */}
        <Route path="/page-cat" element={<PageForCat />} />
        {/* page for dog */}
        <Route path="/page-dog" element={<PageForDog />} />
      </Routes>
      {!(isLoginPage || isSignUpUser || isSignUpShop) && <Footer />}
    </>
  );
}

export default App;
