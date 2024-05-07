import React from "react";
import "./NoProductsToShow.css";
import AbsentImg from "../../images/sorry-baby-emoj.jpg";
const NoProductsToShow = () => {
  return (
    <div className="absent-product">
      <div className="absent-product-img">
        <img src={AbsentImg} alt="sorry-img" />
      </div>
      <p>
        Sorry! We can't find any product due to your query. Try to look for it
        again
      </p>
    </div>
  );
};

export default NoProductsToShow;
