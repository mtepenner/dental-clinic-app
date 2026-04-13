import axios from 'axios';

// Pull the backend URL from your .env file, or default to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor here later to automatically attach 
// authentication tokens to requests if the user is logged in.

export default api;
