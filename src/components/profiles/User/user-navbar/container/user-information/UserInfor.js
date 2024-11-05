import React from "react";
import "./UserInfor.css";

export default function UserInfor() {
  return (
    <div className="profile-box">
      <h2 className="title">Thông tin tài khoản</h2>
      <div className="profile-content">
        <div className="profile-image">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="avatar"
          />
          <button className="change-image">Change Image</button>
        </div>
        <form className="form">
          <div className="field-group">
            <label>Full Name</label>
            <input type="text" placeholder="Minh Phuc" className="input" />
          </div>
          <div className="field-group">
            <label>Username</label>
            <input type="text" placeholder="phucnm20" className="input" />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input"
            />
          </div>
          <div className="field-group">
            <label>Birthday</label>
            <input type="text" placeholder="06 Aug, 1990" className="input" />
          </div>
          <div className="field-group">
            <label>Address</label>
            <input type="text" placeholder="New York, USA" className="input" />
          </div>
          <div className="field-group">
            <label>Phone number</label>
            <input type="text" placeholder="033 888 232" className="input" />
          </div>
          <div className="field-group">
            <label>Gender</label>
            <select className="input">
              <option>Male</option>
              <option>FeMale</option>
            </select>
          </div>
          <div className="field-group">
            <label>About you</label>
            <textarea
              placeholder="Tell us about you..."
              className="textarea"
            ></textarea>
          </div>
          <button type="submit" className="update-button">
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
}
