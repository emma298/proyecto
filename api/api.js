import axios from 'axios';
import BASE_URL from './config';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
});

// Interceptor para mostrar errores
// Interceptor para requests
api.interceptors.request.use(config => {
  console.log(`Enviando ${config.method.toUpperCase()} a ${config.url}`);
  return config;
});

// Interceptor para responses
api.interceptors.response.use(response => {
  console.log('Respuesta:', response.data);
  return response;
}, error => {
  console.error('Error en la petición:', error.response?.data);
  return Promise.reject(error);
});

export default api;