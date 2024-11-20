import React from "react";
import "./footer.css";
import logo from "../../assets/github.png";

const Footer = () => {
  return (
    <footer className="footer bg-footer mt-5 text-center py-3">
      <div>
        <img
          className="rounded-3 mb-3"
          src={logo}
          alt="Logo"
          style={{ width: "150px", height: "150px" }}
        />
        <p style={{ color: "white" }}>
          Developed by <strong>Don Abeynayake</strong>
        </p>
        <p style={{ color: "white" }}>&copy; All rights reserved</p>
        <p>
          <a
            href="https://github.com/DonAbey"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Github: https://github.com/DonAbey
          </a>
        </p>
        <p style={{ color: "white" }}>
          Contact: <a href="mailto:abthaveesh@gmail.com" style={{ color: "white" }}>abthaveesh@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
