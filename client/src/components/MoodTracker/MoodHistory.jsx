import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];

const MoodHistory = ({ moodHistory }) => {
  const chartData = useMemo(() =>
    [...moodHistory]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((entry, index) => ({
        index: index + 1,
        mood: entry.mood,
        date: new Date(entry.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        label: entry.label || "",
        note: entry.note || "",
      })),
    [moodHistory]
  );

  if (!chartData.length) return null;

  return (
    <div className="mood-history-card" style={{ width: "100%", marginTop: "2rem" }}>
      <h3>Your Mood History</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis dataKey="date" angle={-30} textAnchor="end" interval="preserveStartEnd" />
            <YAxis
              type="number"
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(tick) => moodEmojis[tick - 1]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload;
                  return (
                    <div style={{ background: "white", border: "1px solid #ccc", borderRadius: 6, padding: 8, fontSize: "0.9rem" }}>
                      <strong>{entry.date}</strong><br />
                      Mood: {entry.label} {moodEmojis[entry.mood - 1]}<br />
                      Note: {entry.note || "No note"}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type="monotone" dataKey="mood" stroke="#FF6B6B" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodHistory;
