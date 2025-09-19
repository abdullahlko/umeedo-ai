import React from "react";
import Header from "../../components/Header/Header"; // site header
import MoodTracker from "../../components/MoodTracker/MoodTracker";
import "./MoodTrackerPage.css";

const MoodTrackerPage = () => {
  return (
    <div className="mood-tracker-page">
      <Header/>
      <MoodTracker />
    </div>
  );
};

export default MoodTrackerPage;
