import React from "react";
import "./PageForDog.css"
import { fakeData } from "../../../fakeData";
import { Page } from "../../../custom/page/Page";

export default function PageForDog() {
  const data = fakeData;
  console.log(data);
  return (
    <div className="page-dog">
      <div className="title">Services for dog</div>
      <Page items={data} />
    </div>
  );
}
