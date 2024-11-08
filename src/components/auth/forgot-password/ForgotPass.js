import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword, resetPassword } from "../../../api/testApi";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event);
  };

  const handleSave = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(email);

      Swal.fire({
        icon: "success",
        title: "Check your email!",
        html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Enter your OTP" >
        <input type="password" id="swal-input2" class="swal2-input" placeholder="Enter new password">
        `,
        showCancelButton: true,
        confirmButtonText: "Submit",
        preConfirm: () => {
          const otpCode = Swal.getPopup().querySelector("#swal-input1").value;
          const newPass = Swal.getPopup().querySelector("#swal-input2").value;
          if (!newPass || !otpCode) {
            Swal.showValidationMessage("Please enter both email and OTP");
          }
          return { token: otpCode, newPassword: newPass };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { token, newPassword } = result.value;

          try {
            const otpResponse = await resetPassword(token, newPassword);

            Swal.fire({
              icon: "success",
              title: "Reset password successful!",
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

      console.log("Data: ", response);
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error.message) {
        errorMessage = error.message;
      } else if (error.request && error.request.response) {
        try {
          const parsedResponse = JSON.parse(error.request.response);
          errorMessage = parsedResponse.message || errorMessage;
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
        }
      }

      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: errorMessage,
      });
      setIsLoading(false);
      console.error("An error occurred while sending the API request:", error);
    }
  };

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
        <div className="title">Reset your password!</div>
        <div className="group-i">
          <input
            type="text"
            placeholder="Email (*)"
            onChange={(e) => handleEmailChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="signUp">
          <button type="submit" onClick={() => handleSave()}>
            <span>{isLoading ? "Send OTP..." : "Send OTP"}</span>
          </button>
        </div>
        <div className="loginIn">
          <h6>Remember your password?</h6>
          <Link to={`/signin`} style={{ color: "#37AFE1" }}>
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
}
