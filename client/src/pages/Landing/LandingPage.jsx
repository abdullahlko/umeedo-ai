import React from "react";
import Hero from "../../components/Hero/Hero";
import "./LandingPage.css";
import UmeedoIntro from "../../components/Section1LandingPage/UmeedoIntro";
import Header from "../../components/Header/Header"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header/>
      <Hero />
      <UmeedoIntro/>
    </div>
  );
};

export default LandingPage;
