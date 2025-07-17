// API Configuration
const getApiUrl = () => {
  // In development, use the Vite proxy
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, use the environment variable or fallback to a placeholder
  return import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com/api';
};

export const API_BASE_URL = getApiUrl(); 