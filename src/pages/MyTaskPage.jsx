import React, { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import "./MyTask.css";
import { useTaskContext } from "../context/TaskProvider";

const MyTaskPage = ({ finalArray = [], setValue }) => {
  const { tasks, setTasks } = useTaskContext(); // Access global state
  const [activeTab, setActiveTab] = useState("single"); // Manage active tab state

  // Effect to update tasks only once when the component mounts
  useEffect(() => {
    if (finalArray.length > 0) {
      setTasks((prevTasks) => [...prevTasks, ...finalArray]); // Set global tasks state
    }
  }, [finalArray, setTasks]);

  // Function to render tasks
  const renderTasks = () => {
    if (!tasks || tasks.length === 0) {
      return (
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
      );
    }

    return (
      <div className="task-list">
        {tasks.map((item, index) => (
          <div key={index} className="task-item">
            {typeof item === "string" ? (
              <span>{item}</span>
            ) : (
              <div>
                {item.name && <p className="task-name">{item.name}</p>}
                {item.note && <p className="task-note">{item.note}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="task-page" style={{marginTop:"100px"}}>
    

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "single" ? "tab active" : "tab"}
          onClick={() => setActiveTab("single")}
        >
          Single tasks
        </button>
        <button
          className={activeTab === "recurring" ? "tab active" : "tab"}
          onClick={() => setActiveTab("recurring")}
        >
          Recurring tasks
        </button>
      </div>

      {/* Content */}
      <div className="content">{renderTasks()}</div>

      {/* Floating Button */}
      {setValue && (
        <button className="floating-button" onClick={() => setValue("add-task")}>
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default MyTaskPage;
 