import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/password/reset',
                { token, newPassword },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            setMessage(response.data); // Display the response message

            if (response.data === "Password reset successfully.") { // Check for success
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after delay
                }, 2000); // 2-second delay
            }
        } catch (error) {
            setMessage(error.response?.data || 'Error resetting password.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter reset token"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <button type="button" onClick={handleResetPassword}>Reset Password</button>
            </form>
            {message && <p className={message === "Password reset successfully." ? "success" : ""}>{message}</p>}
        </div>
    );
};

export default ResetPassword;
