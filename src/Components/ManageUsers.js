import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all user data from the API
    fetch('http://localhost:8080/api/users/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div id="manage-users">
      <h2 id="manage-users-heading">Manage Users</h2>
      
      {isLoading ? (
        <p id="loading-message">Loading...</p>
      ) : error ? (
        <p id="error-message">{error}</p>
      ) : users.length > 0 ? (
        <div id="users-list">
          {/* Headings */}
          <div className="user-headings">
            <span>User ID</span>
            <span>Name</span>
            <span>Email</span>
            <span>Student ID</span>
            <span>Department</span>
            <span>Year of Study</span>
            <span>Phone Number</span>
            <span>Role</span>
          </div>

          {/* User Cards */}
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.studentId}</span>
              <span>{user.department}</span>
              <span>{user.yearOfStudy}</span>
              <span>{user.phoneNumber}</span>
              <span>{user.role}</span>
            </div>
          ))}
        </div>
      ) : (
        <p id="no-users-message">No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;