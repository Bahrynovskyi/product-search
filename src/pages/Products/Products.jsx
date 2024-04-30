import React from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";

const Products = () => {
  const [data] = useGetData();
  console.log(data);
  return (
    <div className="products-wrapper">
      <div className="products-items">
        {data.map((item) => (
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
