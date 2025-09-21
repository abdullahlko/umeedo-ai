import React from "react";
import "./UmeedoFeatures.css";

const featuresData = [
  {
    id: "mood-compass",
    icon: "🧭",
    title: "Mood Compass",
    description: "Log your feelings in seconds and track your emotional journey.",
    link: "/mood-tracker",
  },
  {
    id: "calm-minutes",
    icon: "🌿",
    title: "Calm Minutes",
    description: "Short exercises to relax your mind and reset anytime.",
    link: "/mindfulness",
  },
  {
    id: "professional-help",
    icon: "🧑‍⚕️",
    title: "Professional Help",
    description: "Reach licensed therapists instantly when you need guidance.",
    link: "/support",
  },
  {
    id: "mind-gym",
    icon: "💪",
    title: "Mind Gym",
    description: "Fun mental exercises to boost focus, reduce stress, and improve mood.",
    link: "/mental-exercises",
  },
  {
    id: "stress-escape",
    icon: "🏝️",
    title: "Stress Escape Mini-Games",
    description: "Play short interactive games designed to calm your mind and reduce stress instantly.",
    link: "/stress-games",
  },
  {
    id: "motivation-cards",
    icon: "✨",
    title: "Motivation Cards",
    description: "Quick inspiring messages to lift your mood instantly.",
    link: "/daily-boost",
  },
];

const UmeedoFeatures = () => {
  return (
    <section className="features-section" id="features">
      <h2 className="features-heading">How Umeedo Helps You</h2>
      <div className="features-container">
        {featuresData.map((feature) => (
          <a key={feature.id} href={feature.link} className="feature-card" id={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="cta">Try it now →</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default UmeedoFeatures;
