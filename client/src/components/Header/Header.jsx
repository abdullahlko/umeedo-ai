import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Header.css";

const Header = () => {
  
  const alwaysVisibleRoutes = ["/mood-tracker"];
  const isAlwaysVisible = alwaysVisibleRoutes.includes(window.location.pathname);

  
  const [showHeader, setShowHeader] = useState(isAlwaysVisible);

  useEffect(() => {
    
    if (isAlwaysVisible) return;

    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      if (window.scrollY > heroHeight) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAlwaysVisible]);

  if (!showHeader) return null;

  return (
    <header className="header">
      <div
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={assets.umeedo_logo} alt="Umeedo Logo" />
        <div className="logo-text">
          <h1>Umeedo</h1>
          <p>Your space for calm & care</p>
        </div>
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#chatbot-intro">Meet Umeedo</a>
        <a href="#resources">Resources</a>
      </nav>
    </header>
  );
};

export default Header;
