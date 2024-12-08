import axios from 'axios';

// Create an instance of axios with a base URL and default headers
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Ensure this is set in your .env file
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to set the Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    console.log('Token from localStorage:', token);  // Log token for debugging
    
    // Check if the token exists and add it to headers, if so
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found in localStorage');
    }
    return config;
}, (error) => {
    // Handle errors more specifically
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
});

export default api;
