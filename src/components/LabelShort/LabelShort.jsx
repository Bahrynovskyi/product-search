import "./LabelShort.css";
const LabelShort = ({ id, getLabelId, header, image, short_description }) => {
  return (
    <div className="home-labels__label">
      <div className="home-labels__label-img">
        <img className="home-labels__label__image" src={image} alt="" />
      </div>
      <span>
        <h4 className="home-labels__label__header">{header}</h4>
        <p className="home-labels__label__short_description">
          {short_description}
        </p>
        <button
          className="home-labels__label__button"
          onClick={() => {
            getLabelId(id);
          }}
        >
          Read more &rarr;
        </button>
      </span>
    </div>
  );
};

export default LabelShort;
