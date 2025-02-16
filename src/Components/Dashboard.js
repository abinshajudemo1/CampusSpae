import React from "react";
import "./Dashboard.css";
import homeImage from "../images/welcomeimg.png"; // Replace the video with an image
import team from "../images/team.png"; // Import the image file
import galleryImage1 from "../images/galleryImage1.png"; // Gallery Image 1
import galleryImage2 from "../images/galleryImage2.png"; // Gallery Image 2
import galleryImage3 from "../images/galleryImage3.png"; // Gallery Image 3
import galleryImage4 from "../images/galleryImage4.png"; // Gallery Image 4
import galleryImage5 from "../images/galleryImage5.png"; // Gallery Image 5
import galleryImage6 from "../images/galleryImage6.png"; // Gallery Image 6
import galleryImage7 from "../images/galleryImage7.jpg"; // Gallery Image 7
import galleryImage8 from "../images/galleryImage8.jpg"; // Gallery Image 8
import webdev from "../images/webdev.jpg"; // Gallery Image 8
import { Link } from 'react-router-dom';
import mm from '../images/mm.jpg'; // College logo

const Dashboard = () => {
  const loggedInEmail = sessionStorage.getItem("loggedInEmail");

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="head">
        <div id="logooo">
          <a href="/dash">
            <h1 className="font-logo">CampusSpace</h1>
          </a>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><Link to="/event">Events</Link></li>
            <li><a href="/booking-history">History</a></li>
            <li><Link to="/noti">Notifications</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img
            className="hero-image"
            src={homeImage} // Use the imported image
            alt="CampusSpace Background"
          />
          <div className="hero-overlay">
            <h1>Welcome to CampusSpace</h1>
            <p>Your Gateway to Perfect Venues</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2>About CampusSpace</h2>
            <p>
              CampusSpace is the premier venue booking platform for Marian College Kuttikkanam. 
              Designed exclusively for students, it simplifies the process of booking venues for 
              events, meetings, and activities. Whether you're organizing a cultural fest, a 
              workshop, or a seminar, CampusSpace ensures a seamless experience.
            </p>
            <p>
              Our mission is to provide students with easy access to the best venues on campus, 
              fostering creativity and collaboration. With CampusSpace, you can explore, book, 
              and manage venues effortlessly.
            </p>
          </div>
          <div className="about-image">
            <img src={team} alt="About CampusSpace" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          <div className="gallery-group">
            <div className="gallery-item">
              <img src={galleryImage1} alt="Conference Hall" />
              <div className="gallery-caption">
                <p>Conference Hall: Perfect for seminars and workshops.</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={galleryImage2} alt="Auditorium" />
              <div className="gallery-caption">
                <p>Auditorium: Ideal for large events and performances.</p>
              </div>
            </div>
          </div>
          <div className="gallery-group">
            <div className="gallery-item">
              <img src={galleryImage3} alt="Outdoor Garden" />
              <div className="gallery-caption">
                <p>Outdoor Garden: A serene space for social gatherings.</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={galleryImage4} alt="Classroom" />
              <div className="gallery-caption">
                <p>Classrooms: Equipped for workshops and meetings.</p>
              </div>
            </div>
          </div>
          <div className="gallery-group">
            <div className="gallery-item">
              <img src={galleryImage5} alt="Sports Ground" />
              <div className="gallery-caption">
                <p>Sports Ground: Host your sports events here.</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={galleryImage6} alt="Cafeteria" />
              <div className="gallery-caption">
                <p>Cafeteria: A lively space for informal gatherings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Marian College Kuttikkanam, Idukki, Kerala</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <p>support@campuspaces.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 CampusSpace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;