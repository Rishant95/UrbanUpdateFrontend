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
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/connect/google";
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
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/local/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      alert("Account created successfully!");
      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userName", formData.username);
        localStorage.setItem("email", formData.email);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating account:", error.response || error.message);
      alert(error.response?.data?.message || "There was an error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="create-account-container">
        <h1 id="Signup-Title">Sign Up</h1>
        <form
          className="create-account-form"
          onSubmit={handleSubmit}
          method="POST"
        >
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
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="button-container">
        <div className="continue-container">
          <hr />
          <h5>or continue with</h5>
          <hr />
        </div>
        <button
          className="google-signin-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="google-logo" /> Sign Up with Google
        </button>
        <div className="signin-link">
          <h5>Already have an account?</h5>
          <a href="/signin">Sign in</a>
        </div>
      </div>
    </div>
  );
}
