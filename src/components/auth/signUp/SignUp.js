import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import urlApi from "../../../api/configApi";
import { signUpUser, verifyEmail } from "../../../api/testApi";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (value) => {
    setFullName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handlePhoneNoChange = (e) => {
    const input = e.target.value;
    const phoneNumber = input.replace(/\D/g, "");
    if (phoneNumber !== input) {
      setErrorMessage("Please enter only numbers.");
    } else {
      setErrorMessage("");
    }
    setPhone(phoneNumber);
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!fullName || !email || !password || !phoneNo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const data = {
      FullName: fullName,
      Email: email,
      PhoneNo: phoneNo,
      Password: password,
    };

    try {
      // Gửi yêu cầu POST đến API
      const response = await signUpUser(data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response?.data?.message,
        input: "text", // Ô input để nhập OTP
        inputPlaceholder: "Enter your OTP", // Placeholder cho ô input
        inputAttributes: {
          maxlength: 6, // Giới hạn ký tự OTP, ví dụ: 6 ký tự
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true, // Hiển thị nút hủy nếu cần
        confirmButtonText: "Submit OTP",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const otp = result.value;

          const dataOTP = {
            otp: otp,
            email: email
          }

          // Gọi API để xác thực OTP
          try {
            const otpResponse = await verifyEmail(dataOTP);

            Swal.fire({
              icon: "success",
              title: "OTP Verified!",
              text: otpResponse?.data?.message,
            });
            navigate("/signin");
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to verify OTP. Please try again.",
            });
            console.error("Error verifying OTP:", error);
          }
        }
      });

      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: error.response.data.title,
      });
      // Xử lý lỗi
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error);
      setIsLoading(false);
    }
  };

   // Hàm xử lý khi nhấn phím Enter
   const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
      <div className="regisPage" style={{ height: "100vh" }}>
        <div className="register">
          <div className="logoRegis">
            <Link to={`/`}>
              <img src="/assets/logo2-Photoroom.png" alt="Logo" />
            </Link>
          </div>
          <div className="title">Register Now!</div>
          <div className="group-regis">
            <div className="group-i">
              <input
                type="text"
                placeholder="Full name (*)"
                onChange={(e) => handleFullNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type="text"
                placeholder="Email (*)"
                onChange={(e) => handleEmailChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type={inputType}
                placeholder="Password (*)"
                onChange={(e) => handlePasswordChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type="number"
                placeholder="Phone (*)"
                min={0}
                maxLength="10"
                onChange={handlePhoneNoChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="Error" style={{}}>
            {errorMessage && (
              <p style={{ color: "#512da8", margin: "0" }}>{errorMessage}</p>
            )}
          </div>
          <div className="signUp">
            <button type="submit" onClick={() => handleSave()}>
              <span>{isLoading ? "Regis..." : "Regis"}</span>
            </button>
          </div>
          <div className="loginIn">
            <h6>Are you have account?</h6>
            <Link to={`/signin`} style={{ color: "#37AFE1" }}>
              Login now
            </Link>
          </div>
          <div className="loginIn">
            <h6>Do you want to become a shop?</h6>
            <Link to={`/signUpShop`} style={{ color: "#37AFE1" }}>
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
