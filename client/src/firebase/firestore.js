import { db } from "./firebaseConfig";
import { doc, setDoc, collection, getDocs, query, orderBy } from "firebase/firestore";

// Save one mood per user per day
export const saveMood = async (uid, moodEntry) => {
  if (!uid) return;
  try {
    const moodDocRef = doc(collection(db, "users", uid, "moods"), moodEntry.date);
    await setDoc(moodDocRef, moodEntry); // overwrite existing
  } catch (err) {
    console.error("Error saving mood:", err);
  }
};

// Fetch all moods for a user
export const fetchUserMoods = async (uid) => {
  if (!uid) return [];
  try {
    const moodsCol = collection(db, "users", uid, "moods");
    const q = query(moodsCol, orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error("Error fetching moods:", err);
    return [];
  }
};
