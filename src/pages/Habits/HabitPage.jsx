import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    frequency: "daily", // Default value
    startDate: "",
    endDate: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Fetch habits on component mount
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axiosInstance.get("/habit/habits");
        setHabits(response.data.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  // Add or Edit Habit
  const handleAddHabit = async () => {
    const { name, description, frequency, startDate, endDate } = newHabit;
    if (name.trim()) {
      try {
        if (editingHabit) {
          // If editing an existing habit, update it
          const response = await axiosInstance.put(`/habit/habits/${editingHabit}`, {
              complete : true,
            date : new Date()
          });

          // Update the habit in the state after editing
          setHabits(habits.map(habit => (habit._id === editingHabit ? response.data.data : habit)));

          // Reset form state
          setEditingHabit(null);
        } else {
          // If adding a new habit, create it
          const response = await axiosInstance.post("/habit/habits", {
            name,
            description,
            frequency,
            startDate,
            endDate,
          });

          // Add the new habit to the state
          setHabits([...habits, response.data.data]);
        }

        // Reset form state
        setNewHabit({
          name: "",
          description: "",
          frequency: "daily",
          startDate: "",
          endDate: "",
        });
        setShowForm(false);
      } catch (error) {
        console.error("Error adding/updating habit:", error);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  // Edit habit
  const handleEditHabit = (habit) => {
    setNewHabit(habit); // Fill the form with existing habit data
    setShowForm(true); // Show the form
    setEditingHabit(habit._id); // Set editingHabit to the ID of the habit being edited
  };

// Edit progress for a habit
const handleEditProgress = async (habitId, date, completed) => {
  try {
    const response = await axiosInstance.put(`/habit/habits/${habitId}`, {
      date: new Date(date).toISOString().split("T")[0], // Format date as yyyy-mm-dd
      completed,
    });

    // Update the habit in the state with new progress data
    setHabits(
      habits.map((habit) =>
        habit._id === habitId ? response.data.data : habit
      )
    );
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};

  // Delete habit
  const handleDeleteHabit = async (id) => {
    try {
      await axiosInstance.delete(`/habit/habits/${id}`);
      setHabits(habits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <div className="mt-5 mb-5 pb-5 pt-3" style={style.habitContainer}>
      <h1 style={{ color: "#e91e63" }}>My Habits</h1>

      {/* Habits List */}
      <div style={style.habitList} className="mb-5">
        {habits.map((habit) => (
       <div key={habit._id} style={style.habitCard}>
       <h3>{habit.name}</h3>
       <p>Description: {habit.description}</p>
       <p>Frequency: {habit.frequency}</p>
       <p>
         Start Date:{" "}
         {new Date(habit.startDate).toLocaleDateString("en-US", {
           weekday: "long",
           year: "numeric",
           month: "long",
           day: "numeric",
         })}
       </p>
       <p>
         End Date:{" "}
         {new Date(habit.endDate).toLocaleDateString("en-US", {
           weekday: "long",
           year: "numeric",
           month: "long",
           day: "numeric",
         })}
       </p>
     
       {/* Displaying progress entries */}
       <div>
         <h4>Progress:</h4>
         {habit.progress && habit.progress.length > 0 ? (
           habit.progress.map((entry, index) => (
             <div key={index} style={{ marginBottom: "5px" }}>
               <span>{new Date(entry.date).toLocaleDateString("en-US")}</span>
               <button
                 style={entry.completed ? style.completeButton : style.incompleteButton}
                 onClick={() => handleEditProgress(habit._id, entry.date, !entry.completed)}
               >
                 {entry.completed ? "Completed" : "Not Completed"}
               </button>
             </div>
           ))
         ) : (
           <p className="text-info">No progress recorded yet.</p>
         )}
       </div>
     
       <div style={{ display: "flex", gap: "5px" }}>
         <button style={style.editButton} onClick={() => handleEditHabit(habit)}>
           <FaEdit /> Edit
         </button>
         <button style={style.deleteButton} onClick={() => handleDeleteHabit(habit._id)}>
           <FaTrashAlt /> Delete
         </button>
       </div>
     </div>
     
      
        ))}
      </div>

      {/* Add Habit Button */}
      <button
        style={style.addHabitButton}
        onClick={() => {
          setShowForm(true); // Show form to add a new habit
          setEditingHabit(null); // Reset editing habit state to avoid editing on add
          setNewHabit({ name: "", description: "", frequency: "daily", startDate: "", endDate: "" }); // Reset form
        }}
      >
        Add Habit
      </button>

      {/* Form to Add/Edit Habit */}
      {showForm && (
        <div style={style.formContainer}>
          <h2 style={{ color: "#fff" }}>
            {editingHabit ? "Edit Habit" : "Add New Habit"}
          </h2>

          {/* Habit Name */}
          <input
            type="text"
            name="name"
            placeholder="Habit Name"
            value={newHabit.name}
            onChange={handleInputChange}
            style={style.inputField}
          />

          {/* Habit Description */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newHabit.description}
            onChange={handleInputChange}
            style={style.inputField}
          />

          {/* Frequency Dropdown */}
          <select
            name="frequency"
            value={newHabit.frequency}
            onChange={handleInputChange}
            style={style.inputField}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {/* Start Date */}
          <label style={{ color: "#fff" }}>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={newHabit.startDate}
            onChange={handleInputChange}
            style={style.inputField}
          />

          {/* End Date */}
          <label style={{ color: "#fff" }}>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={newHabit.endDate}
            onChange={handleInputChange}
            style={style.inputField}
          />

          {/* Buttons */}
          <button onClick={handleAddHabit} style={style.submitButton}>
            Submit
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setEditingHabit(null); // Reset editing state when canceling
            }}
            style={style.cancelButton}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const style = {
  habitContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#242424", // Black background
    color: "#ffff",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  habitList: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingBottom: "5rem",
  },
  habitCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "1rem",
    backgroundColor: "#735998",
    position: "relative",
  },
  editButton: {
    backgroundColor: "#FFC107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "12px",
  },
  deleteButton: {
    backgroundColor: "#E53935",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "12px",
  },
  addHabitButton: {
    position: "fixed",
    top: "60px",
    right: "20px",
    padding: "0.5rem 1rem",
    backgroundColor: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1000,
  },
  formContainer: {
    width: "80vw",
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#e91e63",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
  },
  inputField: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#307811",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#242424",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  completeButton: {
    backgroundColor: "#4CAF50", // Green
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  incompleteButton: {
    backgroundColor: "#E53935", // Red
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  
};

export default HabitsPage;
