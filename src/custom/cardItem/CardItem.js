import React from 'react'
import "./CardItem.css";
export const CardHome = ({ item, fullName }) => {

  return (
    <div className="cardHome">
      <div className="cardImg" style={{ height: "75%", width: "100%" }}>
        <img src={item.thumbNail} style={{ height: "100%", width: "100%" }} alt=''/>
      </div>
      <div className="cardInfor">
        <div className="cardName">
          <div>
            <strong>{item.title}</strong>
          </div>
          <div>Shop <strong>{item.createdByUser?.fullName || fullName}</strong></div>
        </div>
        <div className="cardPrice">
          <div>
            <strong>{item.price}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
