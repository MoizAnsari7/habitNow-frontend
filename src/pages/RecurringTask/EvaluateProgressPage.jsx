import React from "react";

const EvaluateProgressPage = ({ onPrevious, onNext }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>How do you want to evaluate your progress?</h2>
      <button style={styles.buttonYesNo} >
        WITH A YES OR NO
      </button>
      <button style={styles.buttonChecklist} disabled>
        WITH A CHECKLIST (Premium Feature)
      </button>


      
<div className="d-flex" style={{ display: "flex", margin: "20px", padding: "25px"}}>

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
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  buttonYesNo: {
    width: "80%",
    padding: "10px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  buttonChecklist: {
    width: "80%",
    padding: "10px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  backButton: {
    width: "80%",
    padding: "10px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight : "40px",
  },

  nextButton: {
    marginLeft : "40px",
    width: "80%",
    padding: "10px",
    backgroundColor: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EvaluateProgressPage;
