import React from "react";
import "./LayoutService.css";
import { fakeData } from "../../../../fakeData";
import { CardHome } from "../../../../custom/cardItem/CardItem";
import { Link } from "react-router-dom";

export default function LayoutServices() {
  return (
    <div className="layout-services">
      <div className="title-services">
        <Link>
          <h2>Service for cat</h2>
        </Link>
      </div>
      <div className="items-services">
        {fakeData.map((item, index) => (
          <Link to={`/detail/${item.id}`}>
            <CardHome key={index} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
