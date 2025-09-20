import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./context/ChatContext.jsx"; 
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
    </AuthProvider>
  </StrictMode>
);
