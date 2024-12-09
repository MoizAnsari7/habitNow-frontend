import { useState } from "react";

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Walk", progress: "50%", streak: 5 },
    { id: 2, name: "Read a Book", progress: "30%", streak: 2 },
  ]);

  // Handler to add a new habit
  const addHabit = () => {
    const newHabit = {
      id: habits.length + 1,
      name: "New Habit",
      progress: "0%",
      streak: 0,
    };
    setHabits([...habits, newHabit]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Habits</h1>
      <button
        style={{
          padding: "0.5rem 1rem",
          margin: "1rem 0",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={addHabit}
      >
        Add Habit
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {habits.map((habit) => (
          <div
            key={habit.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{habit.name}</h3>
            <p>Progress: {habit.progress}</p>
            <p>Streak: {habit.streak} days</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;
