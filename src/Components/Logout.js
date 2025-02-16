import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear session storage and cookies on logout
        sessionStorage.removeItem('loggedInEmail');
        sessionStorage.removeItem('userRole');
        Cookies.remove('loggedInEmail');
        Cookies.remove('userRole');

        // Redirect the user to the login page after logout
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h2>You are logging out...</h2>
        </div>
    );
};

export default Logout;
