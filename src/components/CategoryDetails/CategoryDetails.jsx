import "./CategoryDetails.css";
const CategoryDetails = ({
  amount_at_the_shop,
  amount_at_the_warehouse,
  average_price,
  main_inf,
  additional_inf,
}) => {
  return (
    <div className="home-assortment__details">
      <p className="home-assortment__details-block">
        <span className="home-assortment__details-tag">
          General information
        </span>
        <span className="home-assortment__details-text">{main_inf}</span>
      </p>
      <p className="home-assortment__details-block">
        <span className="home-assortment__details-tag">
          Additional information
        </span>
        <span className="home-assortment__details-text">{additional_inf}</span>
      </p>
      <p className="home-assortment__details-block">
        <span className="home-assortment__details-tag">At the warehouse</span>
        <span className="home-assortment__details-text">
          {amount_at_the_warehouse} items
        </span>
      </p>
      <p className="home-assortment__details-block">
        <span className="home-assortment__details-tag">At the shop</span>
        <span className="home-assortment__details-text">
          {amount_at_the_shop} items
        </span>
      </p>
      <p className="home-assortment__details-block">
        <span className="home-assortment__details-tag">Average price</span>
        <span className="home-assortment__details-text">{average_price} $</span>
      </p>
    </div>
  );
};

export default CategoryDetails;
