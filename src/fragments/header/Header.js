import React from "react";
import Navbar from "../navbar/Navbar";
import "./header.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/MrJournalerFront1.png";

const Header = (props) => {
  return (
    <>
      <nav className="navbar navbar-light header-nav py-4">
        <div className="container-fluid justify-space-between ms-5 me-5">
          <Link to="/" className="soil-logo navbar-brand me-5">
            <h1 className="soil-logo d-inline">AEM Journaler</h1>
            <img src={logo} alt="" style={{ width: "100px" }} />
          </Link>
          <form action="">
            <div className="input-group col-md-4 search rounded-pill">
              <input
                className="form-control py-2 border-right-0 rounded-pill"
                type="search"
                placeholder="Search AEM Services.."
                id="example-search-input"
              />
            </div>
          </form>
          <ul className="navbar nav">
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/login" className={"header-item-style"}>
                  {" "}
                  <i className="fi fi-rr-user"></i> Login
                </Link>
              </li>
            )}
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/Register" className={"header-item-style"}>
                  {" "}
                  <i className="fi fi-rr-user"></i> Register
                </Link>
              </li>
            )}
            {props.username !== null && (
              <li className="nav-item me-5 username-style">
                {props.username}
                <Link to="/profile" className={"ms-4 header-item-style me-4"}>
                  <i className="fi fi-rs-user-pen"></i> Profile
                </Link>
                <Link
                  to="/login"
                  onClick={props.logout}
                  className={"header-item-style"}
                >
                  <i className="fi fi-rs-sign-out-alt"></i> Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {props.username !== null && <Navbar />}
      {/* <Navbar /> */}
    </>
  );
};

export default Header;
