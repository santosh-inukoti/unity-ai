import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return api.post('/auth/logout');
  },

  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Agents services
export const agentsService = {
  getGroups: async () => {
    const response = await api.get('/api/groups');
    return response.data;
  },

  getAgentsByGroup: async (group) => {
    const response = await api.get(`/api/agents/${encodeURIComponent(group)}`);
    return response.data;
  },

  getAllAgents: async () => {
    const response = await api.get('/api/agents');
    return response.data;
  },

  getAgent: async (id) => {
    const response = await api.get(`/api/agent/${id}`);
    return response.data;
  }
};

export default api;
