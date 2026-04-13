import axios from 'axios';
import { firebaseAuth } from './firebase';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
  const user = firebaseAuth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const msg = error.response?.data?.error || error.message || 'Network error';
    return Promise.reject(new Error(msg));
  }
);

export default api;
