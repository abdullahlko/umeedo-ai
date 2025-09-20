import React, { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./LoginButton.css";

const LoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="login-button-container">
      {user ? (
        <>
          <p className="welcome-text">Welcome, {user.displayName}</p>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button className="login-btn" onClick={loginWithGoogle}>
          Login with Google
        </button>
      )}
    </div>
  );
};

export default LoginButton;
