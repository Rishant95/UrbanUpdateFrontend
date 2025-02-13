import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../PagesCss/signinAccount.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/local`,
        {
          identifier: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("userName", data.user.username);
        localStorage.setItem("email", email);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="continue-container">
          <hr />
          <h5>or continue with</h5>
          <hr />
        </div>

        <div className="social-signin">
          <button className="google-signin-button">
            <FaGoogle className="social-icon" /> Sign in with Google
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
