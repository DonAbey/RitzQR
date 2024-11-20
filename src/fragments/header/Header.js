import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./header.css";
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
          <img
            src={data.image_url}
            alt="QR Code"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
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
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="soil-logo navbar-brand">
              <h1 className="soil-logo d-inline">Ritz QR Codes</h1>
              <img src={logo} alt="QR Code Logo" className="logo-img" />
            </Link>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="header-search-form"
          >
            <div className="input-group search rounded-pill">
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
        </div>
      </nav>

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
