
import { doc, deleteDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Save mood to Firestore
export const saveMood = async (userId, moodData) => {
  try {
    const moodRef = doc(db, "users", userId, "moods", moodData.date);
    await setDoc(moodRef, moodData);
    console.log("Mood saved successfully");
  } catch (error) {
    console.error("Error saving mood:", error);
    throw error;
  }
};

// Fetch user moods from Firestore
export const fetchUserMoods = async (userId) => {
  try {
    const moodsRef = collection(db, "users", userId, "moods");
    const snapshot = await getDocs(moodsRef);
    return snapshot.docs
      .map(doc => doc.data())
      .filter(mood => mood.mood !== null && mood.mood !== undefined); // Filter out cleared moods
  } catch (error) {
    console.error("Error fetching moods:", error);
    return [];
  }
};

// Delete mood from Firestore
export const deleteMood = async (userId, date) => {
  try {
    const moodRef = doc(db, "users", userId, "moods", date);
    await deleteDoc(moodRef);
    console.log("Mood deleted successfully");
  } catch (error) {
    console.error("Error deleting mood:", error);
    throw error;
  }
};