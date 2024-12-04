// src/services/auth.js
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
