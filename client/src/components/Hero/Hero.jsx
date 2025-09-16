import React from "react";
import { assets } from "../../assets/assets";
import "./Hero.css";

const Hero = () => {
  const handleCTA = () => {
    const nextSection = document.getElementById("chatbot-intro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="hero-section">
      <h1>Welcome to Umeedo</h1>
      <p>Your mental wellness companion</p>
      <img className="floating-logo" src={assets.umeedo_logo} alt="Umeedo logo" />
      <p className="hero-subheading">
        A caring, confidential space to pause, reflect, and feel a little lighter every day.
      </p>
      <button className="hero-cta" onClick={handleCTA}>
        Get Started
      </button>
    </div>
  );
};

export default Hero;
