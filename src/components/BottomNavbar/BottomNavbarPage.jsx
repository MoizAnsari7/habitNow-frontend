import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTasks, FaCheckCircle, FaList, FaStopwatch } from "react-icons/fa";
import "./BottomNavbar.css";

const BottomNavbarPage = () => {
  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaHome className="icon" />
          <p>Today</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/habit"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaTasks className="icon" />
          <p>Habits</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/myTask"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaCheckCircle className="icon" />
          <p>Task</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaList className="icon" />
          <p>Categories</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/timer"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaStopwatch className="icon" />
          <p>Timer</p>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbarPage;
