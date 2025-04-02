import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const registerUser = (userData: any) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (credentials: any) => {
  return api.post('/auth/login', credentials);
};

// Restaurant API
export const getRestaurants = (searchQuery = '') => {
  return api.get(`/restaurants${searchQuery ? `?search=${searchQuery}` : ''}`);
};

export const getRestaurantById = (id: string) => {
  return api.get(`/restaurants/${id}`);
};

export const getRestaurantMenu = (id: string) => {
  return api.get(`/restaurants/${id}/menu`);
};

// Order API
export const createOrder = (orderData: any) => {
  return api.post('/orders', orderData);
};

export const getUserOrders = () => {
  return api.get('/orders');
};

export default api;