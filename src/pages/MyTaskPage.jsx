import React, { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import "./MyTask.css";
import { useTaskContext } from "../context/TaskProvider";
import axiosInstance from "../services/axiosInstance";

const MyTaskPage = ({ setValue }) => {
  const { tasks, setTasks } = useTaskContext(); // Access global task state
  const [activeTab, setActiveTab] = useState("single"); // Default tab is "single"
  const [singleTasks, setSingleTasks] = useState([]); // State for single tasks
  const [recurringTasks, setRecurringTasks] = useState([]); // State for recurring tasks

  // Fetch tasks when the active tab changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (activeTab === "single") {
          const singleTasksResponse = await axiosInstance.get("/task/tasks");
          setSingleTasks(singleTasksResponse.data.tasks || []);
        } else if (activeTab === "recurring") {
          const recurringTasksResponse = await axiosInstance.get(
            "/recurringTask/recurring-tasks"
          );
          setRecurringTasks(recurringTasksResponse.data.recurringTasks || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [activeTab]); // Re-run whenever activeTab changes

  // Function to render the task list based on activeTab
  const renderTasks = () => {
    const currentTasks = activeTab === "single" ? singleTasks : recurringTasks;

    if (!currentTasks || currentTasks.length === 0) {
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
        {currentTasks.map((task) => (
          <div key={task._id} className="task-item">
            <div>
              {task.name && <p className="task-name">{task.name}</p>}
              {task.note && <p className="task-note">{task.note}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="task-page" style={{ marginTop: "100px" }}>
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "single" ? "tab active" : "tab"}
          onClick={() => setActiveTab("single")}
        >
          Single Tasks
        </button>
        <button
          className={activeTab === "recurring" ? "tab active" : "tab"}
          onClick={() => setActiveTab("recurring")}
        >
          Recurring Tasks
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
