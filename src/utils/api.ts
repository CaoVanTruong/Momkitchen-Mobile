import axios, { AxiosHeaders } from 'axios';
import { API_URL } from 'constants/api';
import { store } from 'store';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = store.getState().user.user?.token;
  console.log('token:', token);

  if (config.headers) {
    if (token) {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

export default api;
