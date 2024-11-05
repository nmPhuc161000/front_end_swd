import React, { useEffect, useState } from "react";
import "./PageForDog.css";
import { Page } from "../../../custom/page/Page";
import { getListServices } from "../../../api/testApi";

export default function PageForDog() {
  const [itemDog, setItemDog] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        // Lọc dữ liệu để chỉ giữ các item có type là "Dog"
        const dogItems = response.data.items.filter(
          (item) => item.type === "Dog"
        );
        setItemDog(dogItems);
        // console.log(dogItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);
  return (
    <div className="page-dog">
      <div className="title">Services for dog</div>
      <Page items={itemDog} />
    </div>
  );
}
