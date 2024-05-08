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
  const [inputPrice, setInputPrice] = useState({ from: "", to: "" });
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const categoriesList = Array.from(
    new Set([...data.map((item) => item.category)])
  );

  useEffect(() => {
    findText();
  }, [searchInput]);

  useEffect(() => {
    sortProductsToShow();
  }, [selectedSortOption]);

  const handleInput = (text) => {
    setSearchInput(text);
    findText();
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
  };

  const handleInputPriceFromChange = (e) => {
    setInputPrice({ ...inputPrice, from: +e.target.value });
  };

  const handleInputPriceToChange = (e) => {
    setInputPrice({ ...inputPrice, to: +e.target.value });
  };

  const FilterProductsByPrice = () => {
    if (inputPrice.from && inputPrice.to) {
      const filteredProducts = productsToShow.filter(
        (item) => item.price >= inputPrice.from && item.price <= inputPrice.to
      );
      setProductsToShow(filteredProducts);
    }
  };

  const handleChangeSort = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const sortProductsToShow = () => {
    console.log(selectedSortOption);
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
        <div className="products-filtration__price">
          <input
            type="number"
            placeholder="Min price"
            name="filtration-price_from"
            value={inputPrice.from}
            onChange={handleInputPriceFromChange}
          />
          <input
            type="number"
            placeholder="Max price"
            name="filtration-price_to"
            value={inputPrice.to}
            onChange={handleInputPriceToChange}
          />
          <button onClick={FilterProductsByPrice}>Go</button>
        </div>
        <div className="products-filtration__sort">
          <p>Sort by:</p>
          <select name="sort-products" onChange={handleChangeSort}>
            <option selected disabled="disabled" value="">
              Please choose an option
            </option>
            <option value="order-alphabet-a-z">Order by alphabet(A-Z)</option>
            <option value="order-alphabet-z-a">Order by alphabet(Z-A)</option>
            <option value="order-price-lower-higher">
              Order by price(lower-higher)
            </option>
            <option value="order-price-higher-lower">
              Order by price(higher-lower)
            </option>
          </select>
        </div>
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
