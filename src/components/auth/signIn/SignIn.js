import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlApi from "../../../api/configApi";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignIn() {
  const [emali, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputType, setInputType] = useState("password");

  const handleEmailChange = (event) => {
    setEmail(event);
  };

  const handlePasswordChange = (event) => {
    setPassword(event);
  };

  // Nếu muốn thêm chức năng hiển thị mật khẩu khi nhấn nút
  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!emali || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
      });
      setIsLoading(false);
      return;
    }
    const data = {
      email: emali,
      password: password,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(`${urlApi}/api/Auth/user/login`, data, {
        headers: {
          "Content-Type": `application/json`,
          Accept: "*/*",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Login success!",
        text: "login",
      });

      console.log("Data: ", response);

      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
      console.log("Token: ", token);

      // Giải mã token để lấy thông tin role
      const decodedToken = jwtDecode(token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]; // Giả sử 'role' là key chứa role trong token
      console.log("decode: ", decodedToken);

      // Chuyển hướng dựa trên role
      if (role === "User") {
        navigate("/");
      } else if (role === "Staff") {
        navigate("/shopProfile/shop");
      }
      console.log("Data: ", response);
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response).message;
      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: errorMessage,
      });
      setIsLoading(false);
      console.error("An error occurred while sending the API request:", error);
    }
  };

   // Hàm xử lý khi nhấn phím Enter
   const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="regisPage" style={{ height: "100vh" }}>
      <div className="register">
        <div className="logoRegis">
          <Link to={`/`}>
            <img src="/assets/logo2-Photoroom.png" alt="Logo" />
          </Link>
        </div>
        <div className="title">Welcome to login page!</div>
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

        <div className="Error" style={{}}>
          {errorMessage && (
            <p style={{ color: "#512da8", margin: "0" }}>{errorMessage}</p>
          )}
        </div>
        <div className="signUp">
          <button type="submit" onClick={() => handleSave()}>
            <span>{isLoading ? "Logging in..." : "Login"}</span>
          </button>
        </div>
        <div className="loginIn">
          <h6>Are you have account?</h6>
          <Link to={`/signUpUser`} style={{ color: "#37AFE1" }}>
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
