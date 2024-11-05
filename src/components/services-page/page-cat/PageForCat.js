import React, { useEffect, useState } from "react";
import "./PageForCat.css";
import { Page } from "../../../custom/page/Page";
import { getListServices } from "../../../api/testApi";

export default function PageForCat() {
  const [itemCat, setItemCat] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        // Lọc dữ liệu để chỉ giữ các item có type là "Cat"
        const catItems = response.data.items.filter(
          (item) => item.type === "Cat"
        );
        setItemCat(catItems);
        // console.log(catItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);

  return (
    <div className="page-cat">
      <div className="title">Services for cat</div>
      <Page items={itemCat} />
    </div>
  );
}
