import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Header.css";

const Header = () => {
  const alwaysVisibleRoutes = ["/mood-tracker"];
  const location = useLocation();
  const navigate = useNavigate();
  const isAlwaysVisible = alwaysVisibleRoutes.includes(location.pathname);

  const [showHeader, setShowHeader] = useState(isAlwaysVisible);

  useEffect(() => {
    if (isAlwaysVisible) return;

    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setShowHeader(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAlwaysVisible]);

  if (!showHeader) return null;

  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header className="header">
      <div
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={assets.umeedo_logo} alt="Umeedo Logo" />
        <div className="logo-text">
          <h1>Umeedo</h1>
          <p className="tagline">A safe space for your wellness</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <button onClick={() => handleNavClick("hero")}>Home</button>
        <button onClick={() => handleNavClick("features")}>
          How Umeedo Helps
        </button>
        <button onClick={() => navigate("/chat")}>Chat with Umeedo</button>
        <button onClick={() => navigate("/mood-tracker")}>Mood Tracker</button>
      </nav>
    </header>
  );
};

export default Header;
