import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/mental_health.png';  // Import image from src/assets
import './style.css';  // Importing the CSS file

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Track loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on every new attempt
        setLoading(true); // Set loading to true when starting login
        try {
            await login(username, password);
            navigate('/goals'); // Redirect to goals page after successful login
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false); // Set loading to false after login is complete
        }
    };

    // Background style for the Login component
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
                <h2>Login</h2>
                {error && <p className="error">{error}</p>} {/* Show error if any */}
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
                <button type="submit" disabled={loading}>Login</button> {/* Disable button while loading */}
                {loading && <p>Loading...</p>} {/* Display loading message */}
            </form>
        </div>
    );
};

export default Login;
