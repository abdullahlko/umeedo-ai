import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodHistory from "./MoodHistory";

const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];
const moodLabels = ["Terrible", "Bad", "Okay", "Good", "Great"];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(3); 
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [notification, setNotification] = useState(null); 

  const today = new Date().toISOString().split("T")[0]; 

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("moodHistory");
    if (stored) setMoodHistory(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever moodHistory changes
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSave = () => {
    const moodEntry = {
      date: today,
      mood: selectedMood,
      label: moodLabels[selectedMood - 1],
      note,
    };

    setMoodHistory((prev) => {
      const filtered = prev.filter((m) => m.date !== today);
      return [...filtered, moodEntry];
    });
// setMoodHistory((prev) => [...prev, moodEntry]); //uncomment: when to test mood logging behaviour on graph multiple times 

    setNote("");
    showNotification("success", "Mood saved successfully!");
  };

  const handleClearToday = () => {
    setMoodHistory((prev) => prev.filter((m) => m.date !== today));
    showNotification("success", "Today's mood cleared!");
  };

  return (
    <div className="mood-tracker-container">
      <h2>Mood Tracker</h2>

      <div className="mood-options">
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            className={`mood-btn ${
              selectedMood === index + 1 ? "selected" : ""
            }`}
            onClick={() => setSelectedMood(index + 1)}
          >
            <span className="emoji">{emoji}</span>
            {selectedMood === index + 1 && (
              <span className="label">{moodLabels[index]}</span>
            )}
          </button>
        ))}
      </div>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <textarea
        placeholder="Any thoughts today?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="save-btn" onClick={handleSave}>
        Save Mood
      </button>

      <button className="clear-btn" onClick={handleClearToday}>
        Clear Today’s Mood
      </button>

      <MoodHistory moodHistory={moodHistory} />
      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
        ⚠️ Mood history is saved in this browser only. Clearing data or changing
        devices will lose it. For permanent saving, login is required.
      </p>
    </div>
  );
};

export default MoodTracker;
