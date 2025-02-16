import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherNotifications.css';

const TeacherNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8080/api/notifications')
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch notifications');
          return response.json();
        })
        .then((data) => {
          setNotifications(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div className="teacher-notifications">
        <h2>Notifications</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="notifications-container">
            {notifications.map((notification) => (
              <div key={notification.notid} className="notification-card">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <small>{new Date(notification.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default TeacherNotifications;
