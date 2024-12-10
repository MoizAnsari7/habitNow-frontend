import React, { useState } from "react";

const DefineTaskPage = ({ onNext, onPrevious }) => {
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");

  const handleSave = () => {
    if (!taskName) {
      alert("Task Name is required!");
      return;
    }
    onSave({ name: taskName, note: taskNote });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Define Your Task</h2>
      
      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={styles.input}
      />
      
      <textarea
        placeholder="Add a Note (Optional)"
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
        style={styles.textarea}
      ></textarea>
      
      <div style={styles.buttonContainer}>
        <button style={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button style={styles.saveButton} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "60vh",
    width: "90vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#ff4081",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ff4081",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "16px",
  },
  textarea: {
    width: "90%",
    height: "80px",
    padding: "10px",
    border: "1px solid #ff4081",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "20px",
  },
  buttonContainer: {
    marginTop:"30vh",
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
  },
  backButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  saveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DefineTaskPage;
