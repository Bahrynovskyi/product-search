import React from "react";
import { useState } from "react";
import "./Home.css";
import categories from "../../data/categories";
import labels from "../../data/labels";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import CategoryDetails from "../../components/CategoryDetails/CategoryDetails";
import LabelShort from "../../components/LabelShort/LabelShort";
import LabelDetails from "../../components/LabelDetails/LabelDetails";
const Home = () => {
  const [categoryID, setCategoryID] = useState(0);
  const [labelId, setLabelId] = useState("");
  const [hideLabelBlock, setHideLabelBlock] = useState(false);

  const getCategoryItem = (id) => {
    setCategoryID(id);
  };

  const modifiedCategories = categories.map((item) => {
    return { ...item, isChecked: false };
  });
  const getLabelId = (id) => {
    setLabelId(id);
    setHideLabelBlock(true);
  };

  return (
    <>
      <main className="home-wrapper">
        <section className="home-text text-1">
          <span className="home-text__block-fon"></span>
          <h3 className="home-text__header">Welcome to Product Search</h3>
          <p className="home-text__block">
            Welcome to Product Search, where discovery meets convenience. Our
            platform is your gateway to a world of quality products, carefully
            curated to cater to your every need and desire. Explore our
            extensive catalog spanning diverse categories, from electronics and
            fashion to home essentials and beyond. With intuitive search
            features and personalized recommendations, finding the perfect item
            has never been easier. Shop with confidence knowing that each
            product is sourced from trusted brands and sellers. Join our
            community of savvy shoppers and experience the future of online
            shopping. Let Product Search be your trusted companion on your
            shopping journey.
          </p>
        </section>
        <section className="home-text text-2">
          <h3 className="home-text__header">Our Mission</h3>
          <p className="home-text__block">
            Our mission at Product Search is simple: to provide a seamless and
            enjoyable shopping journey for our customers. We strive to be your
            go-to destination for discovering new and exciting products,
            offering a diverse selection that caters to every interest and need.
          </p>
        </section>
        <section className="home-assortment">
          <h3 className="home-assortment__header">
            <span className="home-assortment__header_line-1"></span>
            <span className="home-assortment__header_line-2"></span>
            Main assortment
          </h3>
          <div className="home-assortment__categories">
            {modifiedCategories.map((item, index) => {
              if (categoryID === index) {
                item.isChecked = true;
              } else {
                item.isChecked = false;
              }
              return (
                <CategoryItem
                  key={item.id}
                  image={item.image}
                  category={item.category}
                  amount_at_the_shop={item.amount_at_the_shop}
                  amount_at_the_warehouse={item.amount_at_the_warehouse}
                  average_price={item.average_price}
                  main_inf={item.main_inf}
                  additional_inf={item.additional_inf}
                  getCategoryItem={() => {
                    getCategoryItem(index);
                  }}
                  isChecked={item.isChecked}
                />
              );
            })}
          </div>
          <CategoryDetails
            amount_at_the_shop={categories[categoryID].amount_at_the_shop}
            amount_at_the_warehouse={
              categories[categoryID].amount_at_the_warehouse
            }
            average_price={categories[categoryID].average_price}
            main_inf={categories[categoryID].main_inf}
            additional_inf={categories[categoryID].additional_inf}
          />
        </section>
        <section className="home-discovering">
          <h3 className="home-discovering__header">
            Discover Your Perfect Match
          </h3>
          <div className="home-discovering__text">
            <div className="home-discovering__text-1">
              <p>
                In today's fast-paced world, finding the right product can feel
                like searching for a needle in a haystack. Whether you're
                looking for a new gadget to streamline your life or a special
                gift for a loved one, the endless options and information
                overload can be overwhelming. That's where our Product Search
                project comes in - to simplify your search, streamline your
                decision-making process, and help you find exactly what you're
                looking for, effortlessly.
              </p>
              <p>
                At its core, our Product Search project is designed with one
                goal in mind: to empower you, the consumer, with the tools and
                resources you need to make informed choices. Gone are the days
                of endlessly scrolling through countless websites or wandering
                aimlessly through crowded stores. With our intuitive search
                platform, you can quickly and easily find products that meet
                your specific criteria, whether it's price, features, or brand
                preferences.
              </p>
              <p>
                But what sets our Product Search project apart from the rest?
                It's all about the details. We've invested countless hours into
                refining our search algorithms, ensuring that you receive
                accurate and relevant results every time. From the latest tech
                gadgets to everyday household essentials, our database is
                constantly updated to reflect the latest trends and offerings on
                the market.
              </p>
            </div>
          </div>
        </section>
        <section className="home-labels">
          <div className="home-labels__inner-wrapper">
            {labels.map((item) => {
              return (
                <LabelShort
                  key={item.id}
                  id={item.id}
                  header={item.header}
                  image={item.image}
                  short_description={item.short_description}
                  full_description={item.full_description}
                  getLabelId={getLabelId}
                />
              );
            })}
          </div>
          <LabelDetails
            labelId={labelId}
            setHideLabelBlock={setHideLabelBlock}
            hideLabelBlock={hideLabelBlock}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
