import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../PagesCss/signinAccount.css";

import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To capture errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email, // Strapi expects the key to be 'identifier' instead of 'email'
          password: password,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        // Store JWT token in localStorage (or you can use sessionStorage)
        localStorage.setItem("jwt", data.jwt);

        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // If the login failed, show the error message from Strapi
        setError(data.message[0].messages[0].message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error if any */}
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="continue-container">
          <hr />
          <h5 style={{ width: "100%", padding: "0 10px" }}>or continue with</h5>
          <hr style={{ marginLeft: "-20px" }} />
        </div>

        <div className="social-signin">
          <button className="google-signin-button">
            <FaGoogle className="social-icon" /> Sign in with Google
          </button>
          <button
            className="facebook-signin-button"
            style={{ marginTop: "10px" }}
          >
            <FaFacebook className="social-icon" /> Sign in with Facebook
          </button>
        </div>

        <p className="signup-link">
          Don't have an account?{" "}
          <a href="/signup" onClick={() => navigate("/signup")}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
