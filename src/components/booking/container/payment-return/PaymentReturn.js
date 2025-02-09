import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentReturn() {
  const navigate = useNavigate();
  return (
    <div className="booking-confirm">
      <div className="booking-confirm-container">
        <div className="payment-success">
          <h1>Thanh toán thành công 🎉</h1>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <button
            className="explore-btn"
            onClick={() => navigate("/")} // Điều hướng về trang chủ
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
