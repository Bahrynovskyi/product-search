import React, { useState } from "react";
import "./ProductsInBasket.css";
import { IoClose } from "react-icons/io5";

const ProductsInBasket = ({
  productsInBasket,
  closeBasket,
  productsPriceInBasket,
}) => {
  console.log(productsInBasket);

  return (
    <div className="products-in-basket">
      <button className="close-the-basket">
        <IoClose className="" onClick={closeBasket} />
      </button>
      <div className="product-items-in-basket">
        {productsInBasket.map((product) => (
          <div className="product-item-in-basket">
            <div className="product-item-in-basket-img">
              <img src={product.image} alt="product image"></img>
            </div>
            <p className="product-item-in-basket-name">
              {product.product_name}
            </p>
            <div className="product-item-in-basket-price">{product.price}$</div>
          </div>
        ))}
      </div>
      <div className="total-price-in-basket">
        total price: <span>{productsPriceInBasket}$</span>
      </div>
    </div>
  );
};

export default ProductsInBasket;
