// API Configuration
const getApiUrl = () => {
  // In development, use the Vite proxy
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, use the environment variable or fallback to your actual backend
  return import.meta.env.VITE_API_URL || 'https://ai-movie-search-backend.onrender.com';
};

export const API_BASE_URL = getApiUrl(); 