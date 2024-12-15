import React, { useState } from "react";
import "./Task.css";
import { useTaskContext } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const { tasks, setTasks } = useTaskContext(); // Access global state

  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("Task");
  const [date, setDate] = useState("Today");
  const [priority, setPriority] = useState("Default");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);

  const navigate = useNavigate();

  // Handle confirm action to add the task
  const handleConfirm = () => {
    // Create a new task object
    const newTask = {
      taskName,
      category,
      date,
      priority,
      notes,
      pending,
    };

    // Update the global tasks state
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Navigate to the tasks page
    navigate("/myTask");
  };

  return (
    <div className="task-page">
      <h2>New Task</h2>

      {/* Task Input */}
      <div className="form-group">
        <label>Task</label>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      {/* Category Selector */}
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Date Selector */}
      <div className="form-group">
        <label>Date</label>
        <input
          type="text"
          placeholder="Enter date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Priority Dropdown */}
      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Default">Default</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Notes Input */}
      <div className="form-group">
        <label>Note</label>
        <textarea
          placeholder="Add details about this task"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      {/* Pending Task Checkbox */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={pending}
            onChange={() => setPending(!pending)}
          />
          Pending task
        </label>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="cancel-btn" onClick={() => navigate("/myTask")}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
