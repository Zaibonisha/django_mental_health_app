import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material'; // Import MUI components
import './styles.css';
import backgroundImage from '../assets/woman-meditating6.jpg';  // Import image from src/assets

const Home = () => {
    const navigate = useNavigate(); // Use the useNavigate hook to handle navigation
    const homeStyle = {
        backgroundImage: `url(${backgroundImage})`,  // Use the imported image in inline styles
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    // Handle button click to navigate
    const navigateTo = (path) => {
        navigate(path);  // Use navigate instead of history.push
    };

    return (
        <div className="home" style={homeStyle}>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <h2>Mental Health App</h2>
                </div>
                <div className="navbar-links">
                    <button onClick={() => navigateTo('/about')}>About</button>
                    <button onClick={() => navigateTo('/contact')}>Contact</button>
                    <button onClick={() => navigateTo('/login')}>Login</button>
                    <button onClick={() => navigateTo('/register')}>Register</button>
                </div>
            </nav>

            {/* Welcome Section */}
            <div className="welcome">
                <h1>Welcome to Your Mental Health Dashboard</h1>
                {/* <h1>Your personalized space to manage goals and start CBT sessions for better mental health.</h1> */}

            </div>

            {/* Card Section for Blogs, Articles, and Stress Management */}
            <div className="links-container">
                <h2>Learn More</h2>
                <div className="card-links">
                    {/* Blog Card */}
                    <Card className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Mental Health Blogs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Read articles to help you understand mental health better.
                            </Typography>
                            <Button size="small" onClick={() => navigateTo('/blogs')}>
                                View Blogs
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Mental Health Articles Card */}
                    <Card className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Mental Health Articles
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Explore expert resources to improve your mental health.
                            </Typography>
                            <Button size="small" onClick={() => navigateTo('/articles')}>
                                View Articles
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Stress Management Card */}
                    <Card className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Stress Management Tips
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Discover effective techniques to manage stress in your daily life.
                            </Typography>
                            <Button size="small" onClick={() => navigateTo('/stress-management')}>
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
