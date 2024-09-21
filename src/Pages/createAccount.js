import React, { useState } from "react";
import "../PagesCss/createAccount.css";

import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    organization: "",
    designation: "", // New field added
    phone: "",
  });

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/connect/google"; // Google OAuth
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:1337/connect/facebook"; // Facebook OAuth
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          organization: formData.organization, // Send organization
          designation: formData.designation, // Send designation
          phone: formData.phone,
        }
      );

      console.log(response.data);
      alert("Account created successfully!");
    } catch (error) {
      console.error("There was an error creating the account", error.response);
      alert("Error creating account");
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
              />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
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
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
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
          </div>
        </form>
      </div>
      <div className="button-container">
        <button className="create-account-button" onClick={handleSubmit}>
          Sign Up
        </button>
        <div className="continue-container">
          <hr></hr>
          <h5 style={{ width: "100%", padding: "0 10px" }}>or continue with</h5>
          <hr style={{ marginLeft: "-20px" }}></hr>
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
        <hr style={{ borderWidth: "1px" }}></hr>
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
