import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const MoodHistory = ({ moodHistory }) => {
  const moodEmojis = ["😢", "😕", "😐", "😊", "😄"];

  const chartData = moodHistory
    .sort((a, b) => {
      const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .map((entry, index) => {
      const dateObj = entry.date.toDate ? entry.date.toDate() : new Date(entry.date);
      return {
        index: index + 1,
        mood: entry.mood,
        date: dateObj.toLocaleDateString(),
        label: entry.label,
        note: entry.note,
      };
    });

  return (
    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
      <h3>Your Mood History</h3>

      {chartData.length === 0 ? (
        <p>No mood history yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis
              type="number"
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(tick) => moodEmojis[tick - 1]}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const entry = props.payload;
                return [`${entry.label} (${entry.note || "No note"})`, `Mood on ${entry.date}`];
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#FF6B6B"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MoodHistory;
