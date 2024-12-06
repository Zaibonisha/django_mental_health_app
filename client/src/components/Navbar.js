import React from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import { useAuth } from '../context/AuthContext';  // Import the useAuth hook
import './navbar.css';  // Assuming you have a style.css file

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();  // Access the logout function from AuthContext

    // Handle navigation to different pages
    const navigateTo = (path) => {
        navigate(path);
    };

    // Handle logout
    const handleLogout = () => {
        logout();  // Call logout from AuthContext
        navigate('/', { replace: true });  // Redirect user to the home page (use replace to avoid keeping the logout page in history)
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>Mental Health App</h2>
            </div>
            <div className="navbar-links">
                <button onClick={() => navigateTo('/about')}>About Us</button>
                <button onClick={() => navigateTo('/contact')}>Contact</button>
                <button onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>
        </nav>
    );
};

export default Navbar;
