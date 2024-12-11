import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const WhenToDoItPage = ({ onPrevious, onNext, onSave }) => {
  const [startDate, setStartDate] = useState("Today");
  const [endDateEnabled, setEndDateEnabled] = useState(false);
  const [endDate, setEndDate] = useState(null); // State to hold the selected End Date
  const [timeReminders, setTimeReminders] = useState(0);
  const [priority, setPriority] = useState("Default");
  const [task, setTask] = useState(""); // State to hold the task

  const handleSaveClick = () => {
    const newTask = `Task: Start Date - ${startDate}, End Date - ${endDate ? endDate.toLocaleDateString() : "Not Set"}, Reminders - ${timeReminders}, Priority - ${priority}`;
    setTask(newTask); // Set the task locally
    onSave(newTask); // Pass task to HomePage
    onNext(); // Optionally, move to the next step
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>When do you want to do it?</h2>
      <div style={styles.optionContainer}>
        {/* Start Date */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-calendar-alt" style={styles.icon}></i>
            Start date
          </div>
          <button style={styles.optionButton}>{startDate}</button>
        </div>

        {/* End Date */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-calendar-alt" style={styles.icon}></i>
            End date
          </div>
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={endDateEnabled}
              onChange={() => setEndDateEnabled(!endDateEnabled)}
            />
            <span
              style={{
                ...styles.slider,
                backgroundColor: endDateEnabled ? "#ff4d6d" : "#555",
              }}
            ></span>
          </label>
          {endDateEnabled && (
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)} // Update the end date
              dateFormat="MM/dd/yyyy"
              placeholderText="Select End Date"
              style={styles.datePicker}
            />
          )}
        </div>

        {/* Time and Reminders */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-bell" style={styles.icon}></i>
            Time and reminders
          </div>
          <button style={styles.optionButton}>{timeReminders}</button>
        </div>

        {/* Priority */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-flag" style={styles.icon}></i>
            Priority
          </div>
          <button style={styles.optionButton}>{priority}</button>
        </div>
      </div>

      {/* Display Task if exists */}
      {task && (
        <div style={styles.taskDisplay}>
          <h3 style={styles.taskHeading}>Your Task:</h3>
          <p>{task}</p>
        </div>
      )}

      {/* Footer Buttons */}
      <div style={styles.footer}>
        <button style={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button style={styles.saveButton} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "90vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80vh",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    color: "#ff4d6d",
    marginBottom: "30px",
  },
  optionContainer: {
    width: "100%",
    maxWidth: "400px",
    flexGrow: 1,
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #333",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    color: "#fff",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
    color: "#ff4d6d",
  },
  optionButton: {
    padding: "8px 20px",
    backgroundColor: "#1c1c1e",
    color: "#ff4d6d",
    border: "1px solid #ff4d6d",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "40px",
    height: "20px",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "20px",
    transition: "0.4s",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
  },
  backButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  saveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskDisplay: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#1c1c1e",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  taskHeading: {
    fontSize: "20px",
    color: "#ff4d6d",
  },
  datePicker: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "350px",
    padding: "10px",
    backgroundColor: "#1c1c1e",
    border: "1px solid #ff4d6d",
    color: "#fff",
    borderRadius: "5px",
  },
};

export default WhenToDoItPage;
