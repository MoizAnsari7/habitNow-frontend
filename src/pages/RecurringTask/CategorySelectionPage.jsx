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
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    width: "100%",
    maxWidth: "400px",
  },
  categoryButton: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
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

export default CategorySelectionPage;
