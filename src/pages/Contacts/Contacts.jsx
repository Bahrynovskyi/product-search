import React from "react";
import "./Contacts.css";

import IconPhone from "../../images/contacts-icons/telephone.png";
import IconEmail from "../../images/contacts-icons/email.png";
import IconAddress from "../../images/contacts-icons/location.png";

const Contacts = () => {
  return (
    <div className="contacts-wrapper">
      <h2>Сontact us every day 24/7</h2>
      <div className="contacts-inf">
        <div className="contacts-inf__address">
          <span className="contacts-inf__address-img">
            <img src={IconAddress} alt="icon-address" />
          </span>
          <p className="contacts-inf__address-text">
            205 Davenport St, Bellevue, ID 83313, United States of America
          </p>
        </div>
        <div className="contacts-inf__phone">
          <span className="contacts-inf__phone-img">
            <img src={IconPhone} alt="icon-phone" />
          </span>
          <p className="contacts-inf__phone-text">800.686.1600</p>
        </div>
        <div className="contacts-inf__email">
          <span className="contacts-inf__email-img">
            <img src={IconEmail} alt="icon-email" />
          </span>
          <p className="contacts-inf__email-text">
            productsearchadmin@davenport.com
          </p>
        </div>
      </div>
      <div className="contacts-map">
        <iframe
          className="contacts-map__google-map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3039991.507150078!2d-73.193531!3d41.919911!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2z0KHQv9C-0LvRg9GH0LXQvdGWINCo0YLQsNGC0Lgg0JDQvNC10YDQuNC60Lg!5e0!3m2!1suk!2sen!4v1714897307897!5m2!1sen!2sen"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contacts;
