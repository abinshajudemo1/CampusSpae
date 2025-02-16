import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [participantType, setParticipantType] = useState('individual');
  const [participants, setParticipants] = useState(['']);
  const [eventDate, setEventDate] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collegeNameError, setCollegeNameError] = useState('');
  const [participantNameError, setParticipantNameError] = useState('');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/events?type=${participantType}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, [participantType]);

  const handleParticipantChange = (index, event) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = event.target.value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    if (participants.length < 5) {
      setParticipants([...participants, '']);
    }
  };

  const validateCollegeName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!name.match(regex)) {
      setCollegeNameError('College name must contain only alphabets and spaces.');
    } else {
      setCollegeNameError('');
    }
  };

  const validateParticipantName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!name.match(regex)) {
      setParticipantNameError('Participant name must contain only alphabets and spaces.');
    } else {
      setParticipantNameError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    if (!title || !collegeName || !eventDate) {
      setFormError('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (participantType === 'group' && participants.length === 1) {
      setFormError('Please add at least one participant.');
      setIsLoading(false);
      return;
    }

    const registrationData = {
      eventName: title,
      collegeName,
      participantType,
      eventDate,
      userId: userId,
      participant1: participants[0] || '',
      participant2: participants[1] || '',
      participant3: participants[2] || '',
      participant4: participants[3] || '',
      participant5: participants[4] || '',
    };

    fetch('http://localhost:8080/api/event-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to submit registration');
        }
        return response.text();
      })
      .then((text) => {
        if (text === 'Registration Successful') {
          alert('Registration Successful!');
          navigate('/booking-history');
        } else {
          throw new Error('Error: ' + text);
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setFormError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id="registration-page">
      <header id="header">
        <div id="header-left">CampusSpace</div>
      </header>

      <div className="registration-container">
        <h2 className="registration-title">Event Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="participant-type">Type:</label>
              <select
                id="participant-type"
                value={participantType}
                onChange={(e) => setParticipantType(e.target.value)}
              >
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="event-title">Venue</label>
              <select
                id="event-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              >
                <option value="">Select a venue</option>
                {events.map((event) => (
                  <option key={event.id} value={event.title}>
                    {event.title} (Seats left: {event.seats})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="college-name">Program Title</label>
              <input
                type="text"
                id="college-name"
                value={collegeName}
                onChange={(e) => {
                  setCollegeName(e.target.value);
                  validateCollegeName(e.target.value);
                }}
                required
              />
              {collegeNameError && <p className="error-message">{collegeNameError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="event-date">Event Date:</label>
              <input
                type="date"
                id="event-date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
          </div>

          {participantType === 'individual' && (
            <div className="form-group">
              <label htmlFor="participant-name">Representative Name:</label>
              <input
                type="text"
                id="participant-name"
                placeholder="Enter representative name"
                value={participants[0]}
                onChange={(e) => {
                  handleParticipantChange(0, e);
                  validateParticipantName(e.target.value);
                }}
                required
              />
              {participantNameError && <p className="error-message">{participantNameError}</p>}
            </div>
          )}

          {participantType === 'group' && (
            <div className="form-group">
              <label>Representatives:</label>
              {participants.map((participant, index) => (
                <div key={index} className="participant">
                  <input
                    type="text"
                    placeholder={`Representative ${index + 1}`}
                    value={participant}
                    onChange={(e) => handleParticipantChange(index, e)}
                    required
                  />
                </div>
              ))}
              {participants.length < 5 && (
                <button type="button" className="add-participant" onClick={addParticipant}>
                  Add Participant
                </button>
              )}
            </div>
          )}

          {formError && <p className="error-message">{formError}</p>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>

      <footer id="footer">
        <p>2024 CampusSpace. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default RegistrationPage;