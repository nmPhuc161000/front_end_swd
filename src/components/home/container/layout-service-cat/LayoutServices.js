import React, { useEffect, useState } from "react";
import "./LayoutService.css";
import { fakeData } from "../../../../fakeData";
import { CardHome } from "../../../../custom/cardItem/CardItem";
import { Link } from "react-router-dom";
import urlApi from "../../../../api/configApi";
import axios from "axios";
import { getListServices } from "../../../../api/testApi";

export default function LayoutServices() {
  const [itemCat, setItemCat] = useState("");

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        setItemCat(response.data);
        console.log(response.data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);
  return (
    <div className="layout-services">
      <div className="title-services">
        <Link to={`/page-cat`}>
          <h2>Service for cat</h2>
        </Link>
      </div>
      <div className="items-services">
        {fakeData.slice(0, 10).map((item, index) => (
          <Link to={`/detail/${item.id}`}>
            <CardHome key={index} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
