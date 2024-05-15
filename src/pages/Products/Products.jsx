import React, { useEffect } from "react";
import "./Products.css";
import useGetData from "../../hooks/useGetData";
import Product from "../../components/Product/Product";
import NoProductsToShow from "../../components/NoProductsToShow/NoProductsToShow";
import Basket from "../../components/Basket/Basket";
import ProductsInBasket from "../../components/ProductsInBasket/ProductsInBasket";
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

  const [productsToShow, setProductsToShow] = useState([...data]);
  const [categoryBtnID, setCategoryBtnID] = useState(0);

  // State with filtration settings
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  // State that concerns basket
  const [productsInBasket, setProductsInBasket] = useState([]);
  const [showProductsInBasket, setShowProductsInBasket] = useState(false);

  // Get array of years from release_date field from json
  const productYears = Array.from(
    new Set([...data.map((item) => item.release_date.slice(-4))])
  ).sort((a, b) => a - b);

  useEffect(() => {
    findText();
  }, [searchInput]);

  // Handlers
  const handleInput = (text) => {
    setSearchInput(text);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  const handleGetCategory = (id) => {
    setCategoryBtnID(id);
    setCategory(categoriesBtns[id].category);
  };

  const handleInputPriceFromChange = (e) => {
    setMinPrice(+e);
  };

  const handleInputPriceToChange = (e) => {
    setMaxPrice(+e);
  };

  const handleSelectSort = (e) => {
    setSortingOrder(e);
  };

  const handleSelectSortByYear = (year_value) => {
    setReleaseYear(year_value);
  };

  // Functions that filter products
  const findText = () => {
    if (searchInput !== "") {
      const products = [...productsToShow].filter((item) =>
        item.product_name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setProductsToShow([...products]);
    }
  };

  const filterProductsByCategory = (array) => {
    if (category === "all") return array;
    else return array.filter((item) => item.category === category);
  };

  const filterProductsByPrice = (array) => {
    if (minPrice && maxPrice && maxPrice >= minPrice && minPrice >= 0) {
      return array.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    } else return array;
  };

  const filterProductsBySort = (array) => {
    if (sortingOrder) {
      switch (sortingOrder) {
        case "order-alphabet-a-z": {
          return array.sort((a, b) => {
            return a.product_name.toLowerCase() === b.product_name.toLowerCase()
              ? 0
              : a.product_name.toLowerCase() > b.product_name.toLowerCase()
              ? 1
              : -1;
          });
        }
        case "order-alphabet-z-a": {
          return array.sort((a, b) => {
            return a.product_name.toLowerCase() === b.product_name.toLowerCase()
              ? 0
              : a.product_name.toLowerCase() > b.product_name.toLowerCase()
              ? -1
              : 1;
          });
        }
        case "order-price-lower-higher": {
          return array.sort((a, b) => {
            return a.price === b.price ? 0 : a.price > b.price ? 1 : -1;
          });
        }
        case "order-price-higher-lower": {
          return array.sort((a, b) => {
            return a.price === b.price ? 0 : a.price > b.price ? -1 : 1;
          });
        }
      }
    } else return array;
  };

  const filterProductsByYear = (array) => {
    if (releaseYear) {
      return array.filter((item) => {
        return item.release_date.slice(-4) === releaseYear;
      });
    } else return array;
  };

  const clearFiltration = () => {
    setProductsToShow([...data]);
    setSearchInput("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortingOrder("");
    setReleaseYear("");
    setCategoryBtnID(0);
  };

  const filterProducts = () => {
    setProductsToShow(
      filterProductsByYear(
        filterProductsBySort(
          filterProductsByPrice(filterProductsByCategory([...productsToShow]))
        )
      )
    );
  };

  // Functions that works with basket

  const openBasket = () => {
    setShowProductsInBasket(true);
  };

  const closeBasket = () => {
    setShowProductsInBasket(false);
  };

  const addProductToBasket = (id) => {
    console.log(id);
    setProductsInBasket((prev) => [...prev, data[id]]);
  };

  return (
    <div className="products-wrapper">
      <Basket itemsCount={productsInBasket.length} openBasket={openBasket} />

      {showProductsInBasket && (
        <ProductsInBasket
          closeBasket={closeBasket}
          productsInBasket={productsInBasket}
        />
      )}
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
              value={minPrice}
              onChange={(e) => handleInputPriceFromChange(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max price"
              name="filtration-price_to"
              value={maxPrice}
              onChange={(e) => handleInputPriceToChange(e.target.value)}
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
              <option value={`${item}`}>{item}</option>
            ))}
          </select>
        </div>
        <div className="products-filtration__buttons">
          <button onClick={clearFiltration}>Clear All</button>
          <button onClick={filterProducts}>Go</button>
        </div>
      </div>
      <div className="products-items">
        {productsToShow.length === 0 || !productsToShow ? (
          <NoProductsToShow />
        ) : (
          [...productsToShow].map((item) => (
            <Product
              key={item.product_id}
              id={item.product_id}
              name={item.product_name}
              price={item.price}
              category={item.category}
              image={item.image}
              addProductToBasket={() => addProductToBasket(item.product_id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
