import React, { useEffect } from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import NoProductsToShow from "../../components/NoProductsToShow/NoProductsToShow";
import { useState } from "react";

const Products = () => {
  const [data] = useGetData();

  const categoriesBtns = [
    { category: "all", isChecked: true },
    { category: "clothing", isChecked: false },
    { category: "beauty", isChecked: false },
    { category: "home goods", isChecked: false },
    { category: "toys", isChecked: false },
    { category: "electronics", isChecked: false },
  ];

  const options = {
    category: "",
    minPrice: "",
    maxPrice: "",
    sortingOrder: "",
    releaseYear: "",
  };

  const [productsToShow, setProductsToShow] = useState([...data]);
  const [filtrationOptions, setFiltrationOptions] = useState(options);

  const [searchInput, setSearchInput] = useState("");
  const [inputPrice, setInputPrice] = useState({ from: "", to: "" });
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [categoryBtnChecked, setCategoryBtnChecked] = useState("all");

  useEffect(() => {
    findText();
  }, [searchInput]);

  useEffect(() => {
    sortProductsToShow();
  }, [selectedSortOption]);

  const productYears = Array.from(
    new Set([...data.map((item) => item.release_date.slice(-4))])
  ).sort((a, b) => a - b);

  const handleInput = (text) => {
    setSearchInput(text);
    findText();
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

  const handleGetCategory = (categoryName) => {
    setCategoryBtnChecked(categoryName);
  };

  const handleInputPriceFromChange = (e) => {
    setInputPrice({ ...inputPrice, from: +e.target.value });
  };

  const handleInputPriceToChange = (e) => {
    setInputPrice({ ...inputPrice, to: +e.target.value });
  };

  const FilterProductsByPrice = () => {
    if (inputPrice.from && inputPrice.to) {
      const filteredProducts = [...productsToShow].filter(
        (item) => item.price >= inputPrice.from && item.price <= inputPrice.to
      );
      setProductsToShow(filteredProducts);
    }
    if (productsToShow.length === 0) {
      return -1;
    }
  };

  const handleSelectSort = (e) => {
    setSelectedSortOption(e);
  };

  const sortProductsToShow = () => {
    switch (selectedSortOption) {
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

  const handleSelectSortByYear = (year_value) => {
    const year = year_value.slice(-4);
    const products = [...productsToShow].filter((item) => {
      return item.release_date.slice(-4) === year;
    });
    setProductsToShow(products);
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
          {categoriesBtns.map((item, index) => (
            <button
              key={index + "" + item.category}
              className={
                item.isChecked
                  ? `products-filtration__categories-btn products-filtration__categories-btn_checked`
                  : `products-filtration__categories-btn products-filtration__categories`
              }
              onClick={() => handleGetCategory(item.category)}
            >
              {item.category}
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
