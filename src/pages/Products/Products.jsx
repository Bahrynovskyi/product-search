import React from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import { useState } from "react";

const Products = () => {
  const [data] = useGetData();

  const [searchOptions, setSearchOptions] = useState({});
  const [productsToShow, setProductsToShow] = useState(data);

  return (
    <div className="products-wrapper">
      <div className="products-filtration">adsda</div>
      <div className="products-items">
        {productsToShow.map((item) => (
          <Product
            key={item.product_id}
            name={item.product_name}
            price={item.price}
            category={item.category}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
