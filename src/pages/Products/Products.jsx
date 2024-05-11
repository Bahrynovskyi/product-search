import React, { useEffect } from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import NoProductsToShow from "../../components/NoProductsToShow/NoProductsToShow";
import { useState } from "react";

const Products = () => {
  // getting data from json
  const [data] = useGetData();

  // Created this obj categories for display buttons and change the focus
  const categoriesBtns = [
    { category: "all", isChecked: true },
    { category: "clothing", isChecked: false },
    { category: "beauty", isChecked: false },
    { category: "home goods", isChecked: false },
    { category: "toys", isChecked: false },
    { category: "electronics", isChecked: false },
  ];

  // Main obj state where all data about filtration leaves
  const options = {
    category: "",
    minPrice: null,
    maxPrice: null,
    sortingOrder: "",
    releaseYear: "",
  };

  const [productsToShow, setProductsToShow] = useState([...data]);

  const [filtrationOptions, setFiltrationOptions] = useState(options);

  const [searchInput, setSearchInput] = useState("");
  const [categoryBtnID, setCategoryBtnID] = useState(0);

  // Get array of years from release_date field from json
  const productYears = Array.from(
    new Set([...data.map((item) => item.release_date.slice(-4))])
  ).sort((a, b) => a - b);

  // Handlers

  const handleGetCategory = (id) => {
    setCategoryBtnID(id);
    setFiltrationOptions({
      ...filtrationOptions,
      category: categoriesBtns[id].category,
    });
  };

  const handleInputPriceFromChange = (e) => {
    setFiltrationOptions({ ...filtrationOptions, minPrice: +e.target.value });
  };

  const handleInputPriceToChange = (e) => {
    setFiltrationOptions({ ...filtrationOptions, maxPrice: +e.target.value });
  };

  const handleSelectSort = (e) => {
    setFiltrationOptions({ ...filtrationOptions, sortingOrder: e });
  };

  const handleSelectSortByYear = (year_value) => {
    setFiltrationOptions({ ...filtrationOptions, releaseYear: year_value });
  };

  const handleInput = (text) => {
    setSearchInput(text);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  const findText = () => {
    if (searchInput !== "") {
      const products = [...productsToShow].filter((item) =>
        item.product_name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setProductsToShow(products);
    }
  };

  const FilterProductsByPrice = () => {
    if (filtrationOptions.minPrice && filtrationOptions.maxPrice) {
      const filteredProducts = [...productsToShow].filter(
        (item) =>
          item.price >= filtrationOptions.minPrice &&
          item.price <= filtrationOptions.maxPrice
      );
      setProductsToShow(filteredProducts);
    }
    if (productsToShow.length === 0) {
      return -1;
    }
  };

  const sortProductsToShow = () => {
    switch (filtrationOptions.sortingOrder) {
      case "order-alphabet-a-z": {
        const sortedArray = [...productsToShow].sort((a, b) => {
          return a.product_name.toLowerCase() === b.product_name.toLowerCase()
            ? 0
            : a.product_name.toLowerCase() > b.product_name.toLowerCase()
            ? 1
            : -1;
        });
        setProductsToShow(sortedArray);
        break;
      }
      case "order-alphabet-z-a": {
        const sortedArray = [...productsToShow].sort((a, b) => {
          return a.product_name.toLowerCase() === b.product_name.toLowerCase()
            ? 0
            : a.product_name.toLowerCase() > b.product_name.toLowerCase()
            ? -1
            : 1;
        });
        setProductsToShow(sortedArray);
        break;
      }
      case "order-price-lower-higher": {
        const sortedArray = [...productsToShow].sort((a, b) => {
          return a.price === b.price ? 0 : a.price > b.price ? 1 : -1;
        });
        setProductsToShow(sortedArray);
        break;
      }
      case "order-price-higher-lower": {
        const sortedArray = [...productsToShow].sort((a, b) => {
          return a.price === b.price ? 0 : a.price > b.price ? -1 : 1;
        });
        setProductsToShow(sortedArray);
        break;
      }
    }
  };

  const filteringByYear = (year_value) => {
    const year = year_value.slice(-4);
    const products = [...productsToShow].filter((item) => {
      return item.release_date.slice(-4) === year;
    });
    setProductsToShow(products);
  };

  console.log(filtrationOptions);

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
          {categoriesBtns.map((item, index) => {
            if (categoryBtnID === index) {
              item.isChecked = true;
            } else {
              item.isChecked = false;
            }
            return (
              <button
                key={index + "" + item.category}
                className={
                  item.isChecked
                    ? `products-filtration__categories-btn products-filtration__categories-btn_checked`
                    : `products-filtration__categories-btn products-filtration__categories`
                }
                onClick={() => handleGetCategory(index)}
              >
                {item.category}
              </button>
            );
          })}
        </div>
        <div className="products-filtration__price">
          <p>Choose price:</p>
          <div className="products-filtration__price-inner">
            <input
              type="number"
              placeholder="Min price"
              name="filtration-price_from"
              value={filtrationOptions.minPrice}
              onChange={handleInputPriceFromChange}
            />
            <input
              type="number"
              placeholder="Max price"
              name="filtration-price_to"
              value={filtrationOptions.maxPrice}
              onChange={handleInputPriceToChange}
            />
          </div>
        </div>
        <div className="products-filtration__sort">
          <p>Sort by:</p>
          <select
            name="sort-products"
            onChange={(e) => handleSelectSort(e.target.value)}
          >
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

        <div className="products-filtration__sort-year">
          <p>Choose release date:</p>
          <select
            name="sort-products"
            onChange={(e) => handleSelectSortByYear(e.target.value)}
          >
            <option selected disabled="disabled" value="">
              Please choose a year of release
            </option>
            {productYears.map((item) => (
              <option value={`order-${item}`}>{item}</option>
            ))}
          </select>
        </div>
        <div className="products-filtration__buttons">
          <button>Clear All</button>
          <button>Go</button>
        </div>
      </div>
      <div className="products-items">
        {productsToShow.length === 0 ? (
          <NoProductsToShow />
        ) : (
          [...productsToShow].map((item) => (
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
