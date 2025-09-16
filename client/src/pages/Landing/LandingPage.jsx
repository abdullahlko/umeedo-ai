import React from "react";
import Hero from "../../components/Hero/Hero";
import "./LandingPage.css";
import UmeedoIntro from "../../components/Section1LandingPage/UmeedoIntro";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header/>
      <Hero />
      <UmeedoIntro/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
