import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingHistory.css';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8080/api/event-registrations/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching bookings');
        }
        return response.json();
      })
      .then((data) => {
        const filteredBookings = data.map((booking) => ({
          registerId: booking.registerId,
          eventName: booking.eventName,
          collegeName: booking.collegeName,
          participants: [
            booking.participant1 || '',
            booking.participant2 || '',
            booking.participant3 || '',
            booking.participant4 || '',
            booking.participant5 || '',
          ],
          status: booking.status || 'Pending',
          message: booking.message || '',
        }));
        setBookings(filteredBookings);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [userId, navigate]);

  const handleCancelBooking = (registerId) => {
    if (!registerId) {
      console.error('Invalid registerId');
      return;
    }

    const token = sessionStorage.getItem('authToken');

    fetch(`http://localhost:8080/api/event-registrations/cancel/${registerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error canceling booking');
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.registerId !== registerId)
        );
      })
      .catch((error) => {
        setError('Error canceling booking');
        console.error(error.message);
      });
  };

  return (
    <div id="booking-history-page-wrapper">
      <header id="header">
        <div id="header-left">CampusSpace</div>
      </header>

      <div className="booking-history-page">
        <h2>Booking History</h2>
        <p>Here you can view and manage your venue bookings.</p>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-row">
                <div className="booking-details">
                  <div className="booking-info">
                    <strong>Event:</strong> {booking.eventName}
                  </div>
                  <div className="booking-info">
                    <strong>College:</strong> {booking.collegeName}
                  </div>
                  <div className="booking-info">
                    <strong>Participants:</strong>{' '}
                    {booking.participants.filter((p) => p).join(', ')}
                  </div>
                  <div className="booking-info">
                    <strong>Message:</strong> {booking.message}
                  </div>
                </div>
                <div className={`status-box ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </div>
                <button
                  onClick={() => handleCancelBooking(booking.registerId)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <footer id="footer">
          <p>2024 CampusSpace. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BookingHistoryPage;