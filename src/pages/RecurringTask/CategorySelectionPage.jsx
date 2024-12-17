import {useState, useEffect} from "react";
import axiosInstance from '../../services/axiosInstance';
import { useForm } from '../../context/FormContext';



const CategorySelectionPage = ({ onNext, onPrevious, setValue }) => {
  const { formData, updateFormData } = useForm();

  const [categories, setCategories] = useState([]); // Dynamic categories
  
  const handleChange = (categoryName) => {
    setValue(categoryName);
    updateFormData('category',categoryName);
}; 



 // Fetch categories dynamically from backend
 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category"); // Fetch categories API
      setCategories(response.data || []); 
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  fetchCategories();
}, []);


  return (
    <div style={styles.container}>
      <h2 className="mt-5 p-2" style={styles.heading}>Select a Category</h2>

      <div style={styles.grid}>
        {categories.map((category) => (
          <button
            key={category._id}
            style={{ ...styles.categoryButton, backgroundColor: category.color }}
            onClick={() =>{ onNext(),handleChange(category._id)}}>
            {category.name}
          </button>
        ))}
      </div>

      
    </div>
  );
};

const styles = {
  container: {
    width: "85vw",
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
