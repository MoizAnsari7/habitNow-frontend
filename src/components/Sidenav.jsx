import React, { useState } from "react";
import "./Sidenav.css";
import { FaBars } from "react-icons/fa"; // Import toggle button icon
import { Link } from "react-router-dom"; // For routing

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidenav

  // Function to toggle sidenav
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidenav}>
        <FaBars />
      </button>

      {/* Sidenav */}
      <div className={`sidenav ${isOpen ? "open" : "closed"}`}>
        <div className="sidenav-header">
          <h2>HabitNow</h2>
          <p>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <ul className="sidenav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/timer">Timer</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/customize">Customize</Link>
          </li>
          <li>
            <Link to="/setting">Settings</Link>
          </li>
          <li>
            <Link to="/backups">Backups</Link>
          </li>
          <li>
            <Link to="/premium">Get Premium</Link>
          </li>
          <li>
            <Link to="/rate">Rate this App</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
