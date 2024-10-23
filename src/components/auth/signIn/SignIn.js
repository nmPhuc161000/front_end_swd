import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlApi from "../../../api/configApi";
import Swal from "sweetalert2";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputType, setInputType] = useState("password");

  const handleEmailChange = (event) => {
    setUsername(event);
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
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${urlApi}/api/Auth/user/login`, data, {
        header: {
          "Content-Type": `application/json`,
          Accept: "*/*",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Login success!",
        text: response.data.message,
      });

      const { newToken, role } = response.data;
      localStorage.setItem("token", newToken.token);
      // Chuyển hướng dựa trên role
      if (role === "user") {
        navigate("/");
      } else if (role === "shop") {
        navigate("/shopProfile/shop");
      }
      console.log("Data: ", response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: error.response.data.message,
      });
      console.error("An error occurred while sending the API request:", error);
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
          />
        </div>
        <div className="group-i">
          <input
            type={inputType}
            placeholder="Password (*)"
            onChange={(e) => handlePasswordChange(e.target.value)}
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
