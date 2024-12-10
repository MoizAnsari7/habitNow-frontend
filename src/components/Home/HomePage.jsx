import React, { useState } from "react";
import { FaCalendarAlt, FaPlus, FaHome, FaTasks, FaList, FaStopwatch } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./Home.css";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("Tue");

  const dates = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="homepage-container" style={{width: "100vw", padding:0, marginTop:"20px" }}>
      {/* Navbar */}
      <div className="navbar">
        <span className="navbar-title" style={{visibility:"hidden" }}>HabitNow</span>
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
      <button className="fab">
        <FaPlus />
      </button>

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <div className="nav-item active">
        <NavLink to="/home" activeClassName="active">
          <FaHome className="icon" />
          <p>Today</p>
          </NavLink>
        </div>
        <div className="nav-item">
        <NavLink to="/habit" activeClassName="active">
          <FaTasks className="icon" />
          <p>Habits</p>
          </NavLink>
        </div>
        <div className="nav-item">
        <NavLink to="/categories" activeClassName="active">
           <FaList className="icon" />
          <p>Categories</p>
          </NavLink>
        </div>
        <div className="nav-item">
        <NavLink to="/timer" activeClassName="active">
          <FaStopwatch className="icon" />
          <p>Timer</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
