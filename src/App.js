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
import User from "./components/profiles/User/User";
import ServicesPage from "./components/services/ServicesPage";
import ForgotPass from "./components/auth/forgot-password/ForgotPass";
import BookingPage from "./components/booking/BookingPage";
import { AuthProvider } from "./authorize/AuthContext";
import ProtectedRoute from "./authorize/ProtectedRoute";
import BookingConfirmation from "./components/booking/container/booking-vnpay/BookingConfirmation";
import PaymentReturn from "./components/booking/container/payment-return/PaymentReturn";

function App() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có phải là "/page" không
  const isLoginPage = location.pathname === "/signin";
  const isSignUpUser = location.pathname === "/signUpUser";
  const isSignUpShop = location.pathname === "/signUpShop";
  const isForgotPass = location.pathname === "/forgotPassword";
  return (
    <AuthProvider>
      {!(isLoginPage || isSignUpUser || isSignUpShop || isForgotPass) && (
        <Header />
      )}
      <Routes>
        {/* sign up user and sign up shop page */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUpUser" element={<SignUp />} />
        <Route path="/signUpShop" element={<SignUpShop />} />
        <Route path="/forgotPassword" element={<ForgotPass />} />
        {/* home page */}
        <Route path="/" element={<HomePage />} />
        {/* services page */}
        <Route path="/services" element={<ServicesPage />} />
        {/* detail page */}
        <Route path="/detail/:id" element={<DetailPage />} />
        {/* profile shop */}
        <Route
          path="/shopProfile/*"
          element={
            // <ProtectedRoute>
            <Shop />
            // </ProtectedRoute>
          }
        />
        {/* profile shop */}
        <Route
          path="/userProfile/*"
          element={
            // <ProtectedRoute>
            <User />
            // </ProtectedRoute>
          }
        />
        {/* page for cat */}
        <Route path="/page-cat" element={<PageForCat />} />
        {/* page for dog */}
        <Route path="/page-dog" element={<PageForDog />} />
        {/* booking page */}
        <Route
          path="/booking-page"
          element={
            // <ProtectedRoute>
            <BookingPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            // <ProtectedRoute>
            <BookingConfirmation />
            // </ProtectedRoute>
          }
        />

        <Route path="/payment-return" element={<PaymentReturn />} />
      </Routes>
      {!(isLoginPage || isSignUpUser || isSignUpShop || isForgotPass) && (
        <Footer />
      )}
    </AuthProvider>
  );
}

export default App;
