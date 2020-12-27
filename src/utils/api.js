import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.dws-libros-api.herokuapp.com',
});

export default api;
