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
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("Tue");
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  const dates = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true); // Open the modal on plus icon click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const navigate = useNavigate();

  const handleTaskNavigation = () => {
    navigate("/task");
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

      {/* Center Content */}
      <div className="center-content">
        <div className="calendar-icon">
          <FaCalendarAlt className="big-icon" />
          <FaPlus className="add-icon" />
        </div>
        <p>There is nothing scheduled</p>
        <span>Try adding new activities</span>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handlePlusClick}>
        <FaPlus className="Plus" />
      </button>

      {/* Modal for Task, Recurring Task, Habit */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>

            <div className={`modal-option ${isModalOpen ? "show" : ""}`}>
              <div className="d-flex" style={{ display: "flex" }}>
                <FaTrophy className="modal-icon" />
                <p>Habit</p>
              </div>
              <span>
                Activity that repeats over time. It has detailed tracking and
                statistics.
              </span>
            </div>

            <div className={`modal-option ${isModalOpen ? "show" : ""}`}>
              <div className="d-flex" style={{ display: "flex" }}>
                <FaSyncAlt className="modal-icon" />
                <p>Recurring Task</p>
              </div>
              <span>
                Activity that repeats over time without tracking or statistics.
              </span>
            </div>

            <div
              className={`modal-option ${isModalOpen ? "show" : ""}`}
              onClick={() => {
                handleTaskNavigation();
                console.log("Navigating to Task Page");
              }}
            >
               <div className="d-flex" style={{ display: "flex" }}
  >
                <FaCheckCircle className="modal-icon" />
                <p>Task</p>
                </div>
            <span>Single instance activity without tracking over time.</span>
              </div>
            </div>
          </div>
        
      )}

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <div className="nav-item active">
          <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome className="icon" />
            <p>Today</p>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/habit" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaTasks className="icon" />
            <p>Habits</p>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaList className="icon" />
            <p>Categories</p>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/timer" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaStopwatch className="icon" />
            <p>Timer</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
