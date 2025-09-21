import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";
import umeedoLogo from '../../assets/umeedo_logo.png'; 



const PrivacyPolicy = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // scrolls to top when component mounts
    }, []);
  const navigate = useNavigate();
  return (
    <>
      
      <header className="page-header">
        <img src={umeedoLogo} alt="Umeedo Logo" className="page-logo" />
      </header>

      <div className="policy-page">
        <h1>Privacy Policy</h1>

        <section>
          <h2>Privacy First</h2>
          <p>
            Your privacy is our top priority. Umeedo keeps all conversations
            private and confidential.
          </p>
        </section>

        <section>
          <h2>Anonymous Usage</h2>
          <p>
            You can use Umeedo without signing up or providing personal details.
            Conversations are fully anonymous.
          </p>
        </section>

        <section>
          <h2>Gmail Login for Mood Data</h2>
          <p>
            If you log in with Google, we only use your email and name to
            identify you and save your mood entries. We do not access your
            emails, contacts, or any other personal information. Your mood data
            is private and never shared with third parties.
          </p>
        </section>

        <section>
          <h2>Data Storage</h2>
          <p>
            “Your mood entries are securely saved. If you use the app without
            logging in, they are stored on your device. If you log in with
            Google, they are stored in the cloud and accessible from any device.
          </p>
        </section>

        <section>
          <h2>Deleting Your Data</h2>
          <p>
            You can delete your mood entries manually. Deleted data is
            permanently removed.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions, reach us via the <strong>Contact</strong>{" "}
            page.
          </p>
        </section>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </>
  );
};

export default PrivacyPolicy;
