import React from "react";
import { assets } from "../../assets/assets";
import "./Main.css";

const Main = () => {
  const greetingOpeners = [
    "Hi there!",
    "Welcome back!",
    "Hey!",
    "Hello!",
    "Hi!",
    "Hey there!",
    "Welcome!",
  ];

  const supportiveStatements = [
    "I’m here to listen.",
    "Let’s talk whenever you’re ready.",
    "You can share whatever’s on your mind.",
    "I’m here with you.",
    "Take your time, I’m ready to listen.",
    "Let’s chat.",
    "You’re not alone here.",
  ];

  const placeholders = [
    "What's on your mind?",
    "I'm here to listen...",
    "Type your thoughts here...",
    "How are you feeling today?",
    "It’s safe to express yourself here...",
    "Want to talk about how your day went?",
    "I’m listening... write whenever you’re ready.",
  ];
  const randomIndex = Math.floor(Math.random() * greetingOpeners.length);

  const selectedGreeting = greetingOpeners[randomIndex];
  const selectedStatement = supportiveStatements[randomIndex];
  const selectedPlaceholder = placeholders[randomIndex];

  return (
    <div className="main">
      <div className="nav">
        <div className="left-group">
          <img src={assets.umeedo_logo} alt="U" />
          <p className="logo-text">meedo</p>
        </div>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p>
            <span>{selectedGreeting}</span>
            <br />
            {selectedStatement}
          </p>
        </div>
      

      <div className="main-bottom">
        <div className="search-box">
          <input type="text" placeholder={selectedPlaceholder} />
          <div>
            <img src={assets.mic_icon} alt="" />
            <img src={assets.send_icon} alt="" />
          </div>
        </div>
          <p className="disclaimer">
            ⚠️ I’m not a medical professional — if you ever feel in crisis,
            please reach out for real help.
          </p>
        
      </div>
      </div>
    </div>
    
  );
};

export default Main;
