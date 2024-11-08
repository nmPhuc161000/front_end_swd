import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlApi from "../../../api/configApi";
import Swal from "sweetalert2";
import { signUpShop, verifyEmail } from "../../../api/testApi";

export default function SignUpShop() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [taxNum, setTaxNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardProvider, setCardProvider] = useState("Visa");
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

  const handleTaxNumChange = (value) => {
    setTaxNum(value);
  };

  const handleCardNameChange = (value) => {
    setCardName(value);
  };

  const handleCardNumChange = (e) => {
    setCardNum(e.target.value);
  };

  const handleCardProviderChange = (event) => {
    setCardProvider(event.target.value);
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNo ||
      !taxNum ||
      !cardName ||
      !cardNum ||
      !cardProvider
    ) {
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
      TaxNumber: taxNum,
      CardName: cardName,
      CardNumber: cardNum,
      CardProvider: cardProvider,
    };

    try {
      const response = await signUpShop(data);

      if (response && response.data) {
        // Kiểm tra response và response.data
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          input: "text", // Ô input để nhập OTP
          inputPlaceholder: "Enter your OTP",
          inputAttributes: {
            maxlength: 6,
            autocapitalize: "off",
            autocorrect: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Submit OTP",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const otp = result.value;

            const dataOTP = {
              otp: otp,
              email: email
            }

            try {
              const otpResponse = await verifyEmail(dataOTP);

              if (otpResponse && otpResponse.data) {
                // Kiểm tra otpResponse và otpResponse.data
                Swal.fire({
                  icon: "success",
                  title: "OTP Verified!",
                  text: otpResponse.data.message,
                });
                navigate("/signin");
              }
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unexpected response format from the server.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Please check your input!!!",
        text: error.response?.data?.message || "An error occurred",
      });
      console.error("Error sending API request:", error);
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
      <div className="regisPage">
        <div className="register">
          <div className="logoRegis">
            <Link to={`/`}>
              <img src="/assets/logo2-Photoroom.png" alt="Logo" />
            </Link>
          </div>
          <div className="title">Register for shop Now!</div>
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
                type="phone"
                placeholder="Phone number (*)"
                onChange={handlePhoneNoChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type="text"
                placeholder="Tax Number (*)"
                min={0}
                onChange={(e) => handleTaxNumChange(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type="text"
                placeholder="Card Name (*)"
                onChange={(e) => handleCardNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              <input
                type="number"
                min={0}
                placeholder="Card Number (*)"
                onChange={handleCardNumChange}
                required
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="group-i">
              {/* <input
                type="text"
                placeholder="Card Provider (*)"
                onChange={(e) => handleCardProvider(e.target.value)}
              /> */}
              <select
                style={{ width: "490px" }}
                onChange={handleCardProviderChange}
                value={cardProvider}
              >
                <option value="" disabled>
                  Choose Card Provider
                </option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">Master card</option>
                <option value="AmericanExpress">American Express</option>
                <option value="Discovery">Discovery</option>
              </select>
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
            <h6>Back to register account for user?</h6>
            <Link to={`/signUpUser`} style={{ color: "#37AFE1" }}>
              Register user
            </Link>
          </div>
          <div className="loginIn">
            <h6>Are you have account?</h6>
            <Link to={`/signin`} style={{ color: "#37AFE1" }}>
              Login now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
