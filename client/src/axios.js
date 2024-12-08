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
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
}, (error) => {
    // Handle errors
    return Promise.reject(error);
});

export default api;
