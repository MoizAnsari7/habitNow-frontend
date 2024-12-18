import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance"; // Import your axiosInstance
import "./Categories.css"; // Ensure you have your CSS file imported






const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [icons, setIcons] = useState([]);
  const [colors, setColors] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "",
    color: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  useEffect(() => {
    // Fetch Categories, Icons, and Colors on component mount
    const fetchData = async () => {
      try {
        const categoriesResponse = await axiosInstance.get("/category");
        const iconsResponse = await axiosInstance.get("/category/icons");
        const colorsResponse = await axiosInstance.get("/category/colors");

        if (Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data);
        } else {
          console.error(
            "Categories data is not an array:",
            categoriesResponse.data
          );
        }

        setIcons(iconsResponse.data);
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/category", newCategory);
      if (response.status === 201) {
        setCategories((prevCategories) => [...prevCategories, response.data]);
        setNewCategory({
          name: "",
          description: "",
          icon: "",
          color: "",
        });
        setIsFormVisible(false); // Hide the form after submission
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleToggleForm = () => {
    setIsFormVisible((prevState) => !prevState); // Toggle form visibility
  };

  return (
    <div className="categoriesPageContainer mt-5">
      <div>
        <h2>All Categories</h2>
        <ul>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={`${category._id}-${index}`} // Composite key (using _id and index)
                style={{ backgroundColor: category.color }} // Apply unique color
                className="categoryButton"
              >
                <span>{category.name}</span>
              </button>
            ))
          ) : (
            <li>No categories available.</li>
          )}
        </ul>
      </div>

      {/* Plus Icon to Open the Category Form */}
      <div className="plusIconContainer">
        <button className="btn btn-success" onClick={handleToggleForm}>
          {isFormVisible ? "Cancel" : "+"}
        </button>
      </div>

      {/* Create Category Form */}
      {isFormVisible && (
        <div className="createCategoryForm w-100">
          <h5 className="font-weigth m-2 mb-4 col-12">Create New Custom Category</h5>
          <form onSubmit={handleCreateCategory} autoComplete="off">
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleCategoryChange}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="col-6">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCategory.description}
                  onChange={handleCategoryChange}
                  autoComplete="off"
                ></textarea>
              </div>

              <div className="col-6">
                <label htmlFor="icon">Select Icon</label>
                <select
                  id="icon"
                  name="icon"
                  value={newCategory.icon}
                  onChange={handleCategoryChange}
                  autoComplete="off"
                >
                  <option value="">Select icon</option>
                  {icons.map((icon) => (
                    <option key={icon._id} value={icon.name}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="color">Select Color</label>
                <select
                  id="color"
                  name="color"
                  value={newCategory.color}
                  onChange={handleCategoryChange}
                  autoComplete="off"
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color._id} value={color.hex}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit">Create Category</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
