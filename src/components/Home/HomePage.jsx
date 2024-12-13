import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaHome,
  FaTasks,
  FaList,
  FaStopwatch,
  FaCheckCircle,
  FaSyncAlt,
  FaTrophy,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";
import MyTaskPage from "../../pages/MyTaskPage";
import { useTaskContext } from "../../context/TaskProvider";

const HomePage = () => {
  const { tasks, setTasks } = useTaskContext();

  const [selectedDate, setSelectedDate] = useState("Tue");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dates = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleTaskNavigation = () => {
    navigate("/task");
  };

  const handleRecurringNavigation = () => {
    navigate("/recurringTask");
  };

  return (
    <div
      className="homepage-container"
      style={{ width: "100vw", padding: 0, marginTop: "20px" }}
    >
      {/* Navbar */}
      <div className="navbar">
        <span className="navbar-title" style={{ visibility: "hidden" }}>
          HabitNow
        </span>
        <div className="navbar-icons">
          <FaCalendarAlt className="icon" />
        </div>
      </div>

      {/* Date Scroll */}
      <div className="date-scroll">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date-item ${
              selectedDate === date ? "active-date" : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {!tasks || tasks.length === 0 ? (
        <>
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
        </>
      ) : (
        <div>
          <h2>Your Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{typeof task === "string" ? task : task.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fab" onClick={handlePlusClick}>
        <FaPlus className="Plus" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>

            <div className="modal-option show">
              <div className="d-flex" style={{ display: "flex" }}>
                <FaTrophy className="modal-icon" />
                <p>Habit</p>
              </div>
              <span>
                Activity that repeats over time. It has detailed tracking and
                statistics.
              </span>
            </div>

            <div
              className="modal-option show"
              onClick={() => {
                handleRecurringNavigation();
              }}
            >
              <div className="d-flex" style={{ display: "flex" }}>
                <FaSyncAlt className="modal-icon" />
                <p>Recurring Task</p>
              </div>
              <span>
                Activity that repeats over time without tracking or statistics.
              </span>
            </div>

            <div
              className="modal-option show"
              onClick={() => {
                handleTaskNavigation();
              }}
            >
              <div className="d-flex" style={{ display: "flex" }}>
                <FaCheckCircle className="modal-icon" />
                <p>Task</p>
              </div>
              <span>Single instance activity without tracking over time.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
