import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material'; // Import MUI components
import backgroundImage from '../assets/mental_health.png'; // Import the background image
import './styles.css'; // Optional styling

const Blogs = () => {
    // External blog URLs
    const blogLinks = [
        { title: 'Mental Health Blog - Psych Central', url: 'https://psychcentral.com/blog' },
        { title: 'Mental Health Articles - Medical News Today', url: 'https://www.medicalnewstoday.com/articles/154543' },
        { title: 'Stress Management Tips - Mental Health Foundation', url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress' },
        { title: 'The Mighty Blog - Mental Health', url: 'https://themighty.com/topic/mental-health/' },
        { title: 'Mind Blog - Mental Health Resources', url: 'https://www.mind.org.uk/blogs/' },
    ];

    // Handle external link navigation
    const navigateToExternal = (url) => {
        window.open(url, '_blank'); // Open external link in a new tab
    };

    // Background style for the Blogs component
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        height: '100vh', // Full height of the viewport
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <h1>Blogs for Mental Health</h1>
            <div className="card-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {blogLinks.map((blog, index) => (
                    <Card key={index} className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {blog.title}
                            </Typography>
                            <Button size="small" onClick={() => navigateToExternal(blog.url)}>
                                Read Blog
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
