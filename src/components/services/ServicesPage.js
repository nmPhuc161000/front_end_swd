import React, { useEffect, useState } from "react";
import "./ServicePage.css";
import { Link } from "react-router-dom";
import { CardHome } from "../../custom/cardItem/CardItem";
import { getListServices } from "../../api/testApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ServicesPage() {
  const [itemServices, setItemServices] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  console.log("data", itemServices);

  // Tính toán các items cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemServices?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        setItemServices(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);
  // Xử lý khi chuyển trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div className="service-page">
      <div className="service-container">
        <h1 className="title">Our Services</h1>
        <div className="service-list">
          {currentItems &&
            currentItems.map((item, index) => (
              <Link to={`/detail/${item.id}`}>
                <CardHome key={index} item={item} />
              </Link>
            ))}
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(itemServices?.length / itemsPerPage)} // Số lượng trang
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
