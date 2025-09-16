import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Umeedo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
