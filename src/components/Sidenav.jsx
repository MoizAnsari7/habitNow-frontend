import React, { useState } from 'react';
import './Sidenav.css';  // Add the CSS file for styling
import { FaBars } from "react-icons/fa";
 // Import an icon for the toggle button

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(true);  // State to manage sidenav visibility

  // Toggle function
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button for Sidenav */}
      <button className="toggle-btn" onClick={toggleSidenav}>
        <FaBars />   
      </button>

      {/* Sidenav */}
      <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidenav-header">
          <h2>HabitNow</h2>
          <p>Monday 9 December 2024</p>
        </div>
        <ul className="sidenav-links">
          <li>Home</li>
          <li>Timer</li>
          <li>Categories</li>
          <li>Customize</li>
          <li>Settings</li>
          <li>Backups</li>
          <li>Get premium</li>
          <li>Rate this app</li>
          <li>Contact us</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
