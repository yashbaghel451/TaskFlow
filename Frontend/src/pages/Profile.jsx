import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosApi";

const Profile = () => {
  const { user, getMe } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user]);

  // Select Image
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setSelectedImage(file);

    // Show preview
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };
  // Upload Image
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      console.log("Uploading file:", selectedImage);
      console.log("Token:", localStorage.getItem("token"));

      const response = await api.put("/auth/profile-image", formData);

      console.log("Upload Status:", response.status);
      console.log("Upload Response:", response.data);

      // Refresh user data
      await getMe();

      // Set uploaded image
      setPreviewImage(response.data.profileImage);

      setSelectedImage(null);

      alert("Profile photo uploaded successfully! 📸");
    } catch (error) {
      console.error("FULL UPLOAD ERROR:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      console.error("URL:", error.config?.url);
      console.error("Base URL:", error.config?.baseURL);

      alert(
        error.response?.data?.message ||
          `Upload failed. Status: ${error.response?.status || "Unknown"}`,
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="profile-card">
          {/* Profile Photo */}
          <div className="profile-avatar-container">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="profile-avatar-image"
              />
            ) : (
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            {/* Choose Photo */}
            <button
              className="btn btn-primary"
              onClick={() => fileInputRef.current.click()}
            >
              📷 Choose Photo
            </button>

            {/* Upload Button */}
            {selectedImage && (
              <button
                className="btn btn-success"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            )}
          </div>

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>User ID</span>
              <strong>{user?._id}</strong>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
