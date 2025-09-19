import React, { useState } from "react";
import "./MoodTracker.css";

const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];
const moodLabels = ["Terrible", "Bad", "Okay", "Good", "Great"];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [note, setNote] = useState("");

  const handleSave = () => {
    alert(`Mood saved: ${moodLabels[selectedMood - 1]}, Note: ${note}`);
    setNote("");
  };

  return (
    <div className="mood-tracker-container">
      <h2>Mood Tracker</h2>

      <div className="mood-options">
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            className={selectedMood === index + 1 ? "selected" : ""}
            onClick={() => setSelectedMood(index + 1)}
          >
            {emoji} {selectedMood === index + 1 && moodLabels[index]}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Any thoughts today?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button onClick={handleSave}>Save Mood</button>
    </div>
  );
};

export default MoodTracker;
