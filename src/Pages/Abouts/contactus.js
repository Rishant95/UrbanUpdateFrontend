import React, { useState } from "react";
import MinimizedHeader from "../../Components/EventPageComp/Js/minimizedHeader";
import AboutFooter from "../../Components/EventPageComp/Js/aboutFooter";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  return (
    <div>
      <MinimizedHeader />
      <div style={{ padding: "2% 17%" }}>
        <p className="Section-Dates">Tuesday, December 31, 2024</p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
          }}
        >
          <img
            src="UULogoResized.jpg"
            alt="Logo"
            style={{ height: "50%", width: "50%" }}
          />
          <h1 style={{ fontSize: "15px" }}>_( httP-S: //u rbanuP-date. in)_</h1>
          <h1
            className="Section-Titles"
            style={{ fontSize: "25px", fontWeight: "700" }}
          >
            How can we help?
          </h1>
          <h1
            className="Section-Titles"
            style={{ fontSize: "22px", fontWeight: "300" }}
          >
            Get in Touch
          </h1>

          {/* Form starts here */}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "50%",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="footer-input"
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="footer-input"
              name="email"
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              className="footer-input"
              required
              style={{ padding: "10px", fontSize: "16px", minHeight: "100px" }}
            ></textarea>

            <button
              type="submit"
              className="footer-button"
              style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
            >
              Send Message
            </button>
          </form>

          {formStatus && <p>{formStatus}</p>}
          {/* Form ends here */}
        </div>
        <AboutFooter />
      </div>
    </div>
  );
}
