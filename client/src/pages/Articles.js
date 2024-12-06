import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material'; // Import MUI components
import backgroundImage from '../assets/mental_health.png'; // Import the background image
import './styles.css'; // Optional styling

const Articles = () => {
    // External article URLs
    const articleLinks = [
        { title: 'Mental Health Articles - Medical News Today', url: 'https://www.medicalnewstoday.com/articles/154543' },
        { title: 'How to Manage Stress - Mental Health Foundation', url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress' },
        { title: 'Understanding Anxiety - Anxiety and Depression Association of America', url: 'https://adaa.org/understanding-anxiety' },
        { title: 'Coping with Depression - Mayo Clinic', url: 'https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007' },
        { title: 'The Impact of Mental Health on Physical Health - Psych Central', url: 'https://psychcentral.com/lib/the-relationship-between-mental-and-physical-health#1' },
    ];

    // Handle external link navigation
    const navigateToExternal = (url) => {
        window.open(url, '_blank'); // Open external link in a new tab
    };

    // Background style for the Articles component
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
            <h1>Mental Health Articles</h1>
            <div className="card-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {articleLinks.map((article, index) => (
                    <Card key={index} className="card" sx={{ width: 300, margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {article.title}
                            </Typography>
                            <Button size="small" onClick={() => navigateToExternal(article.url)}>
                                Read Article
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Articles;
