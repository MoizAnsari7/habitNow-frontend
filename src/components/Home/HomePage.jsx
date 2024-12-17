import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaSyncAlt,
  FaTrophy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axiosInstance from "../../services/axiosInstance";

const HomePage = () => {
  const [singleTasks, setSingleTasks] = useState([]); // State for single tasks
  const [recurringTasks, setRecurringTasks] = useState([]); // State for recurring tasks
  const [selectedDate, setSelectedDate] = useState("Tue");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dates = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const navigate = useNavigate();

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskNavigation = () => {
    navigate("/task");
  };

  const handleHabitNavigation =() => {
    navigate("/habit")
  }

  const handleRecurringNavigation = () => {
    navigate("/recurringTask");
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch single tasks
        const singleTasksResponse = await axiosInstance.get("/task/tasks");
        setSingleTasks(singleTasksResponse.data.tasks);

        // Fetch recurring tasks
        const recurringTasksResponse = await axiosInstance.get(
          "/recurringTask/recurring-tasks"
        );
        setRecurringTasks(recurringTasksResponse.data.recurringTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container" style={{ width: "100vw", marginTop: "20px" }}>
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
            className={`date-item ${selectedDate === date ? "active-date" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Conditional Rendering: Empty State */}
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
            <div>
              <h2 className="mt-5 p-3">Single Tasks</h2>
              <ul>
                {singleTasks.map((task) => (
                  <li key={task._id}>{task.name}</li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          {/* Recurring Tasks Section */}
          {recurringTasks.length > 0 && (
            <div>
              <h2 className="mt-5 p-3">Recurring Tasks</h2>
              <ul>
                {recurringTasks.map((task) => (
                  <li key={task._id}>{task.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
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

            <div className="modal-option show"  onClick={handleHabitNavigation}>
              <div style={{ display: "flex" }}>
                <FaTrophy className="modal-icon" />
                <p>Habit</p>
              </div>
              <span>
                Activity that repeats over time. It has detailed tracking and
                statistics.
              </span>
            </div>

            <div className="modal-option show" onClick={handleRecurringNavigation}>
              <div style={{ display: "flex" }}>
                <FaSyncAlt className="modal-icon" />
                <p>Recurring Task</p>
              </div>
              <span>
                Activity that repeats over time without tracking or statistics.
              </span>
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
    </div>
  );
};

export default HomePage;
