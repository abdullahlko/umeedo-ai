import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import ChatPage from "./pages/Chat/ChatPage";
import MoodTrackerPage from "./pages/MoodTracker/MoodTrackerPage";

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
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
