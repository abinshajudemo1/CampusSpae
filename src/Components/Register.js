import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        department: '',
        yearOfStudy: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value) error = 'Name is required';
                else if (!/^[A-Za-z ]+$/.test(value)) error = 'Name should only contain alphabets';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Valid email is required';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 8) error = 'Password should be at least 8 characters';
                else if (!/[A-Za-z]/.test(value)) error = 'Password must contain at least one letter';
                else if (!/[0-9]/.test(value)) error = 'Password must contain at least one number';
                else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = 'Password must contain at least one special character';
                break;
            case 'confirmPassword':
                if (value !== formData.password) error = 'Passwords do not match';
                break;
            case 'studentId':
                if (!value) error = 'Student ID is required';
                else if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) error = 'Student ID must be alphanumeric and between 6-12 characters';
                break;
            case 'department':
                if (!value) error = 'Department is required';
                else if (/[^a-zA-Z ]/.test(value)) error = 'Department should only contain alphabets';
                break;
            case 'yearOfStudy':
                if (!value) error = 'Year of study is required';
                else if (!/^[1-5]$/.test(value)) error = 'Year of study must be between 1 and 5';
                break;
            case 'phoneNumber':
                if (!value) error = 'Phone number is required';
                else if (!/^\d{10}$/.test(value)) error = 'Phone number must be a valid 10-digit number';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8080/api/users/register', formData);
                if (response.status === 201) {
                    navigate('/login');
                }
            } catch (err) {
                const errorMessage = err.response?.data || 'Registration failed. Please try again.';
                setErrors({ general: errorMessage });
            }
        }
    };

    return (
        <div className="register-container">
            <video autoPlay muted loop className="background-video">
                <source src="/campus-life.mp4" type="video/mp4" />
            </video>
            <div className="overlay"></div>

            <header className="main-header">
                <h1 className="site-title">CampusSpace</h1>
            </header>

            <div className="register-form-wrapper">
                <div className="register-form-container">
                    <h2>Create Your Account</h2>
                    <p className="subtitle">Join the CampusSpace community today</p>

                    {errors.general && <div className="error-message">{errors.general}</div>}

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder="RegisterID"
                                />
                                {errors.studentId && <span className="error">{errors.studentId}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    placeholder="Department"
                                />
                                {errors.department && <span className="error">{errors.department}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="yearOfStudy"
                                    value={formData.yearOfStudy}
                                    onChange={handleChange}
                                    placeholder="Year of Study (1-6)"
                                />
                                {errors.yearOfStudy && <span className="error">{errors.yearOfStudy}</span>}
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                            </div>
                        </div>

                        <button type="submit" className="register-button">Create Account</button>
                    </form>

                    <p className="login-link">
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </div>
            </div>

            <footer className="main-footer">
                <p>© 2025 CampusSpace. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Register;