import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import "./UmeedoIntro.css";
import waving from "../../assets/animations/waving.json";

const UmeedoIntro = () => {
  const navigate = useNavigate();

  const handleChatCTA = () => {
    navigate("/chat");
  };

  return (
    <section className="chatbot-intro" id="chatbot-intro">
      {/* Left Column */}
      <div className="text-column">
        <h2>Hi, I’m Umeedo!</h2>
        <h3>Your mental health companion</h3>
        <p>
          I’m here to listen, understand, and support you—anytime, anywhere.<br />
          I can help you explore ways to feel calmer, happier, and more confident.<br />
          <span style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>
            All in a safe and private space.
          </span>
        </p>

        <button className="chat-cta" onClick={handleChatCTA}>
          Chat with me
        </button>
      </div>

      {/* Right Column */}
      <div className="waving-bot" >
      <Lottie animationData={waving} loop={true}  />
    </div>
    </section>
  );
};

export default UmeedoIntro;
