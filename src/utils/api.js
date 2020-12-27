import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dws-libros-api.herokuapp.com',
});

export default api;
