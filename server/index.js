import express from "express";
import cors from "cors";              // ✅ import CORS middleware
import runChat from "./config/gemini.js";

const app = express();

// Enable CORS for all origins (development)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running!!!!");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.userMessage;
  try {
    const reply = await runChat(userMessage);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
