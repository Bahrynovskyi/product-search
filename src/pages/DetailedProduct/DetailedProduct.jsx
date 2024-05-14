import React from "react";
import "./DetailedProduct.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";

const DetailedProduct = () => {
  // getting data from json
  const [data] = useGetData();

  // Getting id for displaying product details
  const { id } = useParams();

  const item = data[id - 1];
  console.log(item);
  return (
    <div className="detailed-product__wrapper">
      <div className="detailed-product-btn-back">
        <Link to="/products">back</Link>
      </div>
      <div className="detailed-product">
        <div className="id">{id}</div> DetailedProduct
      </div>
    </div>
  );
};

export default DetailedProduct;
