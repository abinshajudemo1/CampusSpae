import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/events/count')
      .then((response) => response.json())
      .then((data) => setTotalEvents(data))
      .catch((error) => console.error('Error fetching event count:', error));

    fetch('http://localhost:8080/api/users/count')
      .then((response) => response.json())
      .then((data) => setTotalParticipants(data))
      .catch((error) => console.error('Error fetching user count:', error));

    fetch('http://localhost:8080/api/event-registrations/count')
      .then((response) => response.json())
      .then((data) => setTotalRegistrations(data))
      .catch((error) => console.error('Error fetching registrations count:', error));
  }, []);

  return (
    <div id="admin-dashboard">
      {/* Header */}
      <header id="header">
        <div id="header-left">CampusSpace</div>
        <div id="header-center">Dashboard</div>
      </header>

      {/* Dashboard Layout */}
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/manage-events">Manage Events</Link>
            </li>
            <li>
              <Link to="/manage-registrations">Manage Registrations</Link>
            </li>
            <li>
              <Link to="/manage-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/notification">Manage Notification</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Summary Tiles */}
          <div className="summary-tiles">
            <div className="tile new-events">
              <h2>{totalEvents}</h2>
              <p>New Events</p>
            </div>
            <div className="tile participants">
              <h2>{totalParticipants}</h2>
              <p>Users</p>
            </div>
            <div className="tile registrations">
              <h2>{totalRegistrations}</h2>
              <p>Registrations</p>
            </div>
          </div>

          {/* Report Section */}
          <div className="widget">
            <h3>Latest Report</h3>
            <p>Total Events: {totalEvents}</p>
            <p>Total Participants: {totalParticipants}</p>
            <p>Total Registrations: {totalRegistrations}</p>
            <button onClick={() => navigate('/logout')}>Logout</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer">
        <p>2024 CampusSpace. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;