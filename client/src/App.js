import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import CBTSession from './components/CBTSession';
import Home from './pages/Home'; // Import the Home component
import AboutPage from './pages/AboutPage'; // Import AboutPage
import ContactPage from './pages/ContactPage';
import StressManagement from './pages/StressManagement' 
import Articles from './pages/Articles';
import Blogs from './pages/Blogs';

const App = () => {
    return (
        <Router>
            <AuthProvider> {/* Wrap AuthProvider inside Router */}
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Add the Home route */}
                    <Route path="/about" element={<AboutPage />} /> {/* Add About route */}
                    <Route path="/contact" element={<ContactPage />} /> {/* Add Contact route */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/goals" element={<GoalList />} />
                    <Route path="/create-goal" element={<GoalForm />} />
                    <Route path="/cbt-session" element={<CBTSession />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/stress-management" element={<StressManagement />} />
                    <Route path="/blogs" element={<Blogs />} />
                    {/* Redirect to login if no path matches */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
