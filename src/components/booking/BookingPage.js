import React, { useEffect, useState } from "react";
import "./BookingPage.css";
import { getServiceById, postBooking } from "../../api/testApi";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BookingPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State cho phương thức thanh toán
  const [itemDetail, setItemDetail] = useState(null);
  const token = localStorage.getItem("token");
  const serviceId = localStorage.getItem("serviceId");
  const navigate = useNavigate();

  const handleFullName = (event) => {
    setFullName(event);
  };

  const handlePhone = (event) => {
    setPhone(event);
  };

  const handleBookingDate = (event) => {
    setBookingDate(event);
  };

  const handleSelectOption = (option) => {
    const selectedOption = option.target.value;
    setSelectedOption(selectedOption); // Cập nhật phương thức thanh toán
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getServiceById(serviceId);
        setItemDetail(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, [serviceId]);

  const handleVNPayClick = async () => {
    const data = {
      ServiceId: serviceId,
      FullName: fullName,
      PhoneNumber: phone,
      BookingDate: bookingDate,
      OptionPay: selectedOption
  };
   // Sử dụng selectedOption
    console.log("formData: ", data);
    
    try {
      const response = await postBooking(data, token);
      console.log("data: ", response?.data?.data?.id);
      localStorage.setItem("bookingId", response?.data?.data?.id);
      if(response?.data?.data?.optionPay === "PayByWalletCard") {
        navigate("/checkout");
      } else if(response?.data?.data?.optionPay === "CashPayment") {
        navigate(`/cash-payment`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-left">
        <h2>Confirm and booking</h2>

        <section className="booking-method">
          <form className="credit-card-form">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => handleFullName(e.target.value)}
            />

            <label>Phone number</label>
            <input
              type="text"
              placeholder="Phone number"
              onChange={(e) => handlePhone(e.target.value)}
            />

            <label>Booking date</label>
            <input
              type="text"
              placeholder="Ex: 2024-08-11 13:00"
              onChange={(e) => handleBookingDate(e.target.value)}
            />

            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ margin: "10px 0 5px 0", width: "85%" }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Option payment *
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedOption}
                onChange={handleSelectOption}
                label="Option payment *"
                style={{ borderRadius: "10px" }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 250, // Đặt giới hạn chiều cao tại đây
                    },
                  },
                }}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"PayByWalletCard"}>VNPay</MenuItem>
                <MenuItem value={"CashPayment"}>Cash payment</MenuItem>
              </Select>
            </FormControl>

            <button
              type="button"
              className="confirm-button"
              onClick={handleVNPayClick}
            >
              Confirm and book
            </button>
          </form>
        </section>
      </div>

      <div className="booking-right">
        <div className="room-details">
          <img src={itemDetail?.thumbNail} alt="Room Image" />
          <h4>{itemDetail?.title}</h4>
        </div>

        <div className="price-details">
          <p>
            Total: <strong>{itemDetail?.price}VNĐ</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
