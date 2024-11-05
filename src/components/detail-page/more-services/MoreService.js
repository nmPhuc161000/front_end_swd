import React, { useEffect, useState } from "react";
import "./MoreService.css";
import { CardHome } from "../../../custom/cardItem/CardItem";
import { Link } from "react-router-dom";
import { getListServicesByUserId } from "../../../api/testApi";

export default function MoreService({ moreData }) {
  const [moreItem, setMoreItem] = useState([]);
  const userId = moreData.id;
  const fullName = moreData.fullName;
  console.log(moreData);
  

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServicesByUserId(userId);
        const randomItems = Array.isArray(response.data.data)
          ? response.data.data.sort(() => Math.random() - 0.5).slice(0, 8)
          : []; // Nếu không phải mảng, trả về mảng rỗng
        setMoreItem(randomItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, [userId]);

  return (
    <>
      {Array.isArray(moreItem) &&
        moreItem.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id}>
            <CardHome item={item} fullName={fullName}/>
          </Link>
        ))}
    </>
  );
}
