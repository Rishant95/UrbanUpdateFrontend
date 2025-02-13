import { useState } from "react";
import "./siteFooter.css";

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/subscribeds`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { Email: email }, // Wrap email in "data"
          }),
        }
      );

      if (response.ok) {
        alert("Subscribed successfully!");
        setEmail(""); // Clear the input field after success
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to subscribe"}`);
      }
    } catch (error) {
      alert("An error occurred while subscribing. Please try again later.");
      console.error(error);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-logo-container">
        <img className="footer-logo" src="UUlogo.jpg" alt="Footer Logo" />
      </div>
      <div className="footer-links">
        <div className="footer-item-links-container">
          <a className="footer-item-links" href="/about-urban-update">
            About Us
          </a>
          <a className="footer-item-links" href="/team">
            Team
          </a>
          <a className="footer-item-links" href="/contact-us">
            Contact Us
          </a>
          <a className="footer-item-links" href="/career">
            Careers
          </a>
        </div>
        <div className="footer-item-links-container">
          <a className="footer-item-links" href="/partners">
            Our Partners
          </a>
          <a className="footer-item-links" href="/">
            Partner with Us
          </a>
          <a className="footer-item-links" href="/advertise">
            Advertise With Us
          </a>
          <a className="footer-item-links" href="/privacy">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="footer-subscribe">
        <h2>Subscribe to our Newsletter</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="footer-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
        />
        <button className="footer-button" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
    </footer>
  );
}
