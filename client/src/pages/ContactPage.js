import React from 'react';
import backgroundImage from '../assets/mental_health2.png'; // Import the background image

const ContactPage = () => {
    return (
        <div style={styles.contentContainer}>
            <h1 style={styles.title}>Contact Us</h1>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Reach Out for Support</h2>
                <p style={styles.paragraph}>
                    If you're looking for mental health services, advice, or simply someone to talk to, we recommend the following resources:
                </p>
                <ul style={styles.linkList}>
                    <li><a href="https://www.mentalhealth.gov/get-help/immediate-help" target="_blank" rel="noopener noreferrer" style={styles.link}>National Helpline for Mental Health (USA)</a></li>
                    <li><a href="https://www.samaritans.org" target="_blank" rel="noopener noreferrer" style={styles.link}>Samaritans (UK)</a></li>
                    <li><a href="https://www.beyondblue.org.au" target="_blank" rel="noopener noreferrer" style={styles.link}>Beyond Blue (Australia)</a></li>
                    <li><a href="https://www.nami.org" target="_blank" rel="noopener noreferrer" style={styles.link}>National Alliance on Mental Illness (NAMI)</a></li>
                    <li><a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={styles.link}>Find a Therapist (Psychology Today)</a></li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Join Our Community</h2>
                <p style={styles.paragraph}>
                    You are not alone. Join these communities where people come together to talk, share, and fight mental health issues:
                </p>
                <ul style={styles.linkList}>
                    <li><a href="https://www.reddit.com/r/mentalhealth/" target="_blank" rel="noopener noreferrer" style={styles.link}>Mental Health Subreddit</a></li>
                    <li><a href="https://www.7cups.com" target="_blank" rel="noopener noreferrer" style={styles.link}>7 Cups: Online Therapy & Support</a></li>
                    <li><a href="https://www.therapychat.co.uk" target="_blank" rel="noopener noreferrer" style={styles.link}>Therapy Chat Community</a></li>
                    <li><a href="https://www.headspace.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Headspace Community</a></li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Contact Us</h2>
                <p style={styles.paragraph}>
                    If you have any questions, concerns, or suggestions, feel free to reach out to us via email at <a href="mailto:info@example.com" style={styles.link}>info@example.com</a>.
                </p>
            </div>
        </div>
    );
};

const styles = {
    backgroundContainer: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Translucent background for readability
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        maxWidth: '900px',
        margin: '20px auto',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '2.5rem',
        marginBottom: '20px',
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
    linkList: {
        listStyleType: 'none',
        padding: '0',
    },
    link: {
        color: '#0056b3',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    },
};

export const ContactPageWrapper = () => (
    <div style={styles.backgroundContainer}>
        <ContactPage />
    </div>
);

export default ContactPageWrapper;
