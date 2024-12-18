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
    <div style={style.habitContainer} className=" mt-5">
      <h1 style={{ color: "#e91e63" }}></h1>

      {/* Habits List */}
      <div style={style.habitList}>
        {habits.map((habit) => (
          <div key={habit.id} style={style.habitCard}>
            <h3>{habit.name}</h3>
            <p>Progress: {habit.progress}</p>
            <p>Streak: {habit.streak} days</p>
          </div>
        ))}
      </div>

      {/* Add Habit Button */}
      <button className=" " style={style.addHabitButton} onClick={addHabit}>
        Add Habit
      </button>
    </div>
  );
};

const style = {
  habitContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#242424", // Black background
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem", // Padding for the container
    boxSizing: "border-box",
    overflowY: "auto", // Enable scrolling
  },
  habitList: {
    width: "100%",
    flex: 1, // Allows the list to grow and take up available space
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingBottom: "5rem", // Adds space for the sticky button
  },
  habitCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "1rem",
    backgroundColor: "#d1f1c1",
  },
  addHabitButton: {
    position: "fixed", // Keeps the button fixed to the bottom
    top: "2.5rem", // Space from the bottom of the screen
    left: "70%", // Center the button horizontally
    transform: "translateX(-50%)", // Adjust for centering
    padding: "0.5rem 1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1000, // Ensure the button is above other elements
  },
};

export default HabitsPage;
