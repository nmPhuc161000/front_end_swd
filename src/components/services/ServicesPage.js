import React, { useEffect, useState } from "react";
import "./ServicePage.css";
import { getListServices } from "../../api/testApi";
import { Page } from "../../custom/page/Page";

export default function ServicesPage() {
  const [itemServices, setItemServices] = useState(null);

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
  return (
    <div className="service-page">
      <div className="title">Services for dog</div>
      <Page items={itemServices} />
    </div>
  );
}
