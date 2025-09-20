import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/ChatContext";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, messageRefs, newChat } = useContext(Context);

  const scrollToMessage = (index) => {
    messageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu icon"
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus icon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                className="recent-entry"
                onClick={() => scrollToMessage(index)}
              >
                <img src={assets.message_icon} alt="msg" />
                <p>{item.user.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;