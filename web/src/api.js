import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3001/'
  baseURL: 'http://44.197.170.12:3001/'
});

export default api
