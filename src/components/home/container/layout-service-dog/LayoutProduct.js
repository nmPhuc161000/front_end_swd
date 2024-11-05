import React, { useEffect, useState } from "react";
import "./LayoutProduct.css";
import { CardHome } from "../../../../custom/cardItem/CardItem";
import { Link } from "react-router-dom";
import { getListServices } from "../../../../api/testApi";

export default function LayoutProduct() {
  const [itemDog, setItemDog] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getListServices();
        setItemDog(response.data.items);
        // console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);

  return (
    <div className="layout-product">
      <div className="title-product">
        <Link to={`/page-dog`}>
          <h2>Service for dogs</h2>
        </Link>
      </div>
      <div className="items-product">
        {itemDog &&
          itemDog
            .filter((item) => item.type === "Dog")
            .slice(0, 10)
            .map((item, index) => (
              <Link to={`/detail/${item.id}`}>
                <CardHome key={index} item={item} />
              </Link>
            ))}
      </div>
    </div>
  );
}
