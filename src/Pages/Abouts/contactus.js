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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("An error occurred. Please try again later.");
    }
  };

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
            onSubmit={handleSubmit}
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
              value={formData.name}
              onChange={handleChange}
              class="footer-input"
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              class="footer-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              class="footer-input"
              required
              style={{ padding: "10px", fontSize: "16px", minHeight: "100px" }}
            ></textarea>

            <button
              type="submit"
              class="footer-button"
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
