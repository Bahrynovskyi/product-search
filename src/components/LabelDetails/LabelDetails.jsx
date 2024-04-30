import { useState } from "react";
import "./LabelDetails.css";
import { IoClose } from "react-icons/io5";
import labels from "../../data/labels";

const LabelDetails = ({ labelId, setHideLabelBlock, hideLabelBlock }) => {
  const labelToShow = labels.find((item) => {
    return item.id === labelId;
  });

  return (
    <div
      className={
        hideLabelBlock
          ? `home-label-detailed__label show`
          : `home-label-detailed__label hide`
      }
    >
      <button className="home-label-detailed__button">
        <IoClose
          className="home-label-detailed__button__inner"
          onClick={() => setHideLabelBlock(false)}
        />
      </button>
      <h4 className="home-label-detailed__header">
        {labelToShow && labelToShow.header}
      </h4>
      <div className="home-label-detailed__image">
        <img src={labelToShow && labelToShow.image_big} alt="" />
      </div>
      <span>
        <p className="home-label-detailed__full_description">
          {labelToShow && labelToShow.full_description}
        </p>
      </span>
    </div>
  );
};

export default LabelDetails;
