import React from "react";
import "./SliderElement.css";
const SliderElement = ({ header, image, text, moveLeft, moveRight }) => {
  return (
    <div className={`slider-item`}>
      <h2>{header}</h2>
      <div className={`slider-img`}>
        <img src={image} alt="" />
        <span className="slider-text-bg"></span>
        <span className="slider-text">{text}</span>
      </div>
    </div>
  );
};

export default SliderElement;
