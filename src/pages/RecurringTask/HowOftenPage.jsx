import React, { useState } from "react";

const HowOftenPage = ({ onPrevious, onNext }) => {
  const [selectedOption, setSelectedOption] = useState("Every day");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>How often do you want to do it?</h2>
      <div style={styles.radioContainer}>
        {["Every day", "Specific days of the week", "Specific days of the month", "Specific days of the year", "Some days per period", "Repeat"].map((option) => (
          <label key={option} style={styles.radioLabel}>
            <input
              type="radio"
              name="frequency"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              style={styles.radioInput}
            />
            {option}
          </label>
        ))}
      </div>

      <div style={styles.footer}>
        <button style={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button style={styles.nextButton} onClick={onNext}>
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
  radioContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "400px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    color: "#fff",
    marginBottom: "15px",
  },
  radioInput: {
    marginRight: "10px",
    accentColor: "#ff4d6d",
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
 nextButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HowOftenPage;
