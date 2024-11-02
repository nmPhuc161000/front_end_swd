import React, { useEffect, useState } from "react";
import "./PageForCat.css";
import { Page } from "../../../custom/page/Page";
import { fakeData } from "../../../fakeData";
import urlApi from "../../../api/configApi";
import axios from "axios";
import { getListServices } from "../../../api/testApi";

export default function PageForCat() {
  const data = fakeData;
  console.log(data);

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
    <div className="page-cat">
      <div className="title">Services for cat</div>
      <Page items={data} />
    </div>
  );
}
