import React, { useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    // Here, you can add logic to save the data to a server.
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Profile</h1>
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <img
          src={profile.profilePicture}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "block", margin: "1rem auto" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
      </div>
      <button
        onClick={handleSave}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfilePage;
