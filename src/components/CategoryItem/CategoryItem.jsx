import "./CategoryItem.css";
const CategoryItem = ({ image, category, getCategoryItem, isChecked }) => {
  return (
    <div className="home-assortment__element" onClick={getCategoryItem}>
      <div
        className={
          isChecked
            ? `home-assortment__element__img home-assortment__chosen`
            : `home-assortment__element__img`
        }
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <p
        className={
          isChecked
            ? `home-assortment__element_text home-assortment_bg-pink`
            : `home-assortment__element_text home-assortment_bg-white`
        }
      >
        {category}
      </p>
    </div>
  );
};

export default CategoryItem;
