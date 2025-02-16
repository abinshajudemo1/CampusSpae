import React, { useState, useEffect } from 'react';
import './EventsPage.css';
import backgroundImage from '../images/venuebg.png'; // Replace with your background image
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to handle image popup
  const navigate = useNavigate();

  // Function to handle button click and redirect to registration page
  const handleRegisterClick = () => {
    navigate('/evereg');
  };

  // Fetch events from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/admin/events')
      .then((response) => response.json())
      .then((data) => {
        const sortedEvents = data.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB;
        });
        setEvents(sortedEvents);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Function to handle image click for popup
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to close the image popup
  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="eve-page">
      {/* Background image */}
      <div className="background-image"></div>

      {/* Header */}
      <header id="custom-header">
        <div>
          <h1 className="text-logo">CampusSpace</h1>
        </div>
        <div>
          <h2>Upcoming Venue Bookings at Marian College</h2>
        </div>
      </header>

      {/* Register Button */}
      <div className="register-btn-container">
        <button className="register-button" onClick={handleRegisterClick}>
          Book a Venue
        </button>
        <p className="register-description">
          CampusSpace simplifies venue booking for events, meetings, and activities at Marian College. 
          Whether you're organizing a seminar, workshop, or cultural fest, our platform ensures a seamless 
          booking experience. Explore our venues, check availability, and book your preferred space with ease. 
          Let CampusSpace be your gateway to perfect venues!
        </p>
      </div>

      {/* Events Container */}
      <div className="eve-container">
        {events.map((event, index) => (
          <div key={event.id || index} className="eve-card">
            {/* Event Details */}
            <div className="eve-info">
              <h3>{event.title || 'Venue Booking'}</h3>
              <p className="event-meta">
                <strong>Description:</strong> {event.fullDescription || 'No description provided.'} <br />
                {event.guidelines && (
                  <>
                    <strong>Amentities:</strong>
                    <ul>
                      {event.guidelines.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
                <strong>Date:</strong> {event.date || 'TBD'} <br />
                <strong>Time:</strong> {event.time || 'TBD'} <br />
                <strong>Location:</strong> {event.location || 'Online/Offline'} <br />
              </p>
            </div>

            {/* Event Images */}
            <div className="eve-images">
              {[event.image1, event.image2, event.image3, event.image4].map(
                (image, idx) =>
                  image && (
                    <img
                      key={idx}
                      src={
                        image.startsWith('data:image')
                          ? image
                          : `data:image/jpeg;base64,${image}`
                      }
                      alt={`Venue Image ${idx + 1}`}
                      className="eve-image"
                      onClick={() => handleImageClick(image)}
                    />
                  )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div className="image-popup" onClick={closeImagePopup}>
          <img src={selectedImage} alt="Venue Image" className="popup-image" />
        </div>
      )}
    </div>
  );
};

export default EventsPage;