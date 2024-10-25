import "./siteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="main-footer">
      <div className="footer-logo-container">
        <img
          className="footer-logo"
          src="https://ibc.manofox.com/wp-content/uploads/2024/08/53a5706fd9e7a8e80dd938bf2c02941e.jpeg"
          alt="Footer Logo"
        />
      </div>
      <div className="footer-links">
        <div className="footer-item-links-container">
          <a className="footer-item-links" href="/">
            About Us
          </a>
          <a className="footer-item-links" href="/">
            Team
          </a>
          <a className="footer-item-links" href="/">
            Contact Us
          </a>
          <a className="footer-item-links" href="/">
            Careers
          </a>
        </div>
        <div className="footer-item-links-container">
          <a className="footer-item-links" href="/">
            Our Partners
          </a>
          <a className="footer-item-links" href="/">
            Partner with Us
          </a>
          <a className="footer-item-links" href="/">
            Advertise With Us
          </a>
          <a className="footer-item-links" href="/">
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
        />
        <button className="footer-button">Subscribe</button>
      </div>
    </footer>
  );
}
