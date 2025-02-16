import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.clear();
        Cookies.remove('loggedInEmail');
        Cookies.remove('userRole');
        Cookies.remove('userId');

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);
            if (response.status === 200) {
                const { role, id } = response.data;
                const loggedInEmail = credentials.email;

                if (role && loggedInEmail && id) {
                    sessionStorage.setItem('loggedInEmail', loggedInEmail);
                    sessionStorage.setItem('userRole', role);
                    sessionStorage.setItem('userId', id);
                    Cookies.set('loggedInEmail', loggedInEmail, { expires: 1, path: '/' });
                    Cookies.set('userRole', role, { expires: 1, path: '/' });
                    Cookies.set('userId', id, { expires: 1, path: '/' });

                    if (String(role) === '2') {
                        navigate('/admin');
                    }
                    if (String(role) === '1') {
                        navigate('/dashboard');
                    }
                    if (String(role) === '3') {
                        navigate('/teacher');
                    }
                } else {
                    setError('Invalid email, role, or id returned from API.');
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid Credentials.';
            setError(errorMessage);
        }
    };

    useEffect(() => {
        const loggedInEmail = sessionStorage.getItem('loggedInEmail') || Cookies.get('loggedInEmail');
        const userRole = sessionStorage.getItem('userRole') || Cookies.get('userRole');
        const userId = sessionStorage.getItem('userId') || Cookies.get('userId');

        if (loggedInEmail && userRole && userId) {
            switch (String(userRole)) {
                case '2':
                    navigate('/admin');
                    break;
                case '1':
                    navigate('/dashboard');
                    break;
                case '3':
                    navigate('/teacher');
                    break;
                default:
                    setError('Invalid role detected.');
                    break;
            }
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <video autoPlay muted loop className="background-video">
                <source src="/campus-life.mp4" type="video/mp4" />
            </video>
            <div className="overlay"></div>
            
            <header className="main-header">
                <h1 className="site-title">CampusSpace</h1>
            </header>

            <div className="login-form-wrapper">
                <div className="login-form-container">
                    <h2>Welcome Back!</h2>
                    <p className="subtitle">Sign in to continue to CampusSpace</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">
                            Sign In
                        </button>
                    </form>

                    <div className="form-footer">
                        <a href="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </a>
                        <p className="register-link">
                            Don't have an account? <a href="/register">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>

            <footer className="main-footer">
                <p>© 2025 CampusSpace. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Login;