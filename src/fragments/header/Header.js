import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./header.css";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "../../assets/qrcode.png";

const Header = (props) => {
  const [searchCode, setSearchCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleSearch = async () => {
    if (!searchCode) {
      alert("Please enter a code to search.");
      return;
    }

    try {
      const response = await fetch(
        "https://australia-southeast2-ritzqr.cloudfunctions.net/searchQR",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: searchCode }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setModalContent(
          <img src={data.image_url} alt="QR Code" style={{ width: "100%" }} />
        );
        setShowModal(true);
      } else {
        setModalContent("QR code image not found.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setModalContent("An error occurred while searching for the image.");
      setShowModal(true);
    }
  };

  return (
    <>
      <nav className="navbar navbar-light header-nav py-4">
        <div className="container-fluid justify-space-between ms-5 me-5">
          <Link to="/" className="soil-logo navbar-brand me-5">
            <h1 className="soil-logo d-inline">Ritz QR Codes</h1>
            <img src={logo} alt="" style={{ width: "100px" }} />
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="input-group col-md-4 search rounded-pill">
              <input
                className="form-control py-2 border-right-0 rounded-pill"
                type="search"
                placeholder="Search QR codes.."
                id="example-search-input"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
          </form>
          <ul className="navbar nav">
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/"> {/* Redirects to home page */}
                  <i className="fi fi-rr-user"></i> Login
                </Link>
              </li>
            )}
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/"> {/* Redirects to home page */}
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
                  to="/"
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

      {/* Modal for displaying image or message */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
