import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import urlApi from "../../../api/configApi";

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
      Password: password,
      PhoneNo: phoneNo,
    };

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(`${urlApi}/api/Auth/user/register/user`, data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: error.response.data.message,
      });
      // Xử lý lỗi
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="regisPage">
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
              />
            </div>
            <div className="group-i">
              <input
                type="text"
                placeholder="Email (*)"
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
            <div className="group-i">
              <input
                type={inputType}
                placeholder="Password (*)"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </div>
            <div className="group-i">
              <input
                type="number"
                placeholder="Phone (*)"
                min={0}
                maxLength="10"
                onChange={handlePhoneNoChange}
              />
            </div>
          </div>
          <div className="Error" style={{}}>
            {errorMessage && (
              <p style={{ color: "#512da8", margin: "0" }}>{errorMessage}</p>
            )}
          </div>
          <div className="signUp">
            <button
              type="submit"
              onClick={() => handleSave()}
            >
              <span>{isLoading ? "Regis..." : "Regis"}</span>
            </button>
          </div>
          <div className="loginIn">
            <h6>Are you have account?</h6>
            <Link to={`/signin`} style={{color: "#37AFE1"}}>
              Login now
            </Link>
          </div>
          <div className="loginIn">
            <h6>You want to register account for shop!</h6>
            <Link to={`/signUpShop`} style={{color: "#37AFE1"}}>
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
