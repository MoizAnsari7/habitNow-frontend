import React, { useState } from "react";

const DefineTaskPage = ({ onNext, onPrevious,setValue }) => {
  const [taskName, setTaskName] = useState("");
    const [taskNote, setTaskNote] = useState("");

    const handleSave = () => {
        if (!taskName) {
            alert("Task Name is required!");
            return;
        }
        setValue({ name: taskName, note: taskNote });
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

      <div style={styles.footer}>
        <button style={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button style={styles.saveButton} onClick={()=>{onNext(),handleSave()}}>
          Next
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
    height: "70vh",
    backgroundColor: "#1d1d1d",
    color: "#fff",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    color: "#ff4d6d",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ff4d6d",
    borderRadius: "5px",
    backgroundColor: "#1c1c1e",
    color: "#fff",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    maxWidth: "400px",
    height: "100px",
    padding: "10px",
    border: "1px solid #ff4d6d",
    borderRadius: "5px",
    backgroundColor: "#1c1c1e",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "200px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
    marginTop: "10px",
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

export default DefineTaskPage;
