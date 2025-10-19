import axios from 'axios';
import sessionManager from './sessionManager';

// Resolve API base URL: prefer env, fallback to production Render API
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'https://sampoornaaangan-backend4.onrender.com/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    // Check if response has valid JSON data
    if (response.data === '') {
      console.warn('⚠️ Empty response received');
      response.data = { success: false, message: 'Empty response from server' };
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Handle JSON parsing errors
    if (error.message?.includes('JSON') || error.name === 'SyntaxError') {
      console.error('🚨 JSON parsing error - server may have returned HTML or empty response');
      const customError = new Error('Server response format error. Please check your connection and try again.');
      customError.isJSONError = true;
      return Promise.reject(customError);
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('🔐 Authentication error, clearing session...');
      sessionManager.destroySession();
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('🚨 Server error:', error.response.status);
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('🌐 Network error - server may be offline');
      const networkError = new Error('Network error. Please check if the server is running.');
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;