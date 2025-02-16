import React, { useState } from 'react';
import './Dash.css';
import venue1 from "../images/venue1.png"; // Replace with your venue images
import venue2 from "../images/venue2.png";
import venue3 from "../images/venue3.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h1>CampusSpace</h1>
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#venues">Venues</a>
            <a href="#contact">Contact</a>
            <a href="/login" className="get-started-btn">Get Started</a>
          </div>
          <div 
            className="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to CampusSpace</h1>
          <p style={{ color: 'white' }} className="tagline">Your Gateway to Perfect Venues</p>
          <p style={{ color: 'white' }} className="location">Book the best venues for your events</p>
          
          <div className="highlights-container">
            <div className="highlight-item">
              <div className="highlight-value">50+</div>
              <div className="highlight-label">Venues</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-value">100+</div>
              <div className="highlight-label">Events Hosted</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-value">24/7</div>
              <div className="highlight-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="venues" id="venues">
        <h2 className="section-title">Featured Venues</h2>
        <div className="venues-grid">
          <div className="venue-card">
            <img src={venue1} alt="Conference Hall" className="venue-image" />
            <div className="venue-content">
              <h3>Conference Hall</h3>
              <p>Perfect for corporate meetings, seminars, and workshops. Equipped with modern facilities.</p>
              <div className="venue-details">
                <span style={{ color: 'var(--accent-color)' }}>Capacity: 20</span>
                <span style={{ color: 'var(--accent-color)' }}>1rd Most Booked</span>
              </div>
            </div>
          </div>

          <div className="venue-card">
            <img src={venue2} alt="Auditorium" className="venue-image" />
            <div className="venue-content">
              <h3>Auditorium</h3>
              <p>Ideal for large events, concerts, and performances. State-of-the-art sound and lighting.</p>
              <div className="venue-details">
                <span style={{ color: 'var(--accent-color)' }}>Capacity: 300</span>
                <span style={{ color: 'var(--accent-color)' }}>2nd Most Booked</span>
              </div>
            </div>
          </div>

          <div className="venue-card">
            <img src={venue3} alt="Outdoor Garden" className="venue-image" />
            <div className="venue-content">
              <h3>Outdoor Garden</h3>
              <p>Beautiful outdoor space for weddings, parties, and social gatherings.</p>
              <div className="venue-details">
                <span style={{ color: 'var(--accent-color)' }}>Capacity: 500</span>
                <span style={{ color: 'var(--accent-color)' }}>1st Most Booked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-details">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3 style={{ color: 'var(--accent-color)' }}>Location</h3>
                  <p>CampusSpace Headquarters</p>
                  <p>123 University Avenue</p>
                  <p>City, State - 12345</p>
                </div>
              </div>
              <div className="contact-details">
                <i className="fas fa-phone"></i>
                <div>
                  <h3 style={{ color: 'var(--accent-color)' }}>Phone</h3>
                  <p>Support: +91 98765 43210</p>
                  <p>Office: +91 12345 67890</p>
                </div>
              </div>
              <div className="contact-details">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3 style={{ color: 'var(--accent-color)' }}>Email</h3>
                  <p>support@campuspaces.com</p>
                  <p>info@campuspaces.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3 style={{ color: 'black' }}>Quick Links</h3>
            <ul>
              <li><a style={{ color: 'var(--accent-color)' }} href="#home">Home</a></li>
              <li><a style={{ color: 'var(--accent-color)' }} href="#venues">Venues</a></li>
              <li><a style={{ color: 'var(--accent-color)' }} href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <a href="/login" className="get-started-btn">Get Started</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CampusSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;