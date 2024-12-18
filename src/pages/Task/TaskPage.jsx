import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance"; // Custom axios instance
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./Task.css";

const TaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [categories, setCategories] = useState([]); // Dynamic categories
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("08:00"); // Time in HH:mm format
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch categories dynamically from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category"); // Fetch categories API
        setCategories(response.data || []); 
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  // Handle Confirm (Send to backend)
  const handleConfirm = async () => {
    const taskData = {
      name: taskName,
      description: notes,
      date,
      time,
      category: selectedCategory,
      reminders: [], // Optional reminders
      priority,
    };

    try {
      console.log("TASK DATA", taskData);

      setLoading(true);
      const response = await axiosInstance.post("/task/tasks", taskData);
      console.log("Task Created:", response.data);
      setLoading(false);
      navigate("/myTask");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-3 bg-dark text-white rounded shadow-lg">
      <h2 className="text-center mb-4 mt-5 p-2">New Task</h2>

      {error && <div className="alert alert-danger">{error}</div>}
  <div className="row">
      <div className="mb-3 col-6">
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="mb-3  col-6">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-6">
        <label className="form-label">Date</label>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="form-control"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>

      <div className="mb-3 col-6">
        <label className="form-label">Time</label>
        <TimePicker
          onChange={setTime}
          value={time}
          format="HH:mm"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          placeholder="Add details about this task"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="pendingCheck"
          checked={pending}
          onChange={() => setPending(!pending)}
        />
        <label className="form-check-label" htmlFor="pendingCheck">
          Pending Task
        </label>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary w-45"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger w-45"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Saving..." : "Confirm"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default TaskPage;
