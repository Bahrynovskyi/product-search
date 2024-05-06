import React, { useEffect } from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import { useState } from "react";

const Products = () => {
  const [data] = useGetData();

  const [searchOptions, setSearchOptions] = useState({});
  const [productsToShow, setProductsToShow] = useState(data);
  const [searchInput, setSearchInput] = useState("");

  const categoriesList = Array.from(
    new Set([...productsToShow.map((item) => item.category)])
  );

  const handleInput = (text) => {
    setSearchInput(text);
    findText();
    console.log(productsToShow);
  };

  const findText = () => {
    const products = productsToShow.filter((item) =>
      item.product_name.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    setProductsToShow(products);
    if (searchInput === "") {
      setProductsToShow(data);
    }
  };

  useEffect(() => {
    findText();
  }, [searchInput]);

  return (
    <div className="products-wrapper">
      <div className="products-filtration">
        <div className="products-filtration__input">
          <input
            type="text"
            name="filtration-input"
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
        <div className="products-filtration__categories">
          {categoriesList &&
            categoriesList.map((item, index) => (
              <button
                key={index + "" + item}
                className="products-filtration__categories-btn"
              >
                {item}
              </button>
            ))}
        </div>
      </div>
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
