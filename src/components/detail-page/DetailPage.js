import React, { useState, useEffect } from "react";
import "./DetailPage.css";
import { useParams } from "react-router-dom";
import MoreService from "./more-services/MoreService";
import { getServiceById } from "../../api/testApi";

export default function DetailPage() {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const moreData = itemDetail && itemDetail.createdByUser ? itemDetail.createdByUser : "";

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getServiceById(id);
        setItemDetail(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data(); // Gọi hàm data
  }, [id]);

  if (!itemDetail) {
    return <div>Item not found</div>; // Hiển thị thông báo nếu không tìm thấy item
  }

  return (
    <div className="detail-page">
      <div className="title">Detail Page</div>
      <div className="detail">
        <div className="detail-img">
          <img src={itemDetail.thumbNail} alt={itemDetail.name} />
        </div>
        <div className="detail-content">
          <h1 className="name">{itemDetail.title}</h1>
          <div className="price">{itemDetail.price} VNĐ</div>
          <div className="full-name">
            Provided by: {itemDetail.createdByUser?.fullName}
          </div>
          <div className="description">Mô tả: {itemDetail.description}</div>
          <div className="detail-buttons">
            <button>Booking now</button>
          </div>
        </div>
      </div>
      <div className="title">Similar services</div>
      <div className="more-services">
        <MoreService moreData={moreData} />
      </div>
    </div>
  );
}
