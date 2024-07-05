import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Request made and server responded
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          console.error('Unauthorized');
          break;
        case 403:
          // Handle forbidden error
          console.error('Forbidden');
          break;
        case 404:
          // Handle not found error
          console.error('Not found');
          break;
        case 500:
          // Handle server error
          console.error('Server error');
          break;
        default:
          console.error('Error:', error.response.data.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error:', error.message);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
