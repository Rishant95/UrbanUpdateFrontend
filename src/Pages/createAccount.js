import React, { useState } from "react";
import "../PagesCss/createAccount.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    organization: "",
    designation: "", // Optional field
    phone: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for submission
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/connect/google"; // Google OAuth
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:1337/connect/facebook"; // Facebook OAuth
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://admin.manofox.online/api/auth/local/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      alert("Account created successfully!");
      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userName", formData.username); // Save the username
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating account:", error.response || error.message);
      alert(
        error.response?.data?.message ||
          "There was an error creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="create-account-container">
        <h1 id="Signup-Title">Sign Up</h1>
        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="form-column">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="create-account-button"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>

      <div className="button-container">
        <div className="continue-container">
          <hr />
          <h5 style={{ width: "100%", padding: "0 10px" }}>or continue with</h5>
          <hr style={{ marginLeft: "-20px" }} />
        </div>
        <button
          className="google-signin-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="google-logo" /> Sign Up with Google
        </button>
        <button
          className="facebook-signin-button"
          type="button"
          onClick={handleFacebookLogin}
        >
          <FaFacebookF className="facebook-logo" /> Sign Up with Facebook
        </button>
        <hr style={{ borderWidth: "1px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h5>Already have an account?</h5>
          <a href="/signin" style={{ textDecoration: "none", color: "blue" }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
