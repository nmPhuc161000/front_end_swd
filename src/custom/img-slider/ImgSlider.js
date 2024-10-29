import React, { useEffect, useRef, useState } from "react";
import "./ImgSlider.css";

export default function ImgSlider() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const itemsRef = useRef([]);
  const dotsRef = useRef([]);
  const lengthItems = 4; // Thay đổi thành số lượng item - 1 nếu bạn thêm hoặc bớt item

  useEffect(() => {
    const list = listRef.current;
    const items = itemsRef.current;
    const dots = dotsRef.current;

    const updateSlider = () => {
      if (list) {
        const checkLeft = items[active].offsetLeft;
        list.style.left = -checkLeft + "px";
      }
      
      dots.forEach((dot, index) => {
        if (dot) {
          dot.classList.toggle("active", index === active);
        }
      });
    };

    updateSlider();

    const intervalId = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % (lengthItems + 1));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [active, lengthItems]);

  const nextSlide = () => {
    setActive((prevActive) => (prevActive + 1) % (lengthItems + 1));
  };

  const prevSlide = () => {
    setActive((prevActive) => (prevActive - 1 + (lengthItems + 1)) % (lengthItems + 1));
  };

  const setActiveDot = (index) => {
    setActive(index);
  };

  return (
    <div className="slider">
      <div className="list" ref={listRef}>
        {Array.from({ length: lengthItems + 1 }).map((_, index) => (
          <div className="item" key={index} ref={(el) => (itemsRef.current[index] = el)}>
            <img src={`/assets/img${index + 1}.jpg`} alt="" />
          </div>
        ))}
      </div>
      <div className="slider-buttons">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <ul className="dots">
        {Array.from({ length: lengthItems + 1 }).map((_, index) => (
          <li
            key={index}
            className={active === index ? "active" : ""}
            onClick={() => setActiveDot(index)}
            ref={(el) => (dotsRef.current[index] = el)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
