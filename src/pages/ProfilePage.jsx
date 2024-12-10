import React, { useState } from "react";
import "./Profile.css";

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
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Edit Profile</h1>
      <div className="profile-picture-container">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="file-input"
        />
      </div>
      <div className="input-container">
        <label className="input-label">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          className="profile-input"
        />
      </div>
      <div className="input-container">
        <label className="input-label">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          className="profile-input"
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default ProfilePage;
