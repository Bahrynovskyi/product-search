import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
const Menu = () => {
  return (
    <nav className="menu-wrapper">
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="/"
        end
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="/about"
      >
        About Us
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="/products"
        end
      >
        Products
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="/contacts"
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Menu;
