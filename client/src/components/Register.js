import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/mental_health.png';  // Import image from src/assets
import './style.css';  // Importing the CSS file

const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);  // Track loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when starting registration
        try {
            await register(username, password, email);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);  // Set loading to false after registration is complete
        }
    };

    // Background style for the Register component
    const formStyle = {
        backgroundImage: `url(${backgroundImage})`,  // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        height: '100vh',  // Full height of the viewport
    };

    return (
        <div style={formStyle}>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>Register</button> {/* Disable button while loading */}
                {loading && <p>Loading...</p>} {/* Display loading message */}
            </form>
        </div>
    );
};

export default Register;
