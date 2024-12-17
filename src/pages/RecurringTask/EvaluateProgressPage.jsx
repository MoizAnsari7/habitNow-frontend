import React from "react";
import { useForm } from '../../context/FormContext';


const EvaluateProgressPage = ({ onPrevious, onNext,setValue }) => {
  const { formData, updateFormData } = useForm();

  const handleChange = (evaluationType) => {
    setValue(evaluationType);
    updateFormData('frequency',evaluationType);

};

  return (
    <div style={styles.container}>
      <h2 className="mt-5 p-2" style={styles.heading}>How do you want to evaluate your progress?</h2>

      <button style={styles.primaryButton} onClick={() =>{onNext(), handleChange("WITH A YES OR NO")}}>WITH A YES OR NO</button>
      <button style={styles.secondaryButton} disabled>
        WITH A CHECKLIST (Premium Feature)
      </button>

     
    </div>
  );
};

const styles = {
  container: {
    width : "85vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "85vh",
    backgroundColor: "#242424",
    color: "#fff",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    color: "#ff4d6d",
    marginBottom: "30px",
    textAlign: "center",
  },
  primaryButton: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondaryButton: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    marginBottom: "420px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    fontSize: "16px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
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

export default EvaluateProgressPage;
