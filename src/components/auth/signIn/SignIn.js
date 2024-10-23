import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import urlApi from "../../../api/configApi";

export default function SignIn() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleUsernameChange = (event) => {
  //   setUsername(event);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event);
  // };

  // const navigate = useNavigate();

  // const handleSave = async () => {
  //   const data = {
  //     username: username,
  //     password: password,
  //   };

  //   try {
  //     const response = await axios.post(`${urlApi}/auth/login`, data, {
  //       header: {
  //         "Content-Type": `application/json,  text/plain, */*`,
  //           Accept: "*/*",
  //       },
  //     });

  //     if (response) {
  //       alert("Login successful!");
  //       navigate("/");
  //     }

  //     const { newToken } = response.data.token;
  //     localStorage.setItem("token", newToken);

  //     console.log("Data: ", response);
  //   } catch (error) {
  //     console.error("An error occurred while sending the API request:", error);
  //   }
  // };

  return (
    <div className="content-authPage">
      <h1>Login</h1>

      <div className="group">
        <input
          type="text"
          className="inputText"
          placeholder=""
          required
          // onChange={(e) => handleUsernameChange(e.target.value)}
        />
        <label>Username</label>
      </div>

      <div className="group">
        <input
          type="password"
          className="inputText"
          placeholder=""
          required
          // onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <label>Password</label>
      </div>
      <button
      // onClick={() => handleSave()}
      >
        login
      </button>
    </div>
  );
}
