import React, { useEffect, useState } from "react";
import discount_data from "../../data/discount_data";
import "./About.css";

const About = () => {
  const [discountInf, setDiscountInf] = useState({
    discount_bonus: 1.1,
    discount_percentage: 25,
  });
  const [discountCard, setDiscountCard] = useState(discount_data.card);
  const [discountType, setDiscountType] = useState(discount_data.type);
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const checkTheCard = (id) => {
    if (id.length === 3) {
      setDiscountCard(
        discountCard.map((item) => {
          if (item.id === id) {
            item.isChecked = true;
            setDiscountInf((obj) => ({
              ...obj,
              discount_bonus: item.discount_bonus,
            }));
          } else {
            item.isChecked = false;
          }
          return item;
        })
      );
    }

    if (id.length === 5) {
      setDiscountType(
        discountType.map((item) => {
          if (item.id === id) {
            item.isChecked = true;
            setDiscountInf((obj) => ({
              ...obj,
              discount_percentage: item.discount_percentage,
            }));
          } else {
            item.isChecked = false;
          }
          return item;
        })
      );
    }
  };

  const handleChangePurchasePrice = (e) => {
    setPurchasePrice(e.target.value);
  };

  useEffect(() => {
    reckonDiscount();
  }, [discountCard, discountType, discount, purchasePrice]);

  const reckonDiscount = () => {
    setDiscount(
      (discountInf.discount_bonus * discountInf.discount_percentage).toFixed()
    );
    if (purchasePrice.length > 6) setPurchasePrice(999999);
    setTotalAmount(
      (purchasePrice - (purchasePrice / 100) * discount).toFixed()
    );
  };

  return (
    <main className="about-wrapper">
      <section className="about-reasons">
        <h2>What do we offer</h2>
        <ol className="about-reasons-list">
          <li className="about-reasons-list__item">
            <span>1</span>
            <p>
              Our platform offers a comprehensive search functionality that
              allows users to quickly and easily find products that meet their
              specific criteria.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>2</span>
            <p>
              With advanced algorithms, we ensure that users receive accurate
              and relevant search results, saving them time and frustration.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>3</span>
            <p>
              Our intuitive interface makes the shopping experience seamless and
              enjoyable for users of all ages and technical backgrounds.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>4</span>
            <p>
              Detailed Product Information: We provide detailed product pages
              with all the information users need to make informed purchasing
              decisions, including specifications, reviews, and more.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>5</span>
            <p>
              Integrated shopping links allow users to compare prices from
              multiple retailers, ensuring they get the best deal on their
              chosen product.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>6</span>
            <p>
              We prioritize user security by offering secure payment options and
              guaranteeing hassle-free returns, giving users peace of mind when
              shopping with us.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>7</span>
            <p>
              We are committed to continuously improving our platform based on
              user feedback and technological advancements, ensuring that users
              always have access to the latest features and innovations.
            </p>
          </li>
          <li className="about-reasons-list__item">
            <span>8</span>
            <p>
              Our dedicated customer service team is available to assist users
              with any questions or concerns they may have, providing
              personalized support every step of the way.
            </p>
          </li>
        </ol>
      </section>
      <section className="about-calculator">
        <h2>Calculate your discount</h2>
        <p>Choose your card:</p>
        <div className="about-calculator__cards">
          {discountCard.map((item) => (
            <div
              className="about-calculator__card"
              key={item.id}
              onClick={() => checkTheCard(item.id)}
            >
              <img src={item.img} alt="" height="100px" width="200px" />
              {item.isChecked && (
                <img
                  className="about-tick-img"
                  src="../../images/tick.png"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
        <p>Choose your discount type:</p>
        <div className="about-calculator__discount-types">
          {discountType.map((item) => (
            <div
              className={`about-calculator__discount-type discount-type__${item.name}`}
              key={item.id}
              onClick={() => checkTheCard(item.id)}
            >
              <h3>{item.name}</h3>
              <p className="about-calculator__discount-type__percentage">
                <span>{item.discount_percentage} %</span>
              </p>
              {item.isChecked && (
                <img
                  className="about-tick-img"
                  src="../../images/tick.png"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
        <div className="about-calculator__reckon-price">
          <div className="about-calculator__reckon-price-amount">
            <label>
              order amount:
              <input
                type="number"
                value={purchasePrice}
                onChange={handleChangePurchasePrice}
              />
            </label>
          </div>
          {discount && (
            <div className="about-calculator__reckon-price-discount">
              <p>discount: </p>
              <span>{discount} % </span>
            </div>
          )}
          {totalAmount && (
            <div className="about-calculator__reckon-price-total">
              <p>Total price: </p>
              <span>{totalAmount} $</span>
            </div>
          )}
        </div>
      </section>
      <section className="about-description"></section>
    </main>
  );
};

export default About;
