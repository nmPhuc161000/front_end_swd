import React, { useEffect, useState } from "react";
import "./BookingConfirmation.css";
import {
  getBookingById,
  getServiceById,
  postCheckout,
} from "../../../../api/testApi";
import { format } from "date-fns";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const [bookingItem, setBookingItem] = useState(null);
  const [itemDetail, setItemDetail] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const token = localStorage.getItem("token");
  const bookingId = localStorage.getItem("bookingId");
  const serviceId = localStorage.getItem("serviceId");
  const navigation = useNavigate();
  const location = useLocation(); // Dùng để lấy query params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServiceById(serviceId);
        setItemDetail(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [serviceId]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getBookingById(bookingId, token);
        console.log(response.data.data);
        setBookingItem(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBooking();
  }, [bookingId, token]);

  useEffect(() => {
    if (bookingItem && bookingItem.bookingDate) {
      const bookingDate = new Date(bookingItem.bookingDate);
      if (!isNaN(bookingDate)) {
        setFormattedDateTime(format(bookingDate, "HH:mm dd/MM/yyyy"));
      } else {
        console.error("Invalid booking date format");
      }
    }
  }, [bookingItem]);

  console.log("status", paymentStatus);

  const handleCheckout = async () => {
    try {
      const response = await postCheckout(bookingId, token);
      console.log(response.data);
      // Kiểm tra nếu response.data có URL hợp lệ
      if (response.data && typeof response.data === "string") {
        // window.open(response.data, "_blank");
        window.open(response.data, "_self");
      } else {
        console.error("Response data does not contain a valid URL.");
      }
    } catch (error) {
      console.error("An error occurred while sending the API request:", error);
    }
  };

  return (
    <div className="booking-confirm">
      <div className="booking-confirm-container">
        <h1>
          Congratulations{" "}
          <span role="img" aria-label="celebration">
            🎉
          </span>
        </h1>
        <div className="booking-section">
          <h3>Your booking</h3>
          <div className="booking-header">
            {itemDetail && itemDetail.thumbNail && (
              <img src={itemDetail.thumbNail} alt="Hotel" />
            )}
            <div className="booking-info">
              {itemDetail && itemDetail.title && <h2>{itemDetail.title}</h2>}
              <p className="rating">⭐ 4.9 (122)</p>
            </div>
          </div>
          <div className="booking-detail">
            <h3>Booking detail</h3>
            <div>
              <p>Date</p>
              <p>{formattedDateTime || "Loading..."}</p>
            </div>
            <div>
              <p>Total</p>
              {itemDetail && itemDetail.price && <p>{itemDetail?.price} VNĐ</p>}
            </div>
            <div>
              <p>Payment method</p>
              <p>VNPay</p>
            </div>
          </div>
          <button
            className="explore-btn"
            type="submit"
            onClick={() => handleCheckout()}
          >
            Explore more stays
          </button>
        </div>
      </div>
    </div>
  );
}
