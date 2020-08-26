import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.191.193.233:3333',
});

export default api;
