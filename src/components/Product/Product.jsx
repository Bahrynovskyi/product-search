import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, price, category, image, addProductToBasket }) => {
  const navigate = useNavigate();
  const navigateToProductDetails = () => {
    navigate(`/products/product/${id}`);
  };

  return (
    <div className="product-wrapper">
      <div className="product-image">
        <img className="" src={image} alt="" />
      </div>
      <p className="product-name">{name}</p>
      <div className="product-inf">
        <span className="product-price">{price}$</span>
        <span className="product-category">{category}</span>
      </div>
      <button className="procut-btn-details" onClick={navigateToProductDetails}>
        Details
      </button>
      <button className="procut-btn-buy" onClick={addProductToBasket}>
        Buy
      </button>
    </div>
  );
};

export default Product;
