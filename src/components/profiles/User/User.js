import React from 'react';
import './User.css';

export default function User() {
  return (
    <div className="profile-container">
      <div className="tabs">
        <button className="tab active-tab">Thông tin tài khoản</button>
        <button className="tab">Save lists</button>
        <button className="tab">Thay đổi mật khẩu</button>
        <button className="tab">Thông tin thanh toán</button>
      </div>
      <div className="profile-box">
        <h2 className="title">Thông tin tài khoản</h2>
        <div className="profile-content">
          <div className="profile-image">
            <img src="https://via.placeholder.com/100" alt="Avatar" className="avatar" />
            <button className="change-image">Change Image</button>
          </div>
          <form className="form">
            <div className="field-group">
              <label>Name</label>
              <input type="text" placeholder="Eden Tuan" className="input" />
            </div>
            <div className="field-group">
              <label>Username</label>
              <input type="text" placeholder="@eden_tuan" className="input" />
            </div>
            <div className="field-group">
              <label>Email</label>
              <input type="email" placeholder="example@email.com" className="input" />
            </div>
            <div className="field-group">
              <label>Ngày sinh</label>
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
              <label>Giới tính</label>
              <select className="input">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
            <div className="field-group">
              <label>About you</label>
              <textarea placeholder="Tell us about you..." className="textarea"></textarea>
            </div>
            <button type="submit" className="update-button">Update Info</button>
          </form>
        </div>
      </div>
    </div>
  );
}