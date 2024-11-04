import React, { useState } from "react";
import "./Page.css";
import { CardHome } from "../cardItem/CardItem";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const Page = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Số lượng items mỗi trang

  // Tính toán các items cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý khi chuyển trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-card">
          {currentItems && currentItems.map((item, index) => (
            <Link key={index} to={`/detail/${item.id}`}>
              <CardHome item={item} />
            </Link>
          ))}
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(items?.length / itemsPerPage)} // Số lượng trang
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

