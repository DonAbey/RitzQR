import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="row justify-content-center bg-footer mt-5">
        <div className="col-md-2">
          {/* Logo or branding */}
          <img
            className="rounded-3"
            src="logo.png"
            alt="Logo"
            style={{ width: "150px", height: "200px" }}
          />
        </div>

        {/* Follow us section */}
        <div className="col-md-2">
          <h5>Follow us</h5>
          <ul>
            <li>Facebook</li>
            <li>Twitter X</li>
            <li>Telegram</li>
            <li>LinkedIn</li>
            <li>Youtube</li>
          </ul>
        </div>

        {/* About us section */}
        <div className="col-md-2">
          <h5>About us</h5>
          <ul>
            <li>Journaler</li>
            <li>Mr. Journaler</li>
            <li>AEM+</li>
            <li>Help</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Resources section */}
        <div className="col-md-2">
          <h5>Resources</h5>
          <ul>
            <li>Help</li>
            <li>Blog</li>
            <li>Accounting Advisors</li>
          </ul>
        </div>

        {/* Contact Us section */}
        <div className="col-md-2">
          <h5>Contact Us</h5>
          <ul>
            <li>Investors</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Location section */}
        <div className="col-md-2">
          <h5>Location AU</h5>
          <ul>
            <li>RMIT Blockchain Innovation Hub</li>
            <li>Stone & Chalk</li>
          </ul>
          <h5>Location HK</h5>
          <ul>
            <li>Cyberport</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
