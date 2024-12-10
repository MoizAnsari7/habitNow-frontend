import React from "react";

const categories = [
  { name: "Quit a bad habit", color: "#ff5722" },
  { name: "Task", color: "#e91e63" },
  { name: "Study", color: "#9c27b0" },
  { name: "Entertainment", color: "#00bcd4" },
  { name: "Finance", color: "#4caf50" },
  { name: "Work", color: "#795548" },
  { name: "Home", color: "#ff9800" },
  { name: "Health", color: "#8bc34a" },
  { name: "Nutrition", color: "#ff5722" },
  { name: "Sports", color: "#2196f3" },
  { name: "Social", color: "#03a9f4" },
  { name: "Outdoor", color: "#ff5722" },
];

const CategorySelectionPage = ({ onNext, onPrevious }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select a Category</h2>
      <div style={styles.grid}>
        {categories.map((category, index) => (
          <button
            key={index}
            style={{ ...styles.categoryButton, backgroundColor: category.color }}
             >
            {category.name}
          </button>
        ))}
      </div>

<div className="d-flex" style={{ display: "flex", margin: "10px"}}>

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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    width: "90%",
    marginBottom: "20px",
  },
  categoryButton: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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

export default CategorySelectionPage;
