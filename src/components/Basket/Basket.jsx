import React from "react";
import "./Basket.css";
import BasketImg from "../../images/shopping-cart.png";
const Basket = ({ itemsCount, openBasket }) => {
  return (
    <div className="basket-wrapper">
      <div className="basket-img" onClick={itemsCount > 0 ? openBasket : null}>
        <img src={BasketImg} alt="basket-img" />
        {itemsCount > 0 && (
          <span
            className={`${
              itemsCount >= 10
                ? `basket-amount basket-amount-more-than-ten-items `
                : `basket-amount`
            } `}
          >
            {itemsCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Basket;
