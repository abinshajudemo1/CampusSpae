import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestReset = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/password/request-reset', null, {
        params: { email },
      });

      setMessage(response.data);
      if (response.data === "Reset token sent to your email.") {
        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      }
    } catch (error) {
      setMessage('Error requesting password reset.');
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <div className="header">
          <h1 className="brand">CampusSpace</h1>
          <h2 className="title">Reset Password</h2>
          <p className="subtitle">Enter your email to receive a password reset link</p>
        </div>

        <div className="form-container">
          <div className="input-group">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="email-input"
            />
          </div>

          <button
            onClick={handleRequestReset}
            className="reset-button"
          >
            Send Reset Link
          </button>

          {message && (
            <div className={`message ${
              message === "Reset token sent to your email."
                ? "success"
                : "error"
            }`}>
              {message}
            </div>
          )}

          <div className="login-link">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;