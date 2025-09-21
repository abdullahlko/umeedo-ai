import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        
        <p className="footer-text">
          © {new Date().getFullYear()} Umeedo. Prototype for <strong>GenAI Exchange Hackathon 2025</strong>
        </p>

        {/* MVP Tag */}
        <p className="mvp-note">⚠️ MVP — Limited features available</p>

        {/* Quick links */}
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Social icons */}
        <div className="footer-social">
          <a
            href="https://github.com/abdullahlko/umeedo-ai"
            target="_blank"
            rel="noopener noreferrer"
            title="Umeedo Project Repo"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullahlko/"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect on LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
