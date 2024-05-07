import React, { useEffect } from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import NoProductsToShow from "../../components/NoProductsToShow/NoProductsToShow";
import { useState } from "react";

const Products = () => {
  const [data] = useGetData();

  const [searchOptions, setSearchOptions] = useState({});
  const [productsToShow, setProductsToShow] = useState(data);
  const [searchInput, setSearchInput] = useState("");

  const categoriesList = Array.from(
    new Set([...data.map((item) => item.category)])
  );

  useEffect(() => {
    findText();
  }, [searchInput]);

  const handleInput = (text) => {
    setSearchInput(text);
    findText();
    console.log(productsToShow);
  };

  const handleClearInput = () => {
    setSearchInput("");
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

  const handleGetCategory = (category) => {
    const products = data.filter((item) => item.category === category);
    setProductsToShow(products);
    console.log(category);
  };

  return (
    <div className="products-wrapper">
      <div className="products-filtration">
        <div className="products-filtration__input">
          <input
            type="text"
            name="filtration-input"
            onChange={(e) => handleInput(e.target.value)}
            value={searchInput}
          />
          {searchInput && (
            <button
              className="products-filtration__input-clear"
              onClick={handleClearInput}
            >
              clear
            </button>
          )}
        </div>
        <div className="products-filtration__categories">
          {categoriesList.map((item, index) => (
            <button
              key={index + "" + item}
              className="products-filtration__categories-btn"
              onClick={() => handleGetCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="products-filtration__price"></div>
      </div>
      <div className="products-items">
        {productsToShow.length === 0 ? (
          <NoProductsToShow />
        ) : (
          productsToShow.map((item) => (
            <Product
              key={item.product_id}
              name={item.product_name}
              price={item.price}
              category={item.category}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
