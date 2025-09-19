import React from "react";
import { FaSmile, FaBrain, FaUserMd, FaClipboardCheck, FaEnvelope, FaLightbulb } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";  

import "./UmeedoFeatures.css";

const featuresData = [
  {
    icon: <FaSmile />,
    title: "Mood Tracker",
    description: "Log your mood and see how it changes over time.",
    link: "/mood-tracker",
  },
  {
    icon: <GiMeditation />,
    title: "Mindfulness",
    description: "Short guided meditations and breathing exercises to relax anytime.",
  },
  {
    icon: <FaUserMd />,
    title: "Get Support",
    description: "Chat with the AI assistant or connect with a therapist whenever you need help.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Mental Exercises",
    description: "Interactive exercises like CBT prompts to help your daily mental health.",
  },
  {
    icon: <FaEnvelope />,
    title: "Wellness Tips",
    description: "Quick, useful tips tailored to your mood for a calmer day.",
  },
  {
    icon: <FaLightbulb />,
    title: "Motivational Cards",
    description: "Receive uplifting prompts or reminders based on your current mood.",
  },
];

const UmeedoFeatures = () => {
  return (
    <section className="features-section" id="features">
      <h2 className="features-heading">How Umeedo Helps You</h2>
      <div className="features-container">
        {featuresData.map((feature, index) => {

          const CardContent = (
            <div className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          );


          return feature.link ? (
            <a key={index} href={feature.link} className="feature-link">
              {CardContent}
            </a>
          ) : (
            <div key={index}>
              {CardContent}
            </div>
          );

        })}
      </div>
    </section>
  );
};

export default UmeedoFeatures;
