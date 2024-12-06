import axios from 'axios';

// Create an instance of axios with a base URL and default headers
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your Django API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to set the Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    console.log('Token from localStorage:', token);  // Log token for debugging
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
