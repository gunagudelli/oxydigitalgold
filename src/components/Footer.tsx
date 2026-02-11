import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <img 
              src="https://www.askoxy.ai/static/media/askoxylogoblack.56dbb158b7a0beaf4fbe.png" 
              alt="ASKOXY.AI" 
              className="footer-logo-img"
            />
            <p className="footer-description">
              ASKOXY.AI offers unlimited ChatGPT prompts, empowering innovation without cost barriers.
            </p>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#ai-training">AI & GEN AI Training</a></li>
              <li><a href="#legal">Legal Knowledge</a></li>
              <li><a href="#study-abroad">Study Abroad</a></li>
              <li><a href="#rotary">My Rotary</a></li>
              <li><a href="#careers">We Are Hiring</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Company & Contact Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <div className="footer-contact">
              <p className="company-name">OXYKART TECHNOLOGIES PVT LTD</p>
              <p className="company-address">
                Miyapur Metro, ASKOXY.AI<br />
                Hyderabad, Telangana - 500049
              </p>
              <p className="contact-item">
                <strong>Email:</strong><br />
                <a href="mailto:support@askoxy.ai">support@askoxy.ai</a>
              </p>
              <p className="contact-item">
                <strong>Phone:</strong><br />
                <a href="tel:+918143271103">+91 81432 71103</a><br />
                <a href="tel:+919110564106">+91 91105 64106</a>
              </p>
            </div>
          </div>

          {/* App Download Section */}
          <div className="footer-section app-section">
            <h4 className="footer-heading">Get Our App</h4>
            <p className="app-description">
              Download ASKOXY.AI for a seamless experience.
            </p>
            <div className="app-buttons">
              <a href="#app-store" className="app-button">
                <span className="app-icon"></span>
                <div className="app-text">
                  <span className="app-label">Download on the</span>
                  <span className="app-name">App Store</span>
                </div>
              </a>
              <a href="#play-store" className="app-button">
                <span className="app-icon">▶</span>
                <div className="app-text">
                  <span className="app-label">GET IT ON</span>
                  <span className="app-name">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2026 ASKOXY.AI. All rights reserved. | CIN: U72900TG2020PTC142391
          </p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms & Conditions</a>
            <span className="separator">|</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
