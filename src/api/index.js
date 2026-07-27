import axios from 'axios';

// УБЕДИТЕСЬ, ЧТО ЗДЕСЬ ВАШ IP (192.168.31.194), а не localhost
const API_BASE_URL = 'http://192.168.31.80:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// УБЕДИТЕСЬ, ЧТО ЭНДПОИНТ ПРАВИЛЬНЫЙ (/products/products/)
export const productApi = {
  getProducts: () => apiClient.get('/products/products/'),
};

export default apiClient;