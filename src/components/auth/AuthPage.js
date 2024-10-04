import React, { useEffect } from "react";
import "./AuthPage.css";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

export default function AuthPage() {
  let rotatedeg = 0;

  useEffect(() => {
    const option = document.querySelectorAll(".changeType");
    const form = document.getElementById("form");
    const bgactive = document.getElementById("bg-active");

    option.forEach((val) => {
      val.addEventListener("click", function (event) {
        if(this.classList.contains('active')){return}
        form.classList.remove("login");
        form.classList.remove("register");
        form.classList.add(this.id);
        bgactive.style.left = this.offsetLeft + "px";
        option.forEach((item) => {
          item.classList.remove("active");
        });
        this.classList.add("active");
        rotatedeg = rotatedeg + 200;
        document.getElementById("rotate").style.transform =
          "translate(-50%) rotate(" + rotatedeg + "deg)";
      });
    });

    // Hàm dọn dẹp để xóa các lắng nghe sự kiện khi component bị unmount.
    return () => {
      option.forEach((val) => {
        val.removeEventListener("click", () => {});
      });
    };
  }, []); // Mảng dependency rỗng để chỉ chạy một lần sau lần render ban đầu.

  return (
    <div className="authPage">
      <div className="container">
        <div className="form login" id="form">
          <SignIn />
          <SignUp />
          <div className="form-rotate">
            <div id="rotate"></div>
          </div>
        </div>
        <div className="option">
          <div className="bg-active" id="bg-active"></div>
          <div className="changeType active" id="login">
            Login
          </div>
          <div className="changeType" id="register">
            Register
          </div>
        </div>
      </div>
    </div>
  );
}
