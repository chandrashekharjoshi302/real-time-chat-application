import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const register = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};
