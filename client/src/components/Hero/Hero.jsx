import React from "react";
import { assets } from "../../assets/assets";
import "./Hero.css";

const Hero = () => {
const handleCTA = () => {
  const nextSection = document.getElementById("chatbot-intro");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <div className="hero-section">
      <h1>Welcome to Umeedo</h1>
      <p>Your confidential companion for youth mental wellness</p>
      <img className="floating-logo" src={assets.umeedo_logo} alt="Umeedo logo" />
      <button className="hero-cta" onClick={handleCTA}>
        Get Started
      </button>
    </div>
  );
};

export default Hero;
