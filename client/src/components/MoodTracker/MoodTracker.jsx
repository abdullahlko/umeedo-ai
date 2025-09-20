import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodHistory from "./MoodHistory";
import LoginButton from "../../components/Login/LoginButton";
import { auth } from "../../firebase/firebaseConfig";
import { saveMood, fetchUserMoods } from "../../firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];
const moodLabels = ["Terrible", "Bad", "Okay", "Good", "Great"];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [notification, setNotification] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  // Load localStorage moods on mount
  useEffect(() => {
    const stored = localStorage.getItem("moodHistory");
    if (stored) setMoodHistory(JSON.parse(stored));
  }, []);

  // Save moodHistory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Fetch moods from Firestore when user logs in
  useEffect(() => {
    const fetchFirestoreMoods = async () => {
      if (auth.currentUser) {
        const firestoreMoods = await fetchUserMoods(auth.currentUser.uid);
        setMoodHistory((prev) => {
          const combined = [...prev, ...firestoreMoods];
          const unique = combined.reduce((acc, curr) => {
            if (!acc.find((m) => m.date === curr.date)) acc.push(curr);
            return acc;
          }, []);
          return unique;
        });
      }
    };

    fetchFirestoreMoods();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchFirestoreMoods();
    });
    return () => unsubscribe();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSave = async () => {
    const moodEntry = {
      date: today,
      mood: selectedMood,
      label: moodLabels[selectedMood - 1],
      note,
    };

    // Update local state
    setMoodHistory((prev) => {
      const filtered = prev.filter((m) => m.date !== today);
      return [...filtered, moodEntry];
    });

    setNote("");
    showNotification("success", "Mood saved successfully!");

    // Save to Firestore if logged in
    if (auth.currentUser) {
      await saveMood(auth.currentUser.uid, moodEntry);
    }
  };

  const handleClearToday = async () => {
    setMoodHistory((prev) => prev.filter((m) => m.date !== today));
    showNotification("success", "Today's mood cleared!");

    if (auth.currentUser) {
      await saveMood(auth.currentUser.uid, { date: today, deleted: true });
    }
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

      <div
  style={{
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "2rem",
  }}
>
  ⚠️ Mood history is saved in this browser only. <br/>Clearing data or changing
  devices will lose it.{" "}
  <span style={{ fontWeight: "bold", color:"#3b82f6" }}>Login</span> for
  permanent saving
  <div style={{ marginTop: "0.5rem" }}>
    <LoginButton />
  </div>
</div>

      
    </div>
  );
};

export default MoodTracker;
