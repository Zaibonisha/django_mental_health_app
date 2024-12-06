import React from 'react';
import backgroundImage from '../assets/mental_health2.png'; // Import the background image

const AboutPage = () => {
    return (
        <div style={styles.backgroundContainer}>
            <div style={styles.pageContainer}>
                <h1 style={styles.title}>About Us</h1>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Mission</h2>
                    <p style={styles.paragraph}>
                        We are dedicated to supporting mental health and well-being. Our platform aims to provide personalized Cognitive Behavioral Therapy (CBT) modules, mindfulness exercises, and goal-setting tools to help individuals manage their mental health. We believe in empowering users through evidence-based tools, fostering a supportive community, and encouraging personal growth.
                    </p>
                </div>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Approach</h2>
                    <p style={styles.paragraph}>
                        Using a combination of AI-driven insights and therapeutic techniques, our platform curates daily micro-sessions tailored to each user's needs. These sessions are designed to improve emotional regulation, boost mental resilience, and provide a sense of support and community. With a focus on mindfulness, CBT, and DBT, we aim to equip users with practical tools to enhance their mental well-being.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    backgroundContainer: {
        backgroundImage: `url(${backgroundImage})`, // Background applied to the container
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensures the background covers the full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContainer: {
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adds a translucent background for content
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        width: '90%', // Ensures responsiveness on smaller screens
        color: '#333', // Text color for readability
    },
    title: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#333',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        color: '#0056b3',
        fontSize: '1.8rem',
        marginBottom: '10px',
    },
    paragraph: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#555',
    },
};

export default AboutPage;
