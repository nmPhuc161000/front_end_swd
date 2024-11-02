import React, { useEffect, useState } from "react";
import "./PageForDog.css";
import { fakeData } from "../../../fakeData";
import { Page } from "../../../custom/page/Page";
import axios from "axios";
import urlApi from "../../../api/configApi";
import { getListServices } from "../../../api/testApi";

export default function PageForDog() {
  const data = fakeData;
  console.log(data);

  const [itemDog, setItemDog] = useState("");

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        setItemDog(response.data);
        console.log(response.data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);
  return (
    <div className="page-dog">
      <div className="title">Services for dog</div>
      <Page items={data} />
    </div>
  );
}
