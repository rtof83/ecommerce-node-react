import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.235.154.60:3003/'
  // baseURL: 'http://localhost:3003/'
});

export default api
