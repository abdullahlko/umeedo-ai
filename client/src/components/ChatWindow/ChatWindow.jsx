import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./ChatWindow.css";
import { Context } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const {
    prevPrompts,
    onSent,
    handleKeyDown,
    input,
    setInput,
    messageRefs,
    loading,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, prevPrompts.length);
  }, [prevPrompts.length, messageRefs]);

  const greetingOpeners = [
    "Hi there!",
    "Welcome!",
    "Hey!",
    "Hello!",
    "Hi!",
  ];

  const supportiveStatements = [
    "I'm here to listen.",
    "Let's talk whenever you're ready.",
    "You can share whatever's on your mind.",
    "I'm here with you.",
    "Take your time, I'm ready to listen.",
  ];

  const reassuranceMessages = [
    "🛡️ This is your safe space to talk openly.",
    "🤝 What you share here stays just between us.",
    "🌱 Everything you share is kept private.",
    "💬 You're in a private space — feel free to share at your pace.",
    "🔒 Your thoughts are safe here with me.",
  ];

  const placeholders = [
    "What's on your mind?",
    "I'm here to listen...",
    "Type your thoughts here...",
    "How are you feeling today?",
  ];

  const randomIndex = React.useMemo(
    () => Math.floor(Math.random() * greetingOpeners.length),
    []
  );

  const selectedGreeting = greetingOpeners[randomIndex];
  const selectedStatement = supportiveStatements[randomIndex];
  const selectedPlaceholder = placeholders[randomIndex];
  const selectedReassurance = reassuranceMessages[randomIndex];

  return (
    <div className="main">
      <div className="nav">
        <div className="left-group" onClick={() => navigate("/")}>
          <img src={assets.umeedo_logo} alt="U" />
          <p className="logo-text">meedo</p>
        </div>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!prevPrompts.length ? (
          <>
            <div className="greet">
              <img className="greet-bot" src={assets.umeedo_bot_1} alt="" />
              <p>
                <span>{selectedGreeting}</span>
                <br />
                {selectedStatement}
              </p>
            </div>
            <div className="reassurance-message">
              <p>{selectedReassurance}</p>
            </div>
          </>
        ) : (
          <div className="result chat-container">
            {prevPrompts.map((entry, index) => (
              <div
                key={index}
                ref={(el) => (messageRefs.current[index] = el)}
                className="chat-entry"
                id={`chat-entry-${index}`}
              >
                <div className="user-msg">
                  <img src={assets.user_icon} alt="User" />
                  <p>{entry.user}</p>
                </div>
                <div className="ai-msg">
                  <img src={assets.umeedo_bot_2} alt="Umeedo bot" />
                  <p dangerouslySetInnerHTML={{ __html: entry.ai }}></p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder={selectedPlaceholder}
            />
            <div>
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={onSent} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="disclaimer">
            ⚠️ I'm not a medical professional — if you ever feel in crisis,
            please reach out for real help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
