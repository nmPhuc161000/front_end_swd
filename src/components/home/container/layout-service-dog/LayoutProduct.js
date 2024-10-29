import React from "react";
import "./LayoutProduct.css";
import { fakeData } from "../../../../fakeData";
import { CardHome } from "../../../../custom/cardItem/CardItem";
import { Link } from "react-router-dom";

export default function LayoutProduct() {
  return (
    <div className="layout-product">
      <div className="title-product">
      <Link to={`/page-dog`}>
          <h2>Service for dogs</h2>
        </Link>
      </div>
      <div className="items-product">
        {fakeData.slice(0, 10).map((item, index) => (
          <Link to={`/detail/${item.id}`}>
            <CardHome key={index} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
