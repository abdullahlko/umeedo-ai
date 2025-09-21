import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import ChatPage from "./pages/Chat/ChatPage";
import MoodTrackerPage from "./pages/MoodTracker/MoodTrackerPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";
import Contact from "./pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/mood-tracker",
    element: <MoodTrackerPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
