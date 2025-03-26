import axios from 'axios';
import BASE_URL from './config';

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // "/api" porque así están las rutas en el backend
});

export default api;
