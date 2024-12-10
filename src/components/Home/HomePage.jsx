import React from "react";
import "./HomePage.css";
import { FaSearch, FaFilter, FaCalendarAlt, FaQuestionCircle, FaPlus } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Top Navbar */}
      <div className="navbar">
        <h2 className="navbar-title">Today</h2>
        <div className="navbar-icons">
          <FaSearch className="icon" />
          <FaFilter className="icon" />
          <FaCalendarAlt className="icon" />
          <FaQuestionCircle className="icon" />
        </div>
      </div>

      {/* Horizontal Date Scroll */}
      <div className="date-scroll">
        {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className={`date-item ${index === 4 ? "active-date" : ""}`}>
            <span>{day}</span>
            <span>{6 + index}</span>
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div className="center-content">
        <div className="calendar-icon">
          <FaCalendarAlt className="big-icon" />
          <div className="add-icon">
            <FaPlus />
          </div>
        </div>
        <p className="center-text">There is nothing scheduled</p>
        <p className="sub-text">Try adding new activities</p>
      </div>

      {/* Floating Action Button */}
      <button className="fab">
        <FaPlus />
      </button>

      {/* Bottom Navigation Bar */}
      <div className="bottom-navbar">
        <div className="nav-item active">
          <FaCalendarAlt className="icon" />
          <span>Today</span>
        </div>
        <div className="nav-item">
          <FaSearch className="icon" />
          <span>Habits</span>
        </div>
        <div className="nav-item">
          <FaFilter className="icon" />
          <span>Tasks</span>
        </div>
        <div className="nav-item">
          <FaCalendarAlt className="icon" />
          <span>Categories</span>
        </div>
        <div className="nav-item">
          <FaQuestionCircle className="icon" />
          <span>Timer</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
