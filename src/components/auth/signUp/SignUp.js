import React from "react";

export default function SignUp() {
  return (
    <div className="content-authPage">
      <h1 className="h1-signup">Register</h1>

      <div className="group">
        <input type="text" className="inputText" placeholder="" required />
        <label>Username</label>
      </div>

      <div className="group">
        <input type="password" className="inputText" placeholder="" required />
        <label>Password</label>
      </div>

      <div className="group">
        <input type="text" className="inputText" placeholder="" required />
        <label>Email</label>
      </div>
      <button
        style={{
          position: "unset",
          width: "100%",
        }}
      >
        Register
      </button>
    </div>
  );
}
