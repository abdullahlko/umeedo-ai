import React, { useRef, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MoodHistory = ({ moodHistory }) => {
  const containerRef = useRef(null);
  const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];
  const needsScrolling = moodHistory.length > 7;

  const chartData = moodHistory
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry, index) => ({
      index: index + 1,
      date: entry.date,
      mood: entry.mood,
      label: entry.label,
      note: entry.note,
    }));

  useEffect(() => {
    if (containerRef.current && needsScrolling) {
      setTimeout(() => {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      }, 100);
    }
  }, [moodHistory.length, needsScrolling]);

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <h3>Your Mood History</h3>
      {moodHistory.length === 0 ? (
        <p>No mood history yet.</p>
      ) : (
        <>
          {needsScrolling && (
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
              📊 Scroll left to view previous mood entries
            </p>
          )}
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: 300,
              overflowX: needsScrolling ? "auto" : "visible",
              overflowY: "visible",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                width: needsScrolling ? `${Math.max(600, moodHistory.length * 60)}px` : "100%",
                height: "100%",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid stroke="#f0f0f0" />
                  <XAxis dataKey="index" />
                  <YAxis
                    type="number"
                    domain={[1, 5]}
                    tickFormatter={(tick) => moodEmojis[tick - 1]}
                    ticks={[1, 2, 3, 4, 5]}
                  />
                  <Tooltip
                    formatter={(value, name, props) => {
                      const entry = props.payload;
                      return [`${entry.label} (${entry.note || "No note"})`, `Mood on ${entry.date}`];
                    }}
                  />
                  <Line type="monotone" dataKey="mood" stroke="#FF6B6B" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodHistory;
