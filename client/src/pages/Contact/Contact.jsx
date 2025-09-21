import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import umeedoLogo from '../../assets/umeedo_logo.png'; 


const Contact = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // scrolls to top when component mounts
    }, []);
    
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary, just simulating submission
    setSubmitted(true);
    setMessage("");
  };

  return (
    <>
      {/* Full-width header with logo */}
      <header className="page-header">
        <img src={umeedoLogo} alt="Umeedo Logo" className="page-logo" />
      </header>
      <div className="contact-page">
        <h1>Contact Us</h1>
        {submitted ? (
          <p>Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Your Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
                placeholder="Type your message here..."
              />
            </label>
            <button type="submit">Send</button>
          </form>
        )}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </>
  );
};

export default Contact;
