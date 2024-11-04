import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import NavItem from "./NavItem";
const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light menu-nav">
      <div className="container-fluid justify-content-start ms-5 me-5 mt-0">
        <ul className="navbar nav">
          <NavItem content="Home" linkto="/" />
          <NavItem content="Support Tickets" linkto="/aemAdmin" />
          <NavItem content="Document Manager" linkto="/documentEditor" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
