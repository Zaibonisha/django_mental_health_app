import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material'; // Import MUI components
import backgroundImage from '../assets/mental_health.png'; // Import the background image
import './styles.css'; // Optional styling

const StressManagement = () => {
    // External stress management resources
    const stressTipsLinks = [
        { title: 'Stress Management Tips - Mental Health Foundation', url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress' },
        { title: 'Stress Relief Techniques - HelpGuide', url: 'https://www.helpguide.org/articles/stress/stress-relief.htm' },
        { title: 'Coping with Stress - American Psychological Association', url: 'https://www.apa.org/topics/stress' },
        { title: 'Mindfulness Techniques for Stress - Mayo Clinic', url: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/expert-answers/mindfulness/faq-20429427' },
        { title: 'Top Stress Management Tips - Verywell Mind', url: 'https://www.verywellmind.com/top-stress-management-tips-3145196' },
    ];

    // Handle external link navigation
    const navigateToExternal = (url) => {
        window.open(url, '_blank'); // Open external link in a new tab
    };

    // Background style for the Stress Management component
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
            <h1>Stress Management Tips and Techniques</h1>
            <p style={{ color: 'white', textAlign: 'center', maxWidth: '800px', marginBottom: '20px' }}>
                Learn valuable techniques to manage stress effectively in your daily life.
            </p>
            
            {/* Stress Tips Section */}
            <div className="card-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {stressTipsLinks.map((tip, index) => (
                    <Card key={index} className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {tip.title}
                            </Typography>
                            <Button size="small" onClick={() => navigateToExternal(tip.url)}>
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StressManagement;
