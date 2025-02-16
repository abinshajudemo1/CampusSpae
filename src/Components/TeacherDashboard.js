import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reviewRequests, setReviewRequests] = useState([]);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const userRole = sessionStorage.getItem('role');

  useEffect(() => {
    if (!userId || userRole !== '3') {
      navigate('/login');
    }
    fetchUsers();
    fetchNotifications();
    fetchReviewRequests();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all');
      if (!response.ok) throw new Error('Error fetching users');
      const data = await response.json();
      setUsers(data.filter(user => user.role === 1));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      setNotifications(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviewRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/review-requests');
      if (!response.ok) throw new Error('Failed to fetch review requests');
      setReviewRequests(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="teacher-dashboard">
      <aside className="sidebar">
        <h2 class="pannelid">Teacher Panel</h2>
        <nav>
          <button onClick={() => navigate('/teacher/student')}>Students</button>
          <button onClick={() => navigate('/teacher/review-requests')}>
            Review Requests 
          </button>
          <button onClick={() => navigate('/teacher/notifications')}>
            Notifications ({notifications.length})
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>
      </aside>
      <main className="dashboard-content">
        <h2 class="pannelid">Welcome, Teacher</h2>
        <div className="stats-box">
          <h3>Number of Students</h3>
          <p>{users.length}</p>
        </div>
      </main>
    </div>
  );
};
export default TeacherDashboard;
