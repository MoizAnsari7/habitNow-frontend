import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Base API URL
    timeout: 5000, // Request timeout
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request error
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Pass through successful response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Clear the invalid token
            alert('Session expired. Please log in again.');
            window.location.href = '/login';
        }
        return Promise.reject(error); // Handle response error
    }
);

export default axiosInstance;
