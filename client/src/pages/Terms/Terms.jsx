import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Terms.css';
import umeedoLogo from '../../assets/umeedo_logo.png'; 

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to top when component mounts
  }, []);
  const navigate = useNavigate();

  return (
    <>
      {/* Full-width header with logo */}
      <header className="page-header">
        <img src={umeedoLogo} alt="Umeedo Logo" className="page-logo" />
      </header>

      {/* Terms content */}
      <div className="terms-page">
        <h1>Terms & Conditions</h1>

        <section>
          <h2>Acceptance of Terms</h2>
          <p>By using Umeedo, you agree to these terms. If you disagree, please do not use the app.</p>
        </section>

        <section>
          <h2>Age Requirement</h2>
          <p>Umeedo is intended for users aged 13 and above.</p>
        </section>

        <section>
          <h2>Use of the App</h2>
          <p>Umeedo provides AI-based guidance and wellness tips. It is not a substitute for professional medical advice.</p>
        </section>

        <section>
          <h2>User Conduct</h2>
          <p>Do not misuse the app or upload harmful/illegal content. Violations may result in restricted access.</p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>Content, logos, and designs in Umeedo are either owned by us or used under valid licenses. Third-party content is used according to its original license.</p>
        </section>

        <section>
          <h2>Liability</h2>
          <p>Umeedo is not liable for consequences from using the app. AI provides guidance, not professional treatment.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>For questions regarding these terms, visit the <strong>Contact</strong> page.</p>
        </section>
      </div>

        {/* Back button */}
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </>
  );
};

export default Terms;
