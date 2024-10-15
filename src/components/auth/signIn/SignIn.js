import React from "react";

export default function SignIn() {
  return (
    <div className="content-authPage">
      <h1>Login</h1>

      <div className="group">
        <input type="text" className="inputText" placeholder="" required />
        <label>Username</label>
      </div>

      <div className="group">
        <input type="password" className="inputText" placeholder="" required />
        <label>Password</label>
      </div>
      <button>login</button>
    </div>
  );
}
