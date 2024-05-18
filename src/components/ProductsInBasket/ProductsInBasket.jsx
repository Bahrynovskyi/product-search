import React, { useState } from "react";
import "./ProductsInBasket.css";
import { IoClose } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const ProductsInBasket = ({
  productsInBasket,
  closeBasket,
  productsPriceInBasket,
  removeItemFromBasket,
}) => {
  return (
    <div className="products-in-basket">
      <button className="close-the-basket">
        <IoClose className="" onClick={closeBasket} />
      </button>
      <div className="product-items-in-basket">
        {productsInBasket.map((product, index) => (
          <div className="product-item-in-basket">
            <div className="product-item-in-basket-img">
              <img src={product.image} alt="product image"></img>
            </div>
            <p className="product-item-in-basket-name">
              {product.product_name}
            </p>
            <div className="product-item-in-basket-price">{product.price}$</div>
            <div
              className="remove-product-item-in-basket"
              onClick={() => removeItemFromBasket(index)}
            >
              <IoIosClose />
            </div>
          </div>
        ))}
      </div>
      <div className="total-price-in-basket">
        total price: <span>{productsPriceInBasket.toFixed(2)}$</span>
      </div>
    </div>
  );
};

export default ProductsInBasket;
