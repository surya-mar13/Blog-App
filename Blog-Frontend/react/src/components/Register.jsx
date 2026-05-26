import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      role: "user",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      "https://backend-2-jc5u.onrender.com/common-api/upload-image",
      formData,
      { withCredentials: true }
    );

    return res.data.imageUrl;
  };

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError("");
    try {
      const { role, ...user } = newUser;
      const profileImageUrl = await uploadImageToCloudinary();

      if (profileImageUrl) {
        user.profileImageUrl = profileImageUrl;
      }

      if (role === "user") {
        await axios.post("https://backend-2-jc5u.onrender.com/user-api/users", user);
      } else {
        await axios.post("https://backend-2-jc5u.onrender.com/author-api/register", user);
      }

      console.log("Registration successful");
      toast.success("Registration successful");
      reset();
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      if (!err.response) {
        const errorMessage = "Network error: backend is not reachable. Check https://backend-2-jc5u.onrender.com.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        const errorMessage = err.response?.data?.message || err.message || "Registration failed";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit(onUserRegister)}>
          <div className="field">
            <label>Role</label>
            <select {...register("role")}>
            <option value="user">User</option>
            <option value="author">Author</option>
            </select>
          </div>

          <div className="field">
            <label>First Name</label>
            <input type="text" {...register("firstName", { required: true })} />
          </div>

          <div className="field">
            <label>Last Name</label>
            <input type="text" {...register("lastName")} />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" {...register("password", { required: true })} />
          </div>

          <div className="field">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p className="file-help">Optional. Image will be uploaded to Cloudinary.</p>
            {previewUrl ? <img className="preview-avatar" src={previewUrl} alt="Profile preview" /> : null}
          </div>

          {error ? <p className="error">{error}</p> : null}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="auth-note">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;