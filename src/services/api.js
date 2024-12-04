// src/services/api.js
import axios from 'axios';
import { getToken, setToken, removeToken } from './auth';

const api = axios.create({
  baseURL: 'https://job-portal-441721.nw.r.appspot.com/', // Replace with your backend URL
  withCredentials: false, // To include cookies in requests
});

api.interceptors.request.use(
  async (config) => {
    let token = getToken();
    if (token) {
      const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp * 1000;
      if (Date.now() >= tokenExpiration) {
        try {
          const response = await axios.post(
            'https://job-portal-441721.nw.r.appspot.com/api/users/token',
            {},
            { withCredentials: true }
          );
          token = response.data.accessToken;
          setToken(token);
        } catch (error) {
          removeToken();
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
