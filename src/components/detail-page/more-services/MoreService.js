import React from 'react'
import "./MoreService.css"
import { CardHome } from '../../../custom/cardItem/CardItem'
import { Link } from 'react-router-dom'
import { fakeData } from '../../../fakeData'

export default function MoreService() {
  // Lấy mẫu ngẫu nhiên 8 phần tử từ fakeData
  const randomItems = fakeData
    .sort(() => Math.random() - 0.5) // Xáo trộn mảng
    .slice(0, 8); // Chọn ra 8 phần tử đầu

  return (
    <>
      {randomItems.map((item, index) => (
        <Link to={`/detail/${item.id}`} key={index}>
          <CardHome item={item} />
        </Link>
      ))}
    </>
  );
}
