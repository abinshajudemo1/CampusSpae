import React, { useState, useEffect } from 'react';
import './NotificationDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setIsLoading(false);
      } else {
        setError('Failed to fetch notifications');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error fetching notifications: ' + error.message);
      setIsLoading(false);
    }
  };

  const getIcon = (icon) => {
    switch (icon) {
      case 'bell':
        return faBell;
      case 'heart':
        return faHeart;
      case 'star':
      default:
        return faStar;
    }
  };

  // Group notifications by icon type
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const iconType = notification.icon || 'star';
    if (!acc[iconType]) {
      acc[iconType] = [];
    }
    acc[iconType].push(notification);
    return acc;
  }, {});

  return (
    <div id="notification-container">
      {/* Header */}
      <header id="notification-header">
        <div id="header-left">CampusSpace</div>
        <button id="back-button" onClick={() => (window.location.href = 'http://localhost:3000/dashboard')}>
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <h2 id="notification-heading">Latest Notifications</h2>

      {isLoading && <p id="loading-message">Loading notifications...</p>}
      {error && <p id="error-message">{error}</p>}

      {/* Notification Sections */}
      <div id="notification-sections">
        {Object.keys(groupedNotifications).map((iconType) => (
          <div key={iconType} className="notification-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={getIcon(iconType)} className="section-icon" />
              <div className={`blinking-light ${iconType}-light`}></div> {/* Blinking light */}
              {iconType === 'bell' ? 'Urgent' : iconType === 'heart' ? 'Perfect' : 'Suggestions'}
            </h3>
            <div className="notification-list">
              {groupedNotifications[iconType].map((notification) => (
                <div key={notification.notid} className="notification-item">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-message">{notification.message}</p>
                  <small className="notification-timestamp">
                    {new Date(notification.timestamp).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Notifications Message */}
      {notifications.length === 0 && !isLoading && !error && (
        <p id="no-notifications">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationDisplay;