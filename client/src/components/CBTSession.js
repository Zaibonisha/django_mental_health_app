import React, { useState, useEffect, useCallback } from 'react';
import api from '../axios';
import { useAuth } from '../context/AuthContext';
import './cbtstyle.css'; // Import the CSS file
import backgroundImage from '../assets/mental_health.png';  // Import image from src/assets

const CBTSession = () => {
    const [session, setSession] = useState(null); // Holds the fetched CBT session
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // General error state
    const [demoError, setDemoError] = useState(''); // Error state specific to demo mode
    const [emotionalState, setEmotionalState] = useState('happy'); // Form state for emotional state
    const { token } = useAuth(); // Get the user's JWT token
    const [demoMode, setDemoMode] = useState(false); // Flag for demo mode

    const sampleExercises = {
        happy: [
            "Exercise 1: List three things that make you feel happy.",
            "Exercise 2: Reflect on a recent positive experience and how it made you feel.",
            "Exercise 3: Write down your goals for maintaining a positive mindset.",
        ],
        sad: [
            "Exercise 1: Identify the sources of your sadness and write them down.",
            "Exercise 2: Practice mindfulness to acknowledge your sadness without judgment.",
            "Exercise 3: Write down something you are grateful for to shift focus.",
        ],
        anxious: [
            "Exercise 1: Identify your sources of anxiety and challenge any negative thoughts.",
            "Exercise 2: Practice deep breathing exercises for 5 minutes.",
            "Exercise 3: Write a letter to your future self about how you overcame anxiety.",
        ],
        angry: [
            "Exercise 1: Identify the source of your anger and explore why it triggered you.",
            "Exercise 2: Practice calming techniques, like deep breathing or counting to 10.",
            "Exercise 3: Write down a situation where you reacted calmly to anger.",
        ],
        stressed: [
            "Exercise 1: List the factors contributing to your stress and how they affect you.",
            "Exercise 2: Break down your stressors into smaller, manageable tasks.",
            "Exercise 3: Practice relaxation techniques, such as progressive muscle relaxation.",
        ],
    };

    const fetchSession = useCallback(async () => {
        if (!demoMode) {
            setLoading(true);
            setError('');
            setDemoError(''); // Reset demo error if session is not in demo mode
            try {
                const response = await api.post('/generate-cbt-session/', { emotional_state: emotionalState }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSession(response.data);
            } catch (err) {
                setError('OpenAI quota exceeded. Please try again later or start a demo session for your emotional state.');
            } finally {
                setLoading(false);
            }
        }
    }, [emotionalState, token, demoMode]);

    useEffect(() => {
        if (!demoMode) {
            fetchSession();
        }
    }, [fetchSession, demoMode]);

    const startDemoSession = () => {
        setDemoMode(true);
        setSession({
            summary: `This is a demo CBT session for emotional state: ${emotionalState}`,
            session: sampleExercises[emotionalState] || [],
        });
        setLoading(false);
        setDemoError('This is a demo session. Some features may be limited.'); // Custom error message for demo mode
    };

    const handleMarkAsComplete = () => {
        setSession(null); // Clear current session data
        setDemoMode(false); // Exit demo mode and return to state selection
    };

    const renderSession = () => (
        <div>
            <h3>Session Summary</h3>
            <p>{session.summary || 'No summary available'}</p>

            <h4>CBT Exercises</h4>
            <ul>
                {session.session.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                ))}
            </ul>

            <button onClick={handleMarkAsComplete}>
                Return to Create CBT Session
            </button>
        </div>
    );

    if (loading) return <p className="cbt-session loading">Loading your CBT session...</p>;

    // Background style for the entire container
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        height: '100vh', // Full height of the viewport
    };

    return (
        <div className="cbt-session-container" style={containerStyle}>
            <div className="cbt-session">
                <h2>Personalized CBT Session</h2>

                {!session && !demoMode && (
                    <div>
                        <label htmlFor="emotionalState">Select Your Emotional State: </label>
                        <select
                            id="emotionalState"
                            value={emotionalState}
                            onChange={(e) => setEmotionalState(e.target.value)}
                        >
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="anxious">Anxious</option>
                            <option value="angry">Angry</option>
                            <option value="stressed">Stressed</option>
                        </select>
                        <div>
                            <button onClick={fetchSession}>Start Actual Session</button>
                            <button onClick={startDemoSession}>Start Demo Session</button>
                        </div>
                    </div>
                )}

                {session && renderSession()}

                {/* Show custom demo error message */}
                {demoError && <p className="cbt-session demo-error">{demoError}</p>}

                {/* Show general error message */}
                {error && !demoMode && <p className="cbt-session error">{error}</p>}
            </div>
        </div>
    );
};

export default CBTSession;
