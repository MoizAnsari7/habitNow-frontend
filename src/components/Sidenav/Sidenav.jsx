import React, { useState, useEffect } from "react";
import "./Sidenav.css";
import { FaBars } from "react-icons/fa"; // Toggle button icon
import { Link, useLocation } from "react-router-dom"; // For routing and detecting active route

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidenav
  const location = useLocation(); // Get the current route path

  // Function to toggle sidenav
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  // Close sidenav when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const sidenavElement = document.querySelector(".sidenav");
      if (isOpen && sidenavElement && !sidenavElement.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

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
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <ul className="sidenav-links">
          {/* Dynamically highlight active link */}
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={location.pathname === "/timer" ? "active" : ""}>
            <Link to="/timer">Timer</Link>
          </li>
          <li className={location.pathname === "/categories" ? "active" : ""}>
            <Link to="/categories">Categories</Link>
          </li>
          <li className={location.pathname === "/customize" ? "active" : ""}>
            <Link to="/customize">Customize</Link>
          </li>
          <li className={location.pathname === "/setting" ? "active" : ""}>
            <Link to="/setting">Settings</Link>
          </li>
          <li className={location.pathname === "/backups" ? "active" : ""}>
            <Link to="/backups">Backups</Link>
          </li>
          <li className={location.pathname === "/premium" ? "active" : ""}>
            <Link to="/premium">Get Premium</Link>
          </li>
          <li className={location.pathname === "/rate" ? "active" : ""}>
            <Link to="/rate">Rate this App</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact Us</Link>
          </li>

          <li className={location.pathname === "/login" ? "active" : ""}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
