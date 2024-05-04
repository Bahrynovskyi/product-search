import "./Product.css";
const Product = ({ id, name, price, category, image }) => {
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
      <button className="procut-btn">Buy</button>
    </div>
  );
};

export default Product;
