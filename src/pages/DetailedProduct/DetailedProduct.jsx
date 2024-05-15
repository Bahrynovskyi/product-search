import React from "react";
import "./DetailedProduct.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import arrowLeft from "../../images/arrow-84-64.png";

const DetailedProduct = () => {
  // getting data from json
  const [data] = useGetData();

  // Getting id for displaying product details
  const { id } = useParams();

  const productItem = data[id - 1];
  console.log(productItem);
  return (
    <div className="detailed-product__wrapper">
      <div className="detailed-product-btn-back">
        <Link to="/products">
          <img src={arrowLeft} alt="arrow-back" />
        </Link>
      </div>
      <div className="detailed-product">
        <h2 className="detailed-product__name">{productItem.product_name}</h2>
        <div className="detailed-product__box">
          <div className="detailed-product__box-image">
            <img src={productItem.image} />
          </div>
          <div className="detailed-product__box-inf">
            <div className="detailed-product__box-inf__slot detailed-product__box-inf__description">
              <span>Description</span>
              <span>{productItem.description}</span>
            </div>
            <div className="detailed-product__box-inf__slot detailed-product__box-inf__description">
              <span>Brand</span>
              <span>{productItem.brand}</span>
            </div>
            <div className="detailed-product__box-inf__slot detailed-product__box-inf__description">
              <span>Price</span>
              <span>{productItem.price}$</span>
            </div>
            <div className="detailed-product__box-inf__slot detailed-product__box-inf__description">
              <span>Release Date</span>
              <span>{productItem.release_date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
