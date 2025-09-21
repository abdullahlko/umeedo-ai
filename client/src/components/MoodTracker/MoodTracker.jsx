import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodHistory from "./MoodHistory";
import LoginButton from "../../components/Login/LoginButton";
import { auth } from "../../firebase/firebaseConfig";
import { saveMood, fetchUserMoods } from "../../firebase/firestore";
import { firebaseConfig } from "../../firebase/firebaseConfig";


const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];
const moodLabels = ["Terrible", "Bad", "Okay", "Good", "Great"];
const LOCAL_KEY = "moodHistory";

const MoodTracker = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedMood, setSelectedMood] = useState(3);
  const [note, setNote] = useState("");
  const [notification, setNotification] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    setMoodHistory(stored);
  }, []);

  
  const updateLocalStorage = (newHistory) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newHistory));
  };

  useEffect(() => {
    const sync = async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);

      try {

        const firestoreMoods = await fetchUserMoods(user.uid);
        const localMoods = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

        console.log("Firestore moods:", firestoreMoods);
        console.log("Local moods:", localMoods);

       
        const moodMap = new Map();

       
        firestoreMoods.forEach(mood => {
          if (!mood.deleted) {
            moodMap.set(mood.date, mood);
          }
        });

               for (const localMood of localMoods) {
          const existingMood = moodMap.get(localMood.date);
          
                 if (!existingMood) {
                   await saveMood(user.uid, localMood);
            moodMap.set(localMood.date, localMood);
          }
        }

               const mergedMoods = Array.from(moodMap.values())
          .filter(mood => !mood.deleted)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log("Merged moods:", mergedMoods);

        setMoodHistory(mergedMoods);
        updateLocalStorage(mergedMoods);
      } catch (err) {
        console.error("Sync error:", err);
        showNotification("error", "Failed to sync data");
      }
    };

    const unsubscribe = auth.onAuthStateChanged(sync);
    return () => unsubscribe();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    const moodEntry = {
      date: today,
      mood: selectedMood,
      label: moodLabels[selectedMood - 1],
      note,
      timestamp: new Date().toISOString(), 
    };


    const newHistory = moodHistory.filter(m => m.date !== today);
    newHistory.push(moodEntry);
    newHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setMoodHistory(newHistory);
    updateLocalStorage(newHistory);

    setNote("");
    showNotification("success", "Mood saved successfully!");

    if (isLoggedIn && auth.currentUser) {
      try {
        await saveMood(auth.currentUser.uid, moodEntry);
        console.log("Mood saved to Firestore");
      } catch (error) {
        console.error("Error saving to Firestore:", error);
        showNotification("error", "Failed to sync with cloud");
      }
    }
  };

  const handleClearToday = async () => {

    const newHistory = moodHistory.filter(m => m.date !== today);
    setMoodHistory(newHistory);
    updateLocalStorage(newHistory);

    showNotification("success", "Today's mood cleared!");

    
    if (isLoggedIn && auth.currentUser) {
      try {
    
        await saveMood(auth.currentUser.uid, { 
          date: today, 
          deleted: true,
          timestamp: new Date().toISOString()
        });
        console.log("Deletion marker saved to Firestore");
      } catch (error) {
        console.error("Error saving deletion to Firestore:", error);
        showNotification("error", "Failed to sync deletion with cloud");
      }
    }
  };

  const todaysMood = moodHistory.find(m => m.date === today);

  return (
    <div className="mood-tracker-container">
      <h2>Mood Tracker</h2>

      {todaysMood && (
        <div className="todays-mood" style={{ 
          background: "#f0f8ff", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginBottom: "1rem",
          border: "2px solid #e6f3ff"
        }}>
          <h4>Today's Mood: {todaysMood.label} {moodEmojis[todaysMood.mood - 1]}</h4>
          {todaysMood.note && <p style={{ margin: "0.5rem 0 0 0", fontStyle: "italic" }}>"{todaysMood.note}"</p>}
        </div>
      )}

      <div className="mood-options">
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            className={`mood-btn ${selectedMood === index + 1 ? "selected" : ""}`}
            onClick={() => setSelectedMood(index + 1)}
          >
            <span className="emoji">{emoji}</span>
            {selectedMood === index + 1 && <span className="label">{moodLabels[index]}</span>}
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
        {todaysMood ? "Update Today's Mood" : "Save Mood"}
      </button>
      
      {todaysMood && (
        <button className="clear-btn" onClick={handleClearToday}>
          Clear Today's Mood
        </button>
      )}

      {moodHistory.length > 0 && <MoodHistory moodHistory={moodHistory} />}

      <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "2rem" }}>
        <div style={{ marginTop: "0.5rem" }}>
          <LoginButton />
        </div>
        {isLoggedIn ? (
          <div style={{ color: "#059669" }}>
            ✅ <strong>Logged in</strong> - Your moods are being synced to the cloud
          </div>
        ) : (
          <div>
            ⚠️ Mood history is saved in this browser only. <br />
            Clearing data or changing devices will lose it.{" "}
            <span style={{ fontWeight: "bold", color: "#3b82f6" }}>Login</span> for permanent saving
          </div>
        )}
        
      </div>
    </div>
  );
};

export default MoodTracker;