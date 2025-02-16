import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherReviewRequests.css';

const TeacherReviewRequests = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const handleApprove = async (registerId) => {
        try {
          const response = await fetch(`http://localhost:8080/api/event-registrations/${registerId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'Teacher Approved',
              message: 'Approved by teacher',
            }),
          });
      
          if (!response.ok) throw new Error('Failed to approve request');
      
          setRequests(requests.filter(req => req.registerId !== registerId));
          alert('Request approved by teacher. Awaiting admin approval.');
        } catch (error) {
          console.error(error);
          alert('Failed to approve request');
        }
      };
      
  
    useEffect(() => {
      fetch('http://localhost:8080/api/event-registrations')
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch requests');
          return response.json();
        })
        .then((data) => {
          setRequests(data.filter(req => req.status === 'Pending'));
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div className="teacher-review-requests">
        <h2>Review Requests</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="requests-table">
            <div className="table-header">
              <span>ID</span>
              <span>Venue</span>
              <span>Program</span>
              <span>Representatives</span>
              <span>Action</span>
            </div>
            {requests.map((request) => (
              <div key={request.registerId} className="table-row">
                <span>{request.registerId}</span>
                <span>{request.eventName}</span>
                <span>{request.collegeName}</span>
                <span>{request.participant1}</span>
                <span>
                  <button 
                    className="approve-button"
                    onClick={() => handleApprove(request.registerId)}
                  >
                    Approve
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default TeacherReviewRequests;