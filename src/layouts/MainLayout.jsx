import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import Logo from "../components/Logo/Logo";
import "./MainLayout.css";
const MainLayout = () => {
  return (
    <>
      <header className="header">
        <span className="menu-circle-1"></span>
        <span className="menu-circle-2"></span>
        <Logo />
        <Menu />
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
