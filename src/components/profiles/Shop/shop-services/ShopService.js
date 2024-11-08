import React, { useEffect, useState } from "react";
import "./ShopService.css";
import CreateService from "./create-services/CreateService";
import { Link } from "react-router-dom";
import { getListServicesByUserId } from "../../../../api/testApi";

export default function ShopService() {
  const [itemData, setItemData] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const userId = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token");
  const full_name = localStorage.getItem("full_name")

  useEffect(() => {
    const serviceData = async () => {
      try {
        const response = await getListServicesByUserId(userId, token);
        setItemData(response.data.data);
        console.log("Data from API: ", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    serviceData();
  }, [isCreate]);

  const handleCreateArt = () => {
    setIsCreate((prev) => !prev);
  };
  return (
    <div className="shopUser">
      {/* hàm tạo ảnh và thêm thông tin */}
      <div className="content">
        <div className="commissions">
          <span>Pet Services</span>
        </div>

        <div className="container-fluid" style={{ height: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
              justifyContent: "center", // Để căn giữa
              width: "100%",
              height: "100%",
              margin: "0 auto", // Để thẻ div nằm giữa trang
            }}
          >
            <CreateService onCreate={handleCreateArt} />
            {itemData.map((item) => (
              <div key={item.id}>
                <Link
                  to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
                  style={{ color: "black" }}
                >
                  <div
                    className="cardShop"
                    style={{
                      height: "365px",
                      width: "auto",
                      boxShadow:
                        "3px 4px 2px 2px rgba(0, 0, 0, 0.1), 3px 6px 3px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div className="cardImg">
                      <img
                        src={item.thumbNail}
                        alt=""
                        style={{
                          height: "95%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="cardInfor">
                      <div className="cardName">
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {item.title}
                          </span>
                        </div>
                        <div>
                          By{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {full_name}
                          </span>
                        </div>
                      </div>
                      <div className="cardPrice">
                        <div>
                          <strong>{item.price}VNĐ</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
