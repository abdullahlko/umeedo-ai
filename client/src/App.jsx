import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import ChatPage from "./pages/Chat/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
