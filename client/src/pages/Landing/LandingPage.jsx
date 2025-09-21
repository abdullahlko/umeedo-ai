import React from "react";
import Hero from "../../components/Hero/Hero";
import UmeedoIntro from "../../components/Section1LandingPage/UmeedoIntro";
import UmeedoFeatures from "../../components/Section2LandingPage/UmeedoFeatures";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      {/* <div id="intro"> */}
      <div id="intro">
        <UmeedoIntro />
      </div>
      <UmeedoFeatures />
      <Footer />
    </div>
  );
};

export default LandingPage;
