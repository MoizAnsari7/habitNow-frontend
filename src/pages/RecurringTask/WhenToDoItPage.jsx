import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "../../context/FormContext";

const WhenToDoItPage = ({ onPrevious, onNext, onSave }) => {
  const { formData, updateFormData } = useForm();

  const [startDate, setStartDate] = useState(new Date()); // Default to today's date
  const [endDateEnabled, setEndDateEnabled] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [reminders, setTimeReminders] = useState(0);
  const [priority, setPriority] = useState("Medium");
  const [taskTime, setTaskTime] = useState("08:00"); // Time input field

  const handleSaveClick = () => {
    // Collect all the form data and update it
    const formDataToSave = {
      category: formData.category,
      name: formData.page3Data.name,
      description: formData.page3Data.note,
      frequency: formData.frequency,
      customFrequency: formData.customFrequency,
      startDate,
      endDate,
      endDateEnabled,
      priority,
      reminders,
      time: taskTime,
    };

    // Update form context with the form data (if needed)
    updateFormData("page5Data", formDataToSave);

    // Call the onSave function passed from the parent (or directly send API request)
    if (onSave) {
      onSave(formDataToSave); // Send data to the parent component or backend
    }
  };

  return (
    <div style={styles.container}>
      <h2 className="mt-5 p-2" style={styles.heading}>When do you want to do it?</h2>
      <div style={styles.optionContainer}>
        {/* Start Date */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-calendar-alt" style={styles.icon}></i>
            Start date
          </div>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="MM/dd/yyyy"
            style={styles.datePicker}
            todayButton="Today"
          />
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
              onChange={setEndDate}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select End Date"
              style={styles.datePicker}
            />
          )}
        </div>

        {/* Time Picker */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-clock" style={styles.icon}></i>
            Select Time
          </div>
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            style={styles.optionButton}
          />
        </div>

        {/* Reminders Input */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-bell" style={styles.icon}></i>
            Reminders
          </div>
          <input
            type="number"
            min="0"
            value={reminders}
            onChange={(e) => setTimeReminders(e.target.value)}
            style={styles.optionButton}
          />
        </div>

        {/* Priority Dropdown */}
        <div style={styles.option}>
          <div style={styles.optionLabel}>
            <i className="fas fa-flag" style={styles.icon}></i>
            Priority
          </div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.optionButton}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

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
    width:' 100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    height: '84vh',
    backgroundColor: '#242424',
    color: 'rgb(255, 255, 255)',
    padding: '20px',
    alignContent: 'space-between',
    flexWrap: 'nowrap'
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
};

export default WhenToDoItPage;
