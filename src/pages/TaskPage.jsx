import React, { useState } from "react";
import "./Task.css"; // Updated CSS

const TaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("Task");
  const [date, setDate] = useState("Today");
  const [priority, setPriority] = useState("Default");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);

  const handleConfirm = () => {
    // Task confirmation logic
    console.log({
      taskName,
      category,
      date,
      priority,
      notes,
      pending,
    });
  };

  return (
    <div className="task-page" >
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
        <button className="category-btn">{category}</button>
      </div>

      {/* Date Selector */}
      <div className="form-group">
        <label>Date</label>
        <button className="date-btn">{date}</button>
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
        <button className="cancel-btn">Cancel</button>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
