import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherStudent.css';

const TeacherStudent = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8080/api/users/all')
        .then((response) => {
          if (!response.ok) throw new Error('Error fetching users');
          return response.json();
        })
        .then((data) => {
          setUsers(data.filter(user => user.role === 1));
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div className="teacher-students">
        <h2>Student Management</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="students-table">
            <div className="table-header">
              <span>ID</span>
              <span>Name</span>
              <span>Email</span>
              <span>Department</span>
              <span>Year</span>
              <span>Status</span>
            </div>
            {users.map((user) => (
              <div key={user.id} className="table-row">
                <span>{user.id}</span>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>{user.department}</span>
                <span>{user.yearOfStudy}</span>
                <span>
                  <button className="status-button active">Active</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  export default TeacherStudent;
  