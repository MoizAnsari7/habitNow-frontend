import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaSyncAlt,
  FaTrophy,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axiosInstance from "../../services/axiosInstance";

const HomePage = () => {
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Tue");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, task: null, type: "" });

  const dates = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleTasksResponse = await axiosInstance.get("/task/tasks");
        setSingleTasks(singleTasksResponse.data.tasks);

        const recurringTasksResponse = await axiosInstance.get("/recurringTask/recurring-tasks");
        setRecurringTasks(recurringTasksResponse.data.recurringTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Handle opening and closing modals
  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEditModalClose = () => setEditModal({ isOpen: false, task: null, type: "" });

  // Task management functions
  const handleViewTask = (task) => {
    alert(`Task Details:\nName: ${task.name}\nDescription: ${task.description || "No description"}\nDate: ${task.date || "N/A"}`);
  };

  const openEditModal = (task, type) => {
    setEditModal({ isOpen: true, task, type });
  };

  const saveTaskChanges = async () => {
    try {
      const { task, type } = editModal;
      const url = type === "single" ? `/task/tasks/${task._id}` : `/recurringTask/recurring-task/${task._id}`;
      await axiosInstance.put(url, task);

      if (type === "single") {
        setSingleTasks(singleTasks.map((t) => (t._id === task._id ? task : t)));
      } else {
        setRecurringTasks(recurringTasks.map((t) => (t._id === task._id ? task : t)));
      }

      handleEditModalClose();
      alert("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const url = type === "single" ? `/task/tasks/${id}` : `/recurringTask/recurring-task/${id}`;
      await axiosInstance.delete(url);

      if (type === "single") {
        setSingleTasks(singleTasks.filter((task) => task._id !== id));
      } else {
        setRecurringTasks(recurringTasks.filter((task) => task._id !== id));
      }

      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Navigation handlers
  const handleTaskNavigation = () => navigate("/task");
  const handleHabitNavigation = () => navigate("/habit");
  const handleRecurringNavigation = () => navigate("/recurringTask");

  return (
    <div className="homepage-container" style={{ width: "100vw", marginTop: "20px" }}>
      {/* Navbar */}
      <div className="navbar">
        <span className="navbar-title" style={{ visibility: "hidden" }}>HabitNow</span>
        <div className="navbar-icons">
          <FaCalendarAlt className="icon" />
        </div>
      </div>

      {/* Date Scroll */}
      <div className="date-scroll">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date-item ${selectedDate === date ? "active-date" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Tasks Display */}
      <div  style={{ maxHeight: "600px", overflowY: "auto" }}>
      {singleTasks.length === 0 && recurringTasks.length === 0 ? (
        <div className="calendar-icon-container">
          <div className="calendar-icon">
            <FaCalendarAlt className="big-icon" />
            <FaPlus className="add-icon" />
          </div>
          <div className="message">
            <p>There is nothing scheduled</p>
            <span>Try adding new activities</span>
          </div>
        </div>
      ) : (
        <>
          {/* Single Tasks Section */}
          {singleTasks.length > 0 && (
            <div >
              <h2 className="mt-5 p-3">Single Tasks</h2>
              <div className="task-cards">
                {singleTasks.map((task) => (
                  <div className="task-card" key={task._id}>
                    <h4>{task.name}</h4>
                    <div className="task-actions">
                      <FaEye className="view-icon" onClick={() => handleViewTask(task)} />
                      <FaEdit className="edit-icon" onClick={() => openEditModal(task, "single")} />
                      <FaTrashAlt className="delete-icon" onClick={() => handleDelete(task._id, "single")} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr />

          {/* Recurring Tasks Section */}
          {recurringTasks.length > 0 && (
            <div >
              <h2 className="mt-5 p-3">Recurring Tasks</h2>
              <div className="task-cards mb-5">
                {recurringTasks.map((task) => (
                  <div className="task-card" key={task._id}>
                    <h4>{task.name}</h4>
                    <div className="task-actions">
                      <FaEye className="view-icon" onClick={() => handleViewTask(task)} />
                      <FaEdit className="edit-icon" onClick={() => openEditModal(task, "recurring")} />
                      <FaTrashAlt className="delete-icon" onClick={() => handleDelete(task._id, "recurring")} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handlePlusClick}>
        <FaPlus className="Plus" />
      </button>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="modal show">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>

            <div className="modal-option show" onClick={handleHabitNavigation}>
              <div style={{ display: "flex" }}>
                <FaTrophy className="modal-icon" />
                <p>Habit</p>
              </div>
              <span>Activity that repeats over time. It has detailed tracking and statistics.</span>
            </div>

            <div className="modal-option show" onClick={handleRecurringNavigation}>
              <div style={{ display: "flex" }}>
                <FaSyncAlt className="modal-icon" />
                <p>Recurring Task</p>
              </div>
              <span>Activity that repeats over time without tracking or statistics.</span>
            </div>

            <div className="modal-option show" onClick={handleTaskNavigation}>
              <div style={{ display: "flex" }}>
                <FaCheckCircle className="modal-icon" />
                <p>Task</p>
              </div>
              <span>Single instance activity without tracking over time.</span>
            </div>
          </div>
        </div>
      )}

     {/* Edit Modal */}
{editModal.isOpen && (
  <div className="modal-edit-task show">
    <div className="modal-content-edit">
      <button className="close-btn-edit" onClick={handleEditModalClose}>X</button>
      <h3 className="modal-header">Edit Task</h3>
      <form className="edit-task-form">
        <label className="edit-task-label">
          Task Name:
          <input
            className="edit-task-input"
            type="text"
            value={editModal.task.name}
            onChange={(e) =>
              setEditModal({
                ...editModal,
                task: { ...editModal.task, name: e.target.value },
              })
            }
          />
        </label>
        <label className="edit-task-label">
          Task Description:
          <textarea
            className="edit-task-textarea"
            value={editModal.task.description || ""}
            onChange={(e) =>
              setEditModal({
                ...editModal,
                task: { ...editModal.task, description: e.target.value },
              })
            }
          />
        </label>
        <button type="button" className="edit-task-btn" onClick={saveTaskChanges}>Save Changes</button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default HomePage;
