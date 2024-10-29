import React from "react";
import "./PageForCat.css";
import { Page } from "../../../custom/page/Page";
import { fakeData } from "../../../fakeData";

export default function PageForCat() {
  const data = fakeData;
  console.log(data);

  return (
    <div className="page-cat">
      <div className="title">Services for cat</div>
      <Page items={data} />
    </div>
  );
}
