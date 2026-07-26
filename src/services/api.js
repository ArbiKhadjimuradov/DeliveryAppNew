import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/products/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Получить все товары
  getAllProducts: () => api.get('/products/'),
  
  // Получить товары по категории
  getProductsByCategory: (categoryId) => 
    api.get(`/products/?category=${categoryId}`),
  
  // Получить все категории
  getAllCategories: () => api.get('/categories/'),
  
  // Получить один товар по ID
  getProductById: (id) => api.get(`/products/${id}/`),
};

export default api;