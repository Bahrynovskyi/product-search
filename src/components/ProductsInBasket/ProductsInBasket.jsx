import React from "react";
import "./ProductsInBasket.css";
import { IoClose } from "react-icons/io5";

const ProductsInBasket = ({ productsInBasket, closeBasket }) => {
  console.log(productsInBasket);
  return (
    <div className="products-in-basket">
      <button className="close-the-basket">
        <IoClose className="" onClick={closeBasket} />
      </button>
      {productsInBasket.map((product) => (
        <div>{product.product_name}</div>
      ))}
    </div>
  );
};

export default ProductsInBasket;
