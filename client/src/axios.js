import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL || "/choreo-apis/mentalhealthapp/backend/v1";

// Create an instance of axios with a base URL and default headers
const api = axios.create({
    baseURL: apiURL, // Use environment variable for flexibility
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to set the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Error in request interceptor:', error); // Log error for debugging
        return Promise.reject(error);
    }
);

export default api;
